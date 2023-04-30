import { GetServerSidePropsContext } from "next";
import { getServerAuthSession } from "~/server/auth";

export const isAdmin = async (ctx: {
	req: GetServerSidePropsContext["req"];
	res: GetServerSidePropsContext["res"];
}) => {
	const session = await getServerAuthSession(ctx);

	if (!session || session == null) return false;
	if (session.user && session.user.role === "ADMIN") return true;
};
