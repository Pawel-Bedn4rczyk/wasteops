import { Link } from "@inertiajs/react";
import { AlertTriangle, Wrench } from "lucide-react";
import AppLogo from "@/components/app-logo";
import { NavMain } from "@/components/nav-main";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { index as equipment } from "@/routes/equipment";
import { index as incidents } from "@/routes/incidents";
import type { NavItem } from "@/types";

const mainNavItems: NavItem[] = [
  {
    title: "Urządzenia",
    href: equipment(),
    icon: Wrench,
  },
  {
    title: "Awarie",
    href: incidents(),
    icon: AlertTriangle,
  },
];

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href={equipment()} prefetch>
                <AppLogo />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={mainNavItems} />
      </SidebarContent>
    </Sidebar>
  );
}
