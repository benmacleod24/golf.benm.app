import { Prisma } from "@prisma/client";
import { prisma } from "./prisma";
import { z } from "zod";

export const createBatchScorecards = async (
	data: Prisma.ScorecardCreateInput[]
) => {
	try {
		const results = await prisma.$transaction([
			...data.map((c) =>
				prisma.scorecard.create({
					data: c,
				})
			),
		]);

		return results;
	} catch (e) {
		throw e;
	}
};
