import { Prisma } from "@prisma/client";
import { prisma } from "../prisma";
import { z } from "zod";
import dayjs from "dayjs";

export const createBatchScorecards = async (data: any) => {
	try {
		const results = await prisma.$transaction([
			...data.map((c: any) => {
				c.score = Number(c.score);

				if (!dayjs(c.date).isValid()) {
					return undefined;
				}

				c.date = dayjs(c.date).toISOString();

				return prisma.scorecard.create({
					data: {
						score: c.score,
						date: c.date,
						playerId: c.player,
					},
				});
			}),
		]);

		return results;
	} catch (e) {
		throw e;
	}
};
