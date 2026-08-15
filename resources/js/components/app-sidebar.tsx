import { Form, Link } from "@inertiajs/react";
import { AlertTriangle, LayoutDashboard, LogOut, Wrench } from "lucide-react";
import AppLogo from "@/components/app-logo";
import { NavMain } from "@/components/nav-main";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import { home } from "@/routes";
import { index as equipment } from "@/routes/equipment";
import { index as incidents } from "@/routes/incidents";
import type { NavItem } from "@/types";

const mainNavItems: NavItem[] = [
	{
		title: "Pulpit",
		href: home(),
		icon: LayoutDashboard,
	},
	{
		title: "Awarie",
		href: incidents(),
		icon: AlertTriangle,
	},
	{
		title: "Urządzenia",
		href: equipment(),
		icon: Wrench,
	},
];

export function AppSidebar() {
	return (
		<Sidebar collapsible="icon">
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton size="lg" asChild>
							<Link href={home()}>
								<AppLogo />
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>

			<SidebarContent>
				<NavMain items={mainNavItems} />
			</SidebarContent>

			<SidebarFooter>
				<SidebarMenu>
					<SidebarMenuItem>
						<Form method="post" action="/logout" className="w-full">
							<SidebarMenuButton type="submit" tooltip={{ children: "Wyloguj" }}>
								<LogOut />
								<span>Wyloguj</span>
							</SidebarMenuButton>
						</Form>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>
		</Sidebar>
	);
}
