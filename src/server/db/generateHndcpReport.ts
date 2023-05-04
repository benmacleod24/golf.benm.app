import { A_or_B } from "@prisma/client";
import { prisma } from "./prisma";

export const generateHndcpReport = async (A_or_B: A_or_B) => {
	try {
		const teamMembers = await prisma.team_Member.findMany({
			include: {
				scorecards: {
					take: 5,
					orderBy: { date: "desc" },
				},
			},
		});

		const scorecardsByTeamMember = teamMembers.reduce<{
			A: any[];
			B: any[];
		}>(
			(result: any, teamMember: any) => {
				teamMember.totalScore = teamMember.scorecards.reduce(
					(prev: any, next: any) => {
						return prev + next.score;
					},
					0
				);

				teamMember.handicap = Math.ceil(
					((teamMember.totalScore - 180) / 5) * 0.8
				);

				if (teamMember.A_or_B === "A") result["A"].push(teamMember);
				if (teamMember.A_or_B === "B") result["B"].push(teamMember);
				return result;
			},
			{ A: [], B: [] }
		);

		return scorecardsByTeamMember;
	} catch (e) {
		throw e;
	}
};
