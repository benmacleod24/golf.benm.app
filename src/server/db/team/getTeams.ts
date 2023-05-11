import { prisma } from "../prisma";

export const getTeams = async (data?: { includeMembers?: boolean }) => {
	try {
		let include = {};
		if (data && data.includeMembers)
			include = { ...include, teamMember: true };
		const teams = await prisma.team.findMany({ include });
		return teams;
	} catch (e) {
		throw e;
	}
};
