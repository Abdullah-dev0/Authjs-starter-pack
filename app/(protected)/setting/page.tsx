import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";

const Setting = async () => {
	const session = await auth();

	const handleSignOut = async () => {
		"use server";
		await signOut({
			redirectTo: "/auth/login",
		});
	};

	return (
		<div>
			<div>{JSON.stringify(session, null, 2)}</div>

			<div>
				<form action={handleSignOut}>
					<Button type="submit">Sign Out</Button>
				</form>
			</div>
		</div>
	);
};

export default Setting;
