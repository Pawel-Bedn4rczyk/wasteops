import type { ComponentProps } from 'react';
import { SidebarInset } from '@/components/ui/sidebar';

type Props = ComponentProps<'main'>;

export function AppContent({ children, ...props }: Props) {
    return <SidebarInset {...props}>{children}</SidebarInset>;
}
