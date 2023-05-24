import { filter } from "@chakra-ui/react";
import { Prisma } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import { prisma } from "~/server/db";
import { createBatchScorecards } from "~/server/db/scorecard/createBatchScorecards";
import { response, stringToNumber } from "~/server/helpers";
import { isAdmin } from "~/server/helpers/isAdmin";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
	const { method } = req;

	switch (method) {
		case "GET":
			return GET(req, res);
		case "POST":
			return POST(req, res);
		default:
			throw new Error("Method does not exist at this endpoint.");
	}
};

const getFilterQuery = z.object({
	member: z.ostring().transform(stringToNumber),
	score: z.ostring().transform(stringToNumber),
	date: z.ostring(),
	page: z.ostring().transform(stringToNumber),
});

/**
 * @method GET
 * @url /api/v1/scorecard
 * @description Get all scorecards filter.
 */
const GET = async (req: NextApiRequest, res: NextApiResponse) => {
	const filters = getFilterQuery.parse(req.query);

	try {
		let where = {};

		if (filters.member) {
			where = {
				...where,
				playerId: filters.member,
			};
		}

		if (filters.score) {
			where = {
				...where,
				score: filters.score,
			};
		}

		if (filters.date) {
			where = {
				...where,
				date: new Date(filters.date || "").toISOString(),
			};
		}

		console.log(where);

		const scores = await prisma.scorecard.findMany({
			where,
			take: 20,
			skip: filters.page || 0 * 20,
			include: {
				teamMember: true,
			},
		});

		return res.status(200).json(
			response({
				code: "200",
				message: "Collected scores",
				data: scores,
			})
		);
	} catch (e) {
		throw e;
	}
};

/**
 * @method POST
 * @url /api/v1/scorecard
 * @description Create a batch of new scorecards.
 */
const POST = async (req: NextApiRequest, res: NextApiResponse) => {
	let scorecards = JSON.parse(req.body) as Prisma.ScorecardCreateInput[];

	if (!scorecards) {
		return res.status(400).json(
			response({
				code: "400",
				message: "Could not find any scorecards.",
			})
		);
	}

	// No access to this endpoint.
	if (!(await isAdmin({ req, res }))) {
		return res.status(401).json(
			response({
				code: "401",
				message: "No Access",
			})
		);
	}

	scorecards[0]!.date = new Date(scorecards[0]!.date);

	const scorecardResults = await createBatchScorecards(scorecards);

	if (!scorecardResults) {
		return res.status(500).json(
			response({
				code: "500",
				message: "Error occured while creating scores.",
			})
		);
	}

	return res.status(200).json(
		response({
			data: scorecardResults,
			code: "200",
		})
	);
};

export default handler;
