import { z } from "zod";
import { prisma } from ".";
import { stringToNumber } from "../helpers";
import { A_or_B } from "@prisma/client";

export const createPlayer = async (data: z.infer<typeof schema>) => {
	try {
		const player = await prisma.team_Member.create({
			data: {
				firstName: data.firstName,
				lastName: data.lastName,
				teamId: data.teamId as number,
				A_or_B: data.A_or_B as A_or_B,
			},
		});

		return player;
	} catch (e) {
		throw e;
	}
};

const schema = z.object({
	firstName: z.string(),
	lastName: z.string(),
	teamId: z.string().transform(stringToNumber),
	A_or_B: z.ostring(),
});

createPlayer.schema = schema;
