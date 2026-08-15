import { Link } from "@inertiajs/react";
import { FolderSearch2Icon, Pencil, Wrench } from "lucide-react";
import { useCan } from "@/hooks/use-can";
import { create, edit, show } from "@/routes/equipment";

type Equipment = {
	id: number;
	name: string;
	type: string;
	serial_number: string | null;
};

type Props = {
	equipment: Equipment[];
};

export default function Index({ equipment }: Props) {
	const { can } = useCan();

	return (
		<div className="p-4">
			<div className="mb-4 flex items-center justify-between gap-3">
				<div className="flex  gap-2">
					<Wrench className="w-6 h-6 " />
					<h1 className="text-xl font-semibold">Urządzenia</h1>
				</div>
				{can("equipment.create") && (
					<Link
						href={create()}
						className="rounded bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
					>
						Dodaj urządzenie
					</Link>
				)}
			</div>

			<div className="overflow-hidden rounded border bg-card">
				<table className="w-full text-left text-sm">
					<thead className="border-b bg-muted/60 text-muted-foreground">
						<tr>
							<th className="px-3 py-2 font-medium">Nazwa</th>
							<th className="px-3 py-2 font-medium">Typ</th>
							<th className="px-3 py-2 font-medium">Numer seryjny</th>
							<th className="px-3 py-2  text-right font-medium">Akcje</th>
						</tr>
					</thead>
					<tbody>
						{equipment.length === 0 ? (
							<tr>
								<td colSpan={3} className="px-3 py-6 text-center text-muted-foreground">
									Brak urządzeń.
								</td>
							</tr>
						) : (
							equipment.map((item) => (
								<tr key={item.id} className="border-b last:border-0">
									<td className="px-3 py-2">{item.name}</td>
									<td className="px-3 py-2">{item.type}</td>
									<td className="px-3 py-2">{item.serial_number ?? "-"}</td>
									<td className="px-3 py-2">
										<div className="flex items-center justify-end gap-1">
											<Link
												href={show(item.id)}
												title="Szczegóły"
												aria-label="Szczegóły"
												className="rounded p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground"
											>
												<FolderSearch2Icon className="h-4 w-4" />
											</Link>
											{can("equipment.update") && (
												<Link
													href={edit(item.id)}
													title="Edytuj"
													aria-label="Edytuj"
													className="rounded p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground"
												>
													<Pencil className="h-4 w-4" />
												</Link>
											)}
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
