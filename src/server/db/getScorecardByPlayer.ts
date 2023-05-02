import { prisma } from "./prisma";

export const aggregateScorecardByPlayer = async () => {
	try {
		const groundScorecard = await prisma.round_Card.groupBy({
			by: ["playerId"],
			take: 3,
			orderBy: {
				playerId: "asc",
			},
		});

		return groundScorecard;
	} catch (e) {
		throw e;
	}
};
