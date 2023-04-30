import { z } from "zod";
import { stringToNumber } from "../helpers";
import { prisma } from "./prisma";

export const createRoundCard = async (data: z.infer<typeof schema>) => {
	const { date, playerId, score } = data;

	if (!playerId || !score) return null;

	try {
		const roundCard = await prisma.round_Card.create({
			data: {
				date,
				playerId,
				score,
			},
		});

		return roundCard;
	} catch (e) {
		throw e;
	}
};

const schema = z.object({
	playerId: z.string().transform(stringToNumber),
	score: z.string().transform(stringToNumber),
	date: z.string().transform((str) => new Date(str)),
});
createRoundCard.schema = schema;
