import { Prisma } from "@prisma/client";
import { prisma } from "../prisma";
import { z } from "zod";
import dayjs from "dayjs";
import { NewScoreType } from "~/types";

export const createBatchScorecards = async (data: NewScoreType[]) => {
	try {
		const results = await prisma.$transaction([
			...data.map((s) =>
				prisma.scorecard.create({
					data: {
						date: s.roundDate!,
						score: s.roundScore!,
						numOfHolesWon: 0,
						numOfOverAll: 0,
						playerId: s.memberId!,
					},
				})
			),
		]);

		return results;
	} catch (e) {
		throw e;
	}
};
