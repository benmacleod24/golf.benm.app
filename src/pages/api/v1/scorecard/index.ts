import { Prisma } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { createBatchScorecards } from "~/server/db/createBatchScorecards";
import { response } from "~/server/helpers";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
	const { method } = req;

	switch (method) {
		default:
			throw new Error("Method does not exist at this endpoint.");
	}
};

/**
 * @method POST
 * @url /api/v1/scorecard
 * @description Create a batch of new scorecards.
 */
const POST = async (req: NextApiRequest, res: NextApiResponse) => {
	const scorecards = JSON.parse(req.body) as Prisma.ScorecardCreateInput[];

	if (!scorecards) {
		return res.status(400).json(
			response({
				code: "400",
				message: "Could not find any scorecards.",
			})
		);
	}

	const scorecardResults = await createBatchScorecards(scorecards);

	if (!scorecardResults) {
		return res.status(500).json();
	}
};

export default handler;
