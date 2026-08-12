import { Form, Link } from "@inertiajs/react";
import { index, store } from "@/routes/incidents";

type Props = {
	equipment: { id: number; name: string; serial_number: string | null; type: string }[];
};

export default function Create({ equipment }: Props) {
	return (
		<div className="p-4">
			<div className="mb-4 flex items-center justify-between gap-3">
				<h1 className="text-xl font-semibold">Dodaj awarię</h1>
				<Link href={index()} className="text-sm text-primary hover:underline">
					← Wróć do listy
				</Link>
			</div>

			<div className="max-w-lg rounded border bg-card p-4">
				<Form {...store.form()} className="space-y-4">
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
									className="w-full rounded border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
								/>
								{errors.title && <div className="text-sm text-destructive">{errors.title}</div>}
							</div>

							<div className="space-y-1">
								<label htmlFor="equipment_id" className="text-sm font-medium">
									Wybierz powiązane urządzenie
								</label>
								<select
									id="equipment_id"
									name="equipment_id"
									defaultValue=""
									className="w-full rounded border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
								>
									<option value="" disabled>
										Wybierz urządzenie
									</option>
									{equipment.map((item) => (
										<option key={item.id} value={item.id}>
											{item.type ? `(${item.type}) --- ` : ""}
											{item.name} {item.serial_number ? ` --- (${item.serial_number})` : ""}
										</option>
									))}
								</select>
								{errors.equipment_id && (
									<div className="text-sm text-destructive">{errors.equipment_id}</div>
								)}
							</div>

							<div className="space-y-1">
								<label htmlFor="description" className="text-sm font-medium">
									Opis awarii
								</label>
								<textarea
									id="description"
									name="description"
									className="w-full rounded border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
								></textarea>
								{errors.description && (
									<div className="text-sm text-destructive">{errors.description}</div>
								)}
							</div>

							<button
								type="submit"
								disabled={processing}
								className="rounded bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
							>
								{processing ? "Zapisywanie..." : "Zapisz"}
							</button>
						</>
					)}
				</Form>
			</div>
		</div>
	);
}
