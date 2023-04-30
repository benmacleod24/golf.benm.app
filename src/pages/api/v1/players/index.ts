import { NextApiRequest, NextApiResponse } from "next";
import { createPlayer } from "~/server/db";
import { response } from "~/server/helpers";
import { isAdmin } from "~/server/helpers/isAdmin";

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
 * @url /api/v1/player
 * @description Create a new player
 */
const POST = async (req: NextApiRequest, res: NextApiResponse) => {
	const { firstName, lastName, teamId } = createPlayer.schema.parse(
		JSON.parse(req.body)
	);

	// No access to this endpoint.
	if (!(await isAdmin({ req, res }))) {
		return res.status(401).json(
			response({
				code: "401",
				message: "No Access",
			})
		);
	}

	const newPlayer = await createPlayer(
		{ firstName, lastName },
		teamId as number
	);

	if (!newPlayer || newPlayer === null) {
		return res.status(500).json(
			response({
				code: "500",
				message: "Error occued while creating player, try again.",
			})
		);
	}

	return res.status(200).json(
		response({
			code: "200",
			data: newPlayer,
			message: "Created new player!",
		})
	);
};

export default handler;
