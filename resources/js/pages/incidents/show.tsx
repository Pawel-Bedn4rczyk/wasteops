import { Form } from "@inertiajs/react";
import { AlertTriangle } from "lucide-react";
import { useState } from "react";
import { useCan } from "@/hooks/use-can";
import { statusColorClass } from "@/lib/incident-status";
import { update } from "@/routes/incidents";
import { store as storeComment } from "@/routes/incidents/comments";

type Comment = {
	id: number;
	body: string;
	author_name: string;
	created_at: string;
};

type Activity = {
	id: number;
	type: string;
	title: string;
	subtitle: string | null;
	status_label: string | null;
	created_at: string;
};

type Props = {
	incident: {
		id: number;
		title: string;
		description: string | null;
		status: string;
		equipment: {
			id: number;
			name: string;
			serial_number: string | null;
			type: string;
		} | null;
		comments: Comment[];
		activities: Activity[];
	};
	statuses: Record<string, string>;
};

export default function Show({ incident, statuses }: Props) {
	const [selected, setSelected] = useState(incident.status);
	const isDirty = selected !== incident.status;
	const { can } = useCan();
	const canComment = can("incidents.comment") && incident.status !== "resolved";
	const canUpdateStatus = can("incidents.update_status");

	return (
		<div className="flex min-h-[calc(100svh-3rem)] flex-col">
			<header className="flex shrink-0 items-center justify-between gap-3 border-b px-4 py-3 lg:px-6">
				<div className="flex min-w-0 items-center gap-2">
					<AlertTriangle className="h-5 w-5 shrink-0" />
					<h1 className="truncate text-lg font-semibold">{incident.title}</h1>
				</div>
				<button
					type="button"
					onClick={() => window.history.back()}
					className="text-sm text-primary hover:underline"
				>
					← Wróć
				</button>
			</header>

			<div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto p-4 lg:p-6">
				<section className="shrink-0 rounded-xl border bg-card p-5">
					<h2 className="mb-4 text-sm font-semibold tracking-wide text-muted-foreground uppercase">
						Szczegóły
					</h2>

					<dl className="grid gap-4 sm:grid-cols-2">
						<div>
							<dt className="text-xs text-muted-foreground">Urządzenie</dt>
							<dd className="mt-1 text-sm font-medium">{incident.equipment?.name ?? "—"}</dd>
							{incident.equipment && (
								<dd className="text-xs text-muted-foreground">
									{incident.equipment.type}
									{incident.equipment.serial_number ? ` · ${incident.equipment.serial_number}` : ""}
								</dd>
							)}
						</div>

						<div>
							<dt className="text-xs text-muted-foreground">Status</dt>
							{canUpdateStatus ? (
								<dd className="mt-1">
									<Form {...update.form(incident.id)} className="flex flex-wrap items-end gap-2">
										{({ errors, processing }) => (
											<>
												<div className="min-w-[12rem] flex-1 space-y-1">
													<select
														id="status"
														name="status"
														defaultValue={incident.status}
														className={`w-full rounded border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring ${statusColorClass[selected] ?? ""}`}
														onChange={(e) => setSelected(e.target.value)}
													>
														{Object.entries(statuses).map(([value, label]) => (
															<option
																key={value}
																value={value}
																className={statusColorClass[value] ?? ""}
															>
																{label}
															</option>
														))}
													</select>
													{errors.status && (
														<div className="text-sm text-destructive">{errors.status}</div>
													)}
												</div>
												{isDirty && (
													<button
														type="submit"
														disabled={processing}
														className="rounded bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
													>
														{processing ? "Zapisywanie..." : "Zapisz"}
													</button>
												)}
											</>
										)}
									</Form>
								</dd>
							) : (
								<dd
									className={`mt-1 text-sm font-medium ${statusColorClass[incident.status] ?? ""}`}
								>
									{statuses[incident.status] ?? incident.status}
								</dd>
							)}
						</div>

						<div className="sm:col-span-2">
							<dt className="text-xs text-muted-foreground">Opis</dt>
							<dd className="mt-1 text-sm whitespace-pre-wrap text-foreground/90">
								{incident.description?.trim() ? incident.description : "Brak opisu."}
							</dd>
						</div>
					</dl>
				</section>

				<div className="grid min-h-0 flex-1 gap-4 lg:grid-cols-2 lg:items-stretch">
					<section className="flex min-h-[24rem] flex-col rounded-xl border bg-card lg:min-h-0">
						<div className="shrink-0 border-b px-5 py-3">
							<h2 className="text-sm font-semibold tracking-wide text-muted-foreground uppercase">
								Komentarze ({incident.comments.length})
							</h2>
						</div>

						<div className="min-h-0 flex-1 space-y-4 overflow-y-auto p-5">
							{incident.comments.length === 0 ? (
								<p className="text-sm text-muted-foreground">Brak komentarzy.</p>
							) : (
								<ul className="space-y-3">
									{incident.comments.map((comment) => (
										<li key={comment.id} className="rounded-lg border bg-background/40 px-3 py-2.5">
											<div className="mb-1 flex items-center justify-between gap-2 text-xs text-muted-foreground">
												<span className="font-medium text-foreground">{comment.author_name}</span>
												<span>
													{new Date(comment.created_at).toLocaleString("pl-PL", {
														dateStyle: "short",
														timeStyle: "short",
													})}
												</span>
											</div>
											<p className="text-sm whitespace-pre-wrap">{comment.body}</p>
										</li>
									))}
								</ul>
							)}
						</div>

						<div className="shrink-0 border-t p-5">
							{canComment ? (
								<Form {...storeComment.form(incident.id)} className="space-y-3" resetOnSuccess>
									{({ errors, processing }) => (
										<>
											<p className="text-sm font-medium">Dodaj komentarz</p>

											<div className="space-y-3">
												<div className="space-y-1">
													<label htmlFor="author_name" className="text-xs text-muted-foreground">
														Autor
													</label>
													<input
														id="author_name"
														name="author_name"
														type="text"
														className="w-full rounded border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
													/>
													{errors.author_name && (
														<div className="text-sm text-destructive">{errors.author_name}</div>
													)}
												</div>

												<div className="space-y-1">
													<label htmlFor="body" className="text-xs text-muted-foreground">
														Treść
													</label>
													<textarea
														id="body"
														name="body"
														rows={2}
														className="w-full rounded border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
													/>
													{errors.body && (
														<div className="text-sm text-destructive">{errors.body}</div>
													)}
												</div>
											</div>

											<button
												type="submit"
												disabled={processing}
												className="rounded bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
											>
												{processing ? "Dodawanie..." : "Dodaj komentarz"}
											</button>
										</>
									)}
								</Form>
							) : (
								<p className="text-sm text-muted-foreground">
									Ta awaria jest rozwiązana — dodawanie komentarzy jest zablokowane.
								</p>
							)}
						</div>
					</section>

					<section className="flex min-h-[24rem] flex-col rounded-xl border bg-card lg:min-h-0">
						<div className="shrink-0 border-b px-5 py-3">
							<h2 className="text-sm font-semibold tracking-wide text-muted-foreground uppercase">
								Historia
							</h2>
							<p className="text-xs text-muted-foreground capitalize">
								{new Date().toLocaleDateString("pl-PL", {
									weekday: "long",
									day: "numeric",
									month: "long",
									year: "numeric",
								})}
							</p>
						</div>

						<div className="min-h-0 flex-1 overflow-y-auto px-5 py-3">
							{incident.activities.length === 0 ? (
								<p className="text-sm text-muted-foreground">Brak wpisów w historii.</p>
							) : (
								<ol className="relative ms-2 border-s border-border">
									{incident.activities.map((activity) => (
										<li
											key={activity.id}
											className="relative border-b border-border/60 py-3 ps-6 last:border-b-0"
										>
											<span
												className={`absolute top-4 -start-[5px] size-2.5 rounded-full ring-4 ring-card ${
													activity.type === "status_changed"
														? "bg-sky-500"
														: activity.type === "comment_added"
															? "bg-muted-foreground/60"
															: "bg-primary"
												}`}
											/>

											<div className="flex items-start justify-between gap-3">
												<div className="min-w-0">
													<p className="text-sm leading-snug font-medium">{activity.title}</p>
													<p className="mt-0.5 text-xs text-muted-foreground">
														{activity.subtitle || "Nowa awaria"}
													</p>
												</div>

												<div className="shrink-0 text-right">
													{activity.status_label && (
														<p className="text-sm">{activity.status_label}</p>
													)}
													<p className="text-xs text-muted-foreground tabular-nums">
														{new Date(activity.created_at).toLocaleTimeString("pl-PL")}
													</p>
												</div>
											</div>
										</li>
									))}
								</ol>
							)}
						</div>
					</section>
				</div>
			</div>
		</div>
	);
}
