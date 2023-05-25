import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import { createBatchScorecards } from "~/server/db/scorecard/createBatchScorecards";
import { response, stringToNumber } from "~/server/helpers";
import { isAdmin } from "~/server/helpers/isAdmin";
import { NewScoreType } from "~/types";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
	const { method } = req;

	switch (method) {
		case "POST":
			return POST(req, res);
		default:
			throw new Error("Method does not exist at this endpoint.");
	}
};

/**
 * @method POST
 * @url /api/v2/scores
 * @description Batch create scores.
 */

const postBodyRequest = z.object({
	scores: z.array(
		z.object({
			memberId: z.string().transform(stringToNumber),
			roundScore: z.string().transform(stringToNumber),
			roundDate: z.date(),
			roundPoints: z.string().transform(stringToNumber),
		})
	),
});

const POST = async (req: NextApiRequest, res: NextApiResponse) => {
	const { scores } = postBodyRequest.parse(JSON.parse(req.body));

	if (!scores) {
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

	const scorecardResults = await createBatchScorecards(scores);
};

export default handler;
