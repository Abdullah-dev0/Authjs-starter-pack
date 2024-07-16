import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";

async function Setting() {
	const session = await auth();

	const handleSignOut = async () => {
		"use server";
		await signOut({
			redirectTo: "/auth/login",
		});
	};

	return (
		<div>
			{JSON.stringify(session)}

			<div>
				<form action={handleSignOut}>
					<Button type="submit">Sign Out</Button>
				</form>
			</div>
		</div>
	);
}

export default Setting;
