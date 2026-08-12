import { Link } from '@inertiajs/react';
import { AlertTriangle } from 'lucide-react';


type Incident = {
  id: number;
  title: string;
  status: string;
  equipment: { id: number; name: string } | null;
};

type Props = {
  incidents: Incident[];
  statuses: Record<string, string>;
};

export default function Index({ incidents, statuses }: Props) {
    return (
        <div className="p-4">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div className="flex  gap-2">
                <AlertTriangle className="w-6 h-6 " />
                <h1 className="text-xl font-semibold flex items-center gap-2">
                    Awarie
                </h1>
              </div>
                <Link
                    className="rounded bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                >
                    Dodaj awarie
                </Link>
            </div>

            <div className="overflow-hidden rounded border bg-card">
                <table className="w-full text-left text-sm">
                    <thead className="border-b bg-muted/60 text-muted-foreground">
                        <tr>
                            <th className="px-3 py-2 font-medium">Tytuł</th>
                            <th className="px-3 py-2 font-medium">Status</th>
                            <th className="px-3 py-2 font-medium">Urządzenie powiązane</th>
                        </tr>
                    </thead>
                    <tbody>
                        {incidents.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={3}
                                    className="px-3 py-6 text-center text-muted-foreground"
                                >
                                    Brak awarii.
                                </td>
                            </tr>
                        ) : (
                          incidents.map((incident) => (
                                <tr key={incident.id} className="border-b last:border-0">
                                    <td className="px-3 py-2">{incident.title}</td>
                                    <td className="px-3 py-2"> {statuses[incident.status] ?? incident.status}</td>
                                    <td className="px-3 py-2">
                                        {incident.equipment?.name ?? '-'}
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
