import { z } from "zod";
import { prisma } from ".";
import { stringToNumber } from "../helpers";

export const createPlayer = async (
	name: { firstName: string; lastName: string },
	teamId: number
) => {
	try {
		const player = await prisma.player.create({
			data: {
				firstName: name.firstName,
				lastName: name.lastName,
				teamId: teamId,
			},
		});

		return player;
	} catch (e) {
		throw e;
	}
};

createPlayer.schema = z.object({
	firstName: z.string(),
	lastName: z.string(),
	teamId: z.string().transform(stringToNumber),
});
