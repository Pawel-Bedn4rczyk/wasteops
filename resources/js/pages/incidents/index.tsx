import { Form, Link } from "@inertiajs/react";
import { AlertTriangle } from "lucide-react";
import { useState } from "react";
import { create, update } from "@/routes/incidents";

type Incident = {
	id: number;
	title: string;
	status: string;
	equipment: { id: number; name: string; serial_number: string | null };
};

type Props = {
	incidents: Incident[];
	statuses: Record<string, string>;
};

function IncidentStatusForm({
	incidentId,
	status,
	statuses,
}: {
	incidentId: number;
	status: string;
	statuses: Record<string, string>;
}) {
	const [selected, setSelected] = useState(status);
	const isDirty = selected !== status;

	const statusColorClass: Record<string, string> = {
		open: "text-red-400",
		in_progress: "text-yellow-500",
		resolved: "text-green-500",
	};

	return (
		<Form {...update.form(incidentId)} className="flex items-center gap-2">
			{({ processing }) => (
				<>
					<select
						name="status"
						value={selected}
						onChange={(e) => setSelected(e.target.value)}
						className={`rounded border bg-secondary text-sm ${statusColorClass[selected] ?? ""}`}
					>
						{Object.entries(statuses).map(([value, label]) => (
							<option key={value} value={value} className={`${statusColorClass[value] ?? ""}`}>
								{label}
							</option>
						))}
					</select>
					{isDirty && (
						<button
							className="rounded bg-secondary px-1 py-1 text-sm text-primary-foreground hover:bg-primary/90"
							type="submit"
							disabled={processing}
						>
							Zapisz
						</button>
					)}
				</>
			)}
		</Form>
	);
}

export default function Index({ incidents, statuses }: Props) {
	return (
		<div className="p-4">
			<div className="mb-4 flex items-center justify-between gap-3">
				<div className="flex  gap-2">
					<AlertTriangle className="w-6 h-6 " />
					<h1 className="text-xl font-semibold flex items-center gap-2">Awarie</h1>
				</div>
				<Link
					href={create()}
					className="rounded bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
				>
					Dodaj awarię
				</Link>
			</div>

			<div className="overflow-hidden rounded border bg-card">
				<table className="w-full text-left text-sm">
					<thead className="border-b bg-muted/60 text-muted-foreground">
						<tr>
							<th className="px-3 py-2 font-medium">Tytuł</th>
							<th className="px-3 py-2 font-medium">Status</th>
							<th className="px-3 py-2 font-medium">Urządzenie powiązane</th>
						</tr>
					</thead>
					<tbody>
						{incidents.length === 0 ? (
							<tr>
								<td colSpan={3} className="px-3 py-6 text-center text-muted-foreground">
									Brak awarii.
								</td>
							</tr>
						) : (
							incidents.map((incident) => (
								<tr key={incident.id} className="border-b last:border-0">
									<td className="px-3 py-2">{incident.title}</td>
									<td className="px-3 py-2">
										<IncidentStatusForm
											incidentId={incident.id}
											status={incident.status}
											statuses={statuses}
										/>
									</td>
									<td className="px-3 py-2">
										{incident.equipment?.name ?? "-"}
										{incident.equipment?.serial_number
											? ` (${incident.equipment.serial_number})`
											: ""}
									</td>
								</tr>
							))
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
}
