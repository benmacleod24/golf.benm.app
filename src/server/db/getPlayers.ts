import { prisma } from "./prisma";

export const getPlayers = async () => {
	try {
		const players = await prisma.team_Member.findMany();
		return players;
	} catch (e) {
		throw e;
	}
};
