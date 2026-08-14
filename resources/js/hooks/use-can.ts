import { usePage } from "@inertiajs/react";

export function useCan() {
	const { auth } = usePage().props;

	const can = (permission: string): boolean => {
		return auth.permissions.includes(permission);
	};

	return { can };
}
