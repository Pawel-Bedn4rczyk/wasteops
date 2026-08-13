import { Link } from '@inertiajs/react';
import { AlertTriangle } from 'lucide-react';
import { statusColorClass } from '@/lib/incident-status';
import { index } from '@/routes/incidents';

type Props = {
    incident: {
        id: number;
        title: string;
        description: string | null;
        status: string;
        equipment: {
            id: number;
            name: string;
            serial_number: string | null;
            type: string;
        } | null;
    };
    statuses: Record<string, string>;
};

export default function Show({ incident, statuses }: Props) {
    return (
        <div className="p-4">
            <div className="mb-4 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                    <AlertTriangle className="h-6 w-6" />
                    <h1 className="text-xl font-semibold">{incident.title}</h1>
                </div>
                <Link href={index()} className="text-sm text-primary hover:underline">
                    ← Wróć do listy
                </Link>
            </div>

            <div className="max-w-2xl space-y-4 rounded-xl border bg-card p-5">
                <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                        <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                            Status
                        </p>
                        <p
                            className={`mt-1 text-sm font-medium ${statusColorClass[incident.status] ?? ''}`}
                        >
                            {statuses[incident.status] ?? incident.status}
                        </p>
                    </div>

                    <div>
                        <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                            Urządzenie
                        </p>
                        <p className="mt-1 text-sm">
                            {incident.equipment
                                ? `${incident.equipment.name}${
                                      incident.equipment.serial_number
                                          ? ` (${incident.equipment.serial_number})`
                                          : ''
                                  }`
                                : '—'}
                        </p>
                        {incident.equipment?.type && (
                            <p className="mt-0.5 text-xs text-muted-foreground">
                                {incident.equipment.type}
                            </p>
                        )}
                    </div>
                </div>

                <div>
                    <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                        Opis
                    </p>
                    <p className="mt-1 text-sm whitespace-pre-wrap text-foreground/90">
                        {incident.description?.trim()
                            ? incident.description
                            : 'Brak opisu.'}
                    </p>
                </div>
            </div>
        </div>
    );
}
