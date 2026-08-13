import { Form, Link } from "@inertiajs/react";
import { AlertTriangle } from "lucide-react";
import { statusColorClass } from "@/lib/incident-status";
import { index } from "@/routes/incidents";
import { store as storeComment } from "@/routes/incidents/comments";

type Comment = {
	id: number;
	body: string;
	author_name: string;
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
	};
	statuses: Record<string, string>;
};

export default function Show({ incident, statuses }: Props) {
	const canComment = incident.status !== "resolved";

	return (
		<div className="p-4">
			<div className="mb-4 flex items-center justify-between gap-3">
				<div className="flex items-center gap-2">
					<AlertTriangle className="h-6 w-6" />
					<h1 className="text-xl font-semibold">{incident.title}</h1>
				</div>
				<Link href={index()} className="text-sm text-primary hover:underline">
					← Wróć do listy
				</Link>
			</div>

			<div className="max-w-2xl space-y-4">
				<div className="space-y-4 rounded-xl border bg-card p-5">
					<div className="grid gap-4 sm:grid-cols-2">
						<div>
							<p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
								Status
							</p>
							<p className={`mt-1 text-sm font-medium ${statusColorClass[incident.status] ?? ""}`}>
								{statuses[incident.status] ?? incident.status}
							</p>
						</div>

						<div>
							<p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
								Urządzenie
							</p>
							<p className="mt-1 text-sm">
								{incident.equipment
									? `${incident.equipment.name}${
											incident.equipment.serial_number
												? ` (${incident.equipment.serial_number})`
												: ""
										}`
									: "—"}
							</p>
							{incident.equipment?.type && (
								<p className="mt-0.5 text-xs text-muted-foreground">{incident.equipment.type}</p>
							)}
						</div>
					</div>

					<div>
						<p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
							Opis
						</p>
						<p className="mt-1 text-sm whitespace-pre-wrap text-foreground/90">
							{incident.description?.trim() ? incident.description : "Brak opisu."}
						</p>
					</div>
				</div>

				<div className="space-y-4 rounded-xl border bg-card p-5">
					<h2 className="text-base font-semibold">Komentarze ({incident.comments.length})</h2>

					{incident.comments.length === 0 ? (
						<p className="text-sm text-muted-foreground">Brak komentarzy.</p>
					) : (
						<ul className="space-y-3">
							{incident.comments.map((comment) => (
								<li key={comment.id} className="rounded-lg border bg-background/50 p-3">
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
					{canComment ? (
						<>
							<h2 className="mt-8 text-base font-semibold">Dodaj nowy komentarz</h2>
							<Form
								{...storeComment.form(incident.id)}
								className="space-y-3 border-t pt-4"
								resetOnSuccess
							>
								{({ errors, processing }) => (
									<>
										<div className="space-y-1">
											<label htmlFor="author_name" className="text-sm font-medium">
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
											<label htmlFor="body" className="text-sm font-medium">
												Komentarz
											</label>
											<textarea
												id="body"
												name="body"
												rows={3}
												className="w-full rounded border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
											/>
											{errors.body && <div className="text-sm text-destructive">{errors.body}</div>}
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
						</>
					) : (
						<p className="mt-8 border-t pt-4 text-sm text-muted-foreground">
							Ta awaria jest rozwiązana — dodawanie komentarzy jest zablokowane.
						</p>
					)}
				</div>
			</div>
		</div>
	);
}
