import { prisma } from "../prisma";

export const aggregateScorecardByPlayer = async () => {
	try {
		const groundScorecard = await prisma.scorecard.groupBy({
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
