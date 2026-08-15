import { Link } from "@inertiajs/react";
import { Wrench } from "lucide-react";
import { useCan } from "@/hooks/use-can";
import { statusColorClass } from "@/lib/incident-status";
import { edit, index } from "@/routes/equipment";
import { show as showIncident } from "@/routes/incidents";

type IncidentRow = {
	id: number;
	title: string;
	status: string;
	created_at: string;
};

type Props = {
	equipment: {
		id: number;
		name: string;
		type: string;
		serial_number: string | null;
	};
	openIncidents: IncidentRow[];
	resolvedIncidents: IncidentRow[];
	statuses: Record<string, string>;
};

function IncidentList({
	items,
	statuses,
	emptyText,
}: {
	items: IncidentRow[];
	statuses: Record<string, string>;
	emptyText: string;
}) {
	if (items.length === 0) {
		return <p className="text-sm text-muted-foreground">{emptyText}</p>;
	}

	return (
		<ul className="divide-y rounded border">
			{items.map((incident) => (
				<li key={incident.id} className="flex items-center justify-between gap-3 px-3 py-2 text-sm">
					<Link
						href={showIncident(incident.id)}
						className="font-medium text-blue-400 hover:underline"
					>
						{incident.title}
					</Link>
					<span className={`shrink-0 font-medium ${statusColorClass[incident.status] ?? ""}`}>
						{statuses[incident.status] ?? incident.status}
					</span>
				</li>
			))}
		</ul>
	);
}

export default function Show({ equipment, openIncidents, resolvedIncidents, statuses }: Props) {
	const { can } = useCan();

	return (
		<div className="space-y-6 p-4">
			<div className="flex items-center justify-between gap-3">
				<div className="flex min-w-0 items-center gap-2">
					<Wrench className="h-6 w-6 shrink-0" />
					<h1 className="truncate text-xl font-semibold">{equipment.name}</h1>
				</div>
				<div className="flex shrink-0 items-center gap-3">
					<Link href={index()} className="text-sm text-primary hover:underline">
						← Lista
					</Link>
					{can("equipment.update") && (
						<Link
							href={edit(equipment.id)}
							className="rounded bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
						>
							Edytuj
						</Link>
					)}
				</div>
			</div>

			<section className="rounded-xl border bg-card p-5">
				<h2 className="mb-4 text-sm font-semibold tracking-wide text-muted-foreground uppercase">
					Szczegóły
				</h2>
				<dl className="grid gap-4 sm:grid-cols-2">
					<div>
						<dt className="text-xs text-muted-foreground">Typ</dt>
						<dd className="mt-1 text-sm font-medium">{equipment.type}</dd>
					</div>
					<div>
						<dt className="text-xs text-muted-foreground">Numer seryjny</dt>
						<dd className="mt-1 text-sm font-medium">{equipment.serial_number ?? "—"}</dd>
					</div>
				</dl>
			</section>

			<section className="space-y-3">
				<h2 className="text-sm font-semibold tracking-wide text-muted-foreground uppercase">
					Aktywne awarie
				</h2>
				<IncidentList
					items={openIncidents}
					statuses={statuses}
					emptyText="Brak otwartych awarii."
				/>
			</section>

			<section className="space-y-3">
				<h2 className="text-sm font-semibold tracking-wide text-muted-foreground uppercase">
					Rozwiązane awarie
				</h2>
				<IncidentList
					items={resolvedIncidents}
					statuses={statuses}
					emptyText="Brak rozwiązanych awarii."
				/>
			</section>
		</div>
	);
}
