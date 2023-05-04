import { NextApiRequest, NextApiResponse } from "next";
import { createPlayer } from "~/server/db";
import { getPlayers } from "~/server/db/getPlayers";
import { response } from "~/server/helpers";
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

/**
 * @method GET
 * @url /api/v1/players
 * @description Get all the teams
 */
const GET = async (req: NextApiRequest, res: NextApiResponse) => {
	const players = await getPlayers();

	console.log(players);

	return res.status(200).json(
		response({
			code: "200",
			data: players || [],
		})
	);
};

/**
 * @method POST
 * @url /api/v1/player
 * @description Create a new player
 */
const POST = async (req: NextApiRequest, res: NextApiResponse) => {
	const data = createPlayer.schema.parse(JSON.parse(req.body));

	// No access to this endpoint.
	if (!(await isAdmin({ req, res }))) {
		return res.status(401).json(
			response({
				code: "401",
				message: "No Access",
			})
		);
	}

	const newPlayer = await createPlayer(data);

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
