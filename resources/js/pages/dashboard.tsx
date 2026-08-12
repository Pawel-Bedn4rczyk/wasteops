import { Link } from '@inertiajs/react';
import {
    AlertTriangle,
    CheckCircle2,
    Hammer,
    LayoutDashboard,
    Wrench,
} from 'lucide-react';
import type { ComponentType } from 'react';
import { index as equipment } from '@/routes/equipment';
import { index as incidents } from '@/routes/incidents';

type Stats = {
    equipment_total: number;
    equipment_in_repair: number;
    incidents_open: number;
    incidents_resolved: number;
};

type Props = {
    stats: Stats;
};

type StatCard = {
    key: keyof Stats;
    label: string;
    description: string;
    href: ReturnType<typeof equipment>;
    icon: ComponentType<{ className?: string }>;
    accent: string;
};

export default function Dashboard({ stats }: Props) {
    const cards: StatCard[] = [
        {
            key: 'equipment_total',
            label: 'Urządzenia',
            description: 'Wszystkie urządzenia w systemie',
            href: equipment(),
            icon: Wrench,
            accent: 'text-sky-400',
        },
        {
            key: 'equipment_in_repair',
            label: 'W naprawie',
            description: 'Urządzenia z awarią w trakcie',
            href: incidents(),
            icon: Hammer,
            accent: 'text-yellow-500',
        },
        {
            key: 'incidents_open',
            label: 'Otwarte awarie',
            description: 'Oczekujące na rozpoczęcie',
            href: incidents(),
            icon: AlertTriangle,
            accent: 'text-red-400',
        },
        {
            key: 'incidents_resolved',
            label: 'Zakończone awarie',
            description: 'Rozwiązane zgłoszenia',
            href: incidents(),
            icon: CheckCircle2,
            accent: 'text-green-500',
        },
    ];

    return (
        <div className="p-4">
            <div className="mb-6 flex items-center gap-2">
                <LayoutDashboard className="h-6 w-6" />
                <h1 className="text-xl font-semibold">Pulpit</h1>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {cards.map((card) => {
                    const Icon = card.icon;

                    return (
                        <Link
                            key={card.key}
                            href={card.href}
                            className="rounded-xl border bg-card p-5 shadow-sm transition hover:border-primary/40 hover:bg-accent/30"
                        >
                            <div className="mb-4 flex items-start justify-between gap-3">
                                <p className="text-sm font-medium text-muted-foreground">
                                    {card.label}
                                </p>
                                <Icon className={`h-5 w-5 shrink-0 ${card.accent}`} />
                            </div>

                            <p className={`text-4xl font-semibold tracking-tight ${card.accent}`}>
                                {stats[card.key]}
                            </p>

                            <p className="mt-2 text-sm text-muted-foreground">
                                {card.description}
                            </p>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
