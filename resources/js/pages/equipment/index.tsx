import { Link } from '@inertiajs/react';
import { create } from '@/routes/equipment';

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
    return (
        <div>
            <h1>Urządzenia</h1>

            <p>
                <Link href={create()}>Dodaj urządzenie</Link>
            </p>

            <ul>
                {equipment.map((item) => (
                    <li key={item.id}>
                        {item.name} | {item.type} | {item.serial_number ?? '-'}
                    </li>
                ))}
            </ul>
        </div>
    );
}

