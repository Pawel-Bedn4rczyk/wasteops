import { Form, Link } from '@inertiajs/react';
import { index, store } from '@/routes/equipment';

type Props = {
    types: Record<string, string>;
};

export default function Create({ types }: Props) {
    return (
        <div>
            <h1>Dodaj urządzenie</h1>

            <p>
                <Link href={index()}>← Wróć do listy</Link>
            </p>

            <Form {...store.form()}>
                {({ errors, processing }) => (
                    <>
                        <div>
                            <label htmlFor="name">Nazwa</label>
                            <input id="name" name="name" type="text" />
                            {errors.name && <div>{errors.name}</div>}
                        </div>

                        <div>
                            <label htmlFor="type">Typ</label>
                            <select id="type" name="type" defaultValue="">
                                <option value="" disabled>
                                    Wybierz typ
                                </option>
                                {Object.entries(types).map(([value, label]) => (
                                    <option key={value} value={value}>
                                        {label}
                                    </option>
                                ))}
                            </select>
                            {errors.type && <div>{errors.type}</div>}
                        </div>

                        <div>
                            <label htmlFor="serial_number">Numer seryjny</label>
                            <input id="serial_number" name="serial_number" type="text" />
                            {errors.serial_number && <div>{errors.serial_number}</div>}
                        </div>

                        <button type="submit" disabled={processing}>
                            {processing ? 'Zapisywanie...' : 'Zapisz'}
                        </button>
                    </>
                )}
            </Form>
        </div>
    );
}
