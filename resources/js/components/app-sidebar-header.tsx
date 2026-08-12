import { SidebarTrigger } from '@/components/ui/sidebar';

export function AppSidebarHeader() {
    return (
        <header className="flex h-12 shrink-0 items-center gap-3 bg-primary px-4 text-primary-foreground">
            <SidebarTrigger className="-ml-1 text-primary-foreground hover:bg-white/15 hover:text-primary-foreground" />
        </header>
    );
}
