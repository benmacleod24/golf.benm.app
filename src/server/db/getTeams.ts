import { prisma } from "./prisma";

export const getTeams = async () => {
	try {
		const teams = await prisma.team.findMany();
		return teams;
	} catch (e) {
		throw e;
	}
};
