import { usePage } from "@inertiajs/react";
import { SidebarTrigger } from "@/components/ui/sidebar";

export function AppSidebarHeader() {
	const { auth } = usePage().props;
	return (
		<header className="flex h-12 shrink-0 items-center gap-3 px-4 text-primary-foreground justify-between">
			<SidebarTrigger className="-ml-1 text-primary-foreground hover:bg-white/15 hover:text-primary-foreground" />
			<div className="flex flex-col  gap-1 items-end">
				<p className="text-[10px] text-muted-foreground">Zalogowany jako:</p>
				<span className="text-[10px] text-muted-foreground">
					{auth.user?.name ?? auth.user?.email}
				</span>
			</div>
		</header>
	);
}
