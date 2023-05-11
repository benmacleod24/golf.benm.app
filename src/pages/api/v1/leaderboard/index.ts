import { NextApiRequest, NextApiResponse } from "next";
import { generateLeaderboard } from "~/server/db/generateLeaderboard";
import { response } from "~/server/helpers";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
	const { method } = req;

	switch (method) {
		case "GET":
			return GET(req, res);
		default:
			throw new Error("Method does not exist at this endpoint.");
	}
};

/**
 * @method GET
 * @url /api/v1/leaderboard
 * @description
 */
const GET = async (req: NextApiRequest, res: NextApiResponse) => {
	const leaderboard = await generateLeaderboard();

	return res.status(200).json(
		response({
			code: "200",
			data: leaderboard,
			message: "Successfully generated the leaderboard.",
		})
	);
};

export default handler;
