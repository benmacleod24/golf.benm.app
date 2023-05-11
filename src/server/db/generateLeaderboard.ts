import { prisma } from "./prisma";
import { getTeams } from "./team/getTeams";

export const generateLeaderboard = async () => {
	try {
		const currentYear = new Date().getFullYear();

		const teams = await getTeams({ includeMembers: true });

		// Create a leaderboard based of the teams.
		const leaderboard = teams.map(async (team) => {
			const currentYear = new Date(new Date().getFullYear(), 0, 1);

			const scorecardsForTeam = await prisma.team_Member.findMany({
				where: {
					teamId: team.id,
				},
				include: {
					scorecards: {
						where: {
							date: {
								gte: currentYear,
							},
						},
						orderBy: { date: "desc" },
						take: 2,
					},
				},
			});

			// Collect Player A & B Latest Scores
			const A_B_scores = scorecardsForTeam.reduce(
				(cnt, member) => {
					if (!member.scorecards[0]) return cnt;
					cnt[member.A_or_B] = cnt[member.A_or_B] =
						member.scorecards[0].numOfHolesWon +
						member.scorecards[0].numOfOverAll;
					return cnt;
				},
				{ A: 0, B: 0 }
			);

			// Count the total number of points for latest scorecard.
			const latestWeekTotal = scorecardsForTeam.reduce(
				(total, member) => {
					if (!member.scorecards[0]) return total;
					return (total =
						total +
						member.scorecards[0].numOfHolesWon +
						member.scorecards[0].numOfOverAll);
				},
				0
			);

			// Count the total number of points the prior week.
			const priorWeekTotal = scorecardsForTeam.reduce(
				(total, member) => {
					if (!member.scorecards[1]) return total;
					return (total =
						total +
						member.scorecards[1].numOfHolesWon +
						member.scorecards[1]?.numOfOverAll);
				},
				0
			);

			return {
				team: {
					id: team.id,
					name: team.name,
				},
				A_B_scores,
				latestWeekTotal,
				priorWeekTotal,
				grandTotal: latestWeekTotal + priorWeekTotal,
			};
		});

		return sortLeaderboard(await Promise.all(leaderboard));
	} catch (e) {
		throw e;
	}
};

const sortLeaderboard = (
	leaderboard: {
		team: {
			id: number;
			name: string;
		};
		A_B_scores: {
			A: number;
			B: number;
		};
		latestWeekTotal: number;
		priorWeekTotal: number;
		grandTotal: number;
	}[]
) => {
	const scoresWithZeros = leaderboard
		.filter((l) => l.grandTotal <= 0)
		.sort((a, b) => a.team.name.localeCompare(b.team.name));

	const scoresWithNonZero = leaderboard
		.filter((l) => l.grandTotal > 0)
		.sort((a, b) => a.grandTotal - b.grandTotal);

	return [...scoresWithNonZero, ...scoresWithZeros];
};
