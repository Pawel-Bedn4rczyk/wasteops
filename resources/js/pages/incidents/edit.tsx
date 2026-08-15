import { Form } from "@inertiajs/react";
import { destroy, updateDetails } from "@/routes/incidents";

type EquipmentOption = {
	id: number;
	name: string;
	serial_number: string | null;
	type: string;
};

type Props = {
	incident: {
		id: number;
		title: string;
		description: string | null;
		equipment_id: number;
	};
	equipment: EquipmentOption[];
};

export default function Edit({ incident, equipment }: Props) {
	return (
		<div className="p-4">
			<div className="mb-4 flex items-center justify-between gap-3">
				<h1 className="text-xl font-semibold">Edytuj awarię</h1>
				<button
					type="button"
					onClick={() => window.history.back()}
					className="text-sm text-primary hover:underline"
				>
					← Wróć
				</button>
			</div>

			<div className="max-w-lg space-y-6">
				<div className="rounded border bg-card p-4">
					<Form {...updateDetails.form(incident.id)} className="space-y-4">
						{({ errors, processing }) => (
							<>
								<div className="space-y-1">
									<label htmlFor="title" className="text-sm font-medium">
										Tytuł
									</label>
									<input
										id="title"
										name="title"
										type="text"
										defaultValue={incident.title}
										className="w-full rounded border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
									/>
									{errors.title && <div className="text-sm text-destructive">{errors.title}</div>}
								</div>

								<div className="space-y-1">
									<label htmlFor="equipment_id" className="text-sm font-medium">
										Urządzenie
									</label>
									<select
										id="equipment_id"
										name="equipment_id"
										defaultValue={incident.equipment_id}
										className="w-full rounded border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
									>
										{equipment.map((item) => (
											<option key={item.id} value={item.id}>
												{item.type ? `(${item.type}) --- ` : ""}
												{item.name}
												{item.serial_number ? ` --- (${item.serial_number})` : ""}
											</option>
										))}
									</select>
									{errors.equipment_id && (
										<div className="text-sm text-destructive">{errors.equipment_id}</div>
									)}
								</div>

								<div className="space-y-1">
									<label htmlFor="description" className="text-sm font-medium">
										Opis
									</label>
									<textarea
										id="description"
										name="description"
										rows={5}
										defaultValue={incident.description ?? ""}
										className="w-full rounded border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
									/>
									{errors.description && (
										<div className="text-sm text-destructive">{errors.description}</div>
									)}
								</div>

								<button
									type="submit"
									disabled={processing}
									className="rounded bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
								>
									{processing ? "Zapisywanie..." : "Zapisz zmiany"}
								</button>
							</>
						)}
					</Form>
				</div>

				<div className="rounded border border-destructive/40 bg-card p-4">
					<p className="mb-3 text-sm text-muted-foreground">
						Usunięcie awarii jest trwałe (wraz z komentarzami i historią).
					</p>
					<Form {...destroy.form(incident.id)}>
						{({ processing }) => (
							<button
								type="submit"
								disabled={processing}
								className="rounded bg-destructive px-3 py-2 text-sm font-medium text-white hover:bg-destructive/90 disabled:opacity-50"
								onClick={(e) => {
									if (!confirm(`Na pewno usunąć awarię „${incident.title}”?`)) {
										e.preventDefault();
									}
								}}
							>
								{processing ? "Usuwanie..." : "Usuń awarię"}
							</button>
						)}
					</Form>
				</div>
			</div>
		</div>
	);
}
