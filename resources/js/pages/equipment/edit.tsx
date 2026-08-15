import { Form } from "@inertiajs/react";
import { destroy, update } from "@/routes/equipment";

type Props = {
	equipment: {
		id: number;
		name: string;
		type: string;
		serial_number: string | null;
	};
	types: Record<string, string>;
	incidentsCount: number;
};

export default function Edit({ equipment, types, incidentsCount }: Props) {
	return (
		<div className="p-4">
			<div className="mb-4 flex items-center justify-between gap-3">
				<h1 className="text-xl font-semibold">Edytuj urządzenie</h1>
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
					<Form {...update.form(equipment.id)} className="space-y-4">
						{({ errors, processing }) => (
							<>
								<div className="space-y-1">
									<label htmlFor="name" className="text-sm font-medium">
										Nazwa
									</label>
									<input
										id="name"
										name="name"
										type="text"
										defaultValue={equipment.name}
										className="w-full rounded border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
									/>
									{errors.name && <div className="text-sm text-destructive">{errors.name}</div>}
								</div>

								<div className="space-y-1">
									<label htmlFor="type" className="text-sm font-medium">
										Typ
									</label>
									<select
										id="type"
										name="type"
										defaultValue={equipment.type}
										className="w-full rounded border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
									>
										{Object.entries(types).map(([value, label]) => (
											<option key={value} value={value}>
												{label}
											</option>
										))}
									</select>
									{errors.type && <div className="text-sm text-destructive">{errors.type}</div>}
								</div>

								<div className="space-y-1">
									<label htmlFor="serial_number" className="text-sm font-medium">
										Numer seryjny
									</label>
									<input
										id="serial_number"
										name="serial_number"
										type="text"
										defaultValue={equipment.serial_number ?? ""}
										className="w-full rounded border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
									/>
									{errors.serial_number && (
										<div className="text-sm text-destructive">{errors.serial_number}</div>
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
						Usunięcie urządzenia trwale usunie także wszystkie powiązane awarie ({incidentsCount}),
						komentarze i historię. Tej operacji nie można cofnąć.
					</p>
					<Form {...destroy.form(equipment.id)}>
						{({ processing }) => (
							<button
								type="submit"
								disabled={processing}
								className="rounded bg-destructive px-3 py-2 text-sm font-medium text-white hover:bg-destructive/90 disabled:opacity-50"
								onClick={(e) => {
									if (
										!confirm(
											`Na pewno usunąć „${equipment.name}” oraz ${incidentsCount} powiązanych awarii?`,
										)
									) {
										e.preventDefault();
									}
								}}
							>
								{processing ? "Usuwanie..." : "Usuń urządzenie"}
							</button>
						)}
					</Form>
				</div>
			</div>
		</div>
	);
}
