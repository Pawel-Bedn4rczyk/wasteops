import { Link } from "@inertiajs/react";
import { AlertTriangle, Eye } from "lucide-react";
import { useCan } from "@/hooks/use-can";
import { statusColorClass } from "@/lib/incident-status";
import { create, show } from "@/routes/incidents";

type Incident = {
	id: number;
	title: string;
	status: string;
	equipment: { id: number; name: string; serial_number: string | null } | null;
};

type Props = {
	incidents: Incident[];
	statuses: Record<string, string>;
};

export default function Index({ incidents, statuses }: Props) {
	const { can } = useCan();
	return (
		<div className="p-4">
			<div className="mb-4 flex items-center justify-between gap-3">
				<div className="flex gap-2">
					<AlertTriangle className="h-6 w-6" />
					<h1 className="flex items-center gap-2 text-xl font-semibold">Awarie</h1>
				</div>
				{can("incidents.create") && (
					<Link
						href={create()}
						className="rounded bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
					>
						Dodaj awarię
					</Link>
				)}
			</div>

			<div className="overflow-hidden rounded border bg-card">
				<table className="w-full text-left text-sm">
					<thead className="border-b bg-muted/60 text-muted-foreground">
						<tr>
							<th className="px-3 py-2 font-medium">Tytuł</th>
							<th className="px-3 py-2 font-medium">Status</th>
							<th className="px-3 py-2 font-medium">Urządzenie powiązane</th>
							<th className="px-3 py-2 text-right font-medium">Akcje</th>
						</tr>
					</thead>
					<tbody>
						{incidents.length === 0 ? (
							<tr>
								<td colSpan={4} className="px-3 py-6 text-center text-muted-foreground">
									Brak awarii.
								</td>
							</tr>
						) : (
							incidents.map((incident) => (
								<tr key={incident.id} className="border-b last:border-0">
									<td className="px-3 py-2">{incident.title}</td>
									<td
										className={`px-3 py-2 font-medium ${statusColorClass[incident.status] ?? ""}`}
									>
										{statuses[incident.status] ?? incident.status}
									</td>
									<td className="px-3 py-2">
										{incident.equipment?.name ?? "-"}
										{incident.equipment?.serial_number
											? ` (${incident.equipment.serial_number})`
											: ""}
									</td>
									<td className="px-3 py-2">
										<div className="flex items-center justify-end gap-1">
											<Link
												href={show(incident.id)}
												title="Szczegóły"
												aria-label="Szczegóły"
												className="rounded p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground"
											>
												<Eye className="h-4 w-4" />
											</Link>
										</div>
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
