import { Form, Link } from '@inertiajs/react';
import { index, store } from '@/routes/equipment';

type Props = {
    types: Record<string, string>;
};

export default function Create({ types }: Props) {
    return (
        <div className="p-4">
            <div className="mb-4 flex items-center justify-between gap-3">
                <h1 className="text-xl font-semibold">Dodaj urządzenie</h1>
                <Link
                    href={index()}
                    className="text-sm text-primary hover:underline"
                >
                    ← Wróć do listy
                </Link>
            </div>

            <div className="max-w-lg rounded border bg-card p-4">
                <Form {...store.form()} className="space-y-4">
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
                                    className="w-full rounded border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
                                />
                                {errors.name && (
                                    <div className="text-sm text-destructive">
                                        {errors.name}
                                    </div>
                                )}
                            </div>

                            <div className="space-y-1">
                                <label htmlFor="type" className="text-sm font-medium">
                                    Typ
                                </label>
                                <select
                                    id="type"
                                    name="type"
                                    defaultValue=""
                                    className="w-full rounded border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
                                >
                                    <option value="" disabled>
                                        Wybierz typ
                                    </option>
                                    {Object.entries(types).map(([value, label]) => (
                                        <option key={value} value={value}>
                                            {label}
                                        </option>
                                    ))}
                                </select>
                                {errors.type && (
                                    <div className="text-sm text-destructive">
                                        {errors.type}
                                    </div>
                                )}
                            </div>

                            <div className="space-y-1">
                                <label
                                    htmlFor="serial_number"
                                    className="text-sm font-medium"
                                >
                                    Numer seryjny
                                </label>
                                <input
                                    id="serial_number"
                                    name="serial_number"
                                    type="text"
                                    className="w-full rounded border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
                                />
                                {errors.serial_number && (
                                    <div className="text-sm text-destructive">
                                        {errors.serial_number}
                                    </div>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="rounded bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
                            >
                                {processing ? 'Zapisywanie...' : 'Zapisz'}
                            </button>
                        </>
                    )}
                </Form>
            </div>
        </div>
    );
}
