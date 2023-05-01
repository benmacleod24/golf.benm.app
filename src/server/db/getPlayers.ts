import { prisma } from "./prisma";

export const getPlayers = async () => {
	try {
		const players = await prisma.player.findMany();
		return players;
	} catch (e) {
		throw e;
	}
};
