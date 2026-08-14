import { Form, usePage } from "@inertiajs/react";
import AppLogoIcon from "@/components/app-logo-icon";

export default function Login() {
	const { name } = usePage().props;

	return (
		<div className="flex min-h-screen items-center justify-center p-4">
			<div className="w-full max-w-sm rounded border bg-card p-6">
				<div className="mb-6 flex flex-col items-center gap-2 text-center">
					<div className="flex size-12 items-center justify-center rounded-md bg-primary text-primary-foreground">
						<AppLogoIcon className="size-7" />
					</div>
					<div className="text-lg font-semibold">{name}</div>
					<p className="text-sm text-muted-foreground">Zaloguj się do konta</p>
				</div>
				<Form method="post" action="/login" className="space-y-4">
					{({ errors, processing }) => (
						<>
							<div className="space-y-1">
								<label htmlFor="email" className="text-sm font-medium">
									Email
								</label>
								<input
									id="email"
									name="email"
									type="email"
									autoComplete="username"
									required
									className="w-full rounded border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
								/>
								{errors.email && <div className="text-sm text-destructive">{errors.email}</div>}
							</div>

							<div className="space-y-1">
								<label htmlFor="password" className="text-sm font-medium">
									Hasło
								</label>
								<input
									id="password"
									name="password"
									type="password"
									autoComplete="current-password"
									required
									className="w-full rounded border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
								/>
								{errors.password && (
									<div className="text-sm text-destructive">{errors.password}</div>
								)}
							</div>

							<label className="flex items-center gap-2 text-sm">
								<input type="checkbox" name="remember" />
								Zapamiętaj mnie
							</label>

							<button
								type="submit"
								disabled={processing}
								className="w-full rounded bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
							>
								{processing ? "Logowanie..." : "Zaloguj"}
							</button>
						</>
					)}
				</Form>
			</div>
		</div>
	);
}
