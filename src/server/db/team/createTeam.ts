import { z } from "zod";
import { prisma } from "..";

export const createTeam = async (teamName: string) => {
	try {
		const team = await prisma.team.create({
			data: {
				name: teamName,
			},
		});

		return team;
	} catch (e) {
		throw e;
	}
};

export const createTeamSchema = z.object({
	name: z.string().min(1),
});
