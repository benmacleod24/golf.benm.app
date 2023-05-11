import { prisma } from "./prisma";
import { getTeams } from "./team/getTeams";

export const generateLeaderboard = async () => {
	try {
		const currentYear = new Date().getFullYear();

		const teams = await getTeams({ includeMembers: true });

		// Create a leaderboard based of the teams.
		const leaderboard = teams.map(async (team) => {
			const currentYear = new Date(new Date().getFullYear(), 0, 1);

			const bPlayer = 0;
			const totalCurrWeek = 0;
			const totalPriorWeek = 0;
			const grandTotal = 0;

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
						member.scorecards[0].score;
					return cnt;
				},
				{ A: 0, B: 0 }
			);

			const latestWeekTotal = scorecardsForTeam.reduce(
				(total, member) => {
					if (!member.scorecards[0]) return total;
					return (total = total + member.scorecards[0].score);
				},
				0
			);

			const priorWeekTotal = scorecardsForTeam.reduce(
				(total, member) => {
					if (!member.scorecards[1]) return total;
					return (total = total + member.scorecards[1].score);
				},
				0
			);

			return {
				A_B_scores,
				latestWeekTotal,
				priorWeekTotal,
				grandTotal: latestWeekTotal + priorWeekTotal,
			};
		});

		return Promise.all(leaderboard);
	} catch (e) {
		throw e;
	}
};
