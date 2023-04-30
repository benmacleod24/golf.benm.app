import { NextApiRequest, NextApiResponse } from "next";
import { createTeam, createTeamSchema } from "~/server/db";
import { getTeams } from "~/server/db/getTeams";
import { response } from "~/server/helpers";
import { isAdmin } from "~/server/helpers/isAdmin";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
	const { method } = req;

	switch (method) {
		case "POST":
			return POST(req, res);
		case "GET":
			return GET(req, res);
		default:
			throw new Error("Method does not exist at this endpoint.");
	}
};

/**
 * @method GET
 * @url /api/v1/teams
 * @description Get all the teams
 */
const GET = async (req: NextApiRequest, res: NextApiResponse) => {
	const teams = await getTeams();

	return res.status(200).json(
		response({
			code: "200",
			data: teams || [],
		})
	);
};

/**
 * @method POST
 * @url /api/v1/teams
 * @description Create a new team
 */
const POST = async (req: NextApiRequest, res: NextApiResponse) => {
	const { name } = createTeamSchema.parse(JSON.parse(req.body));

	// No access
	if (!(await isAdmin({ req, res }))) {
		return res.status(401).json(
			response({
				code: "401",
				message: "No Access",
			})
		);
	}

	// Create the new team.
	const newTeam = await createTeam(name);

	if (newTeam === null || !newTeam) {
		return res.status(500).json(
			response({
				code: "500",
				message:
					"Error occured while creating new team, try again please.",
			})
		);
	}

	res.status(200).json(
		response({
			code: "200",
			message: "Successfully created new team!",
			data: newTeam,
		})
	);
};

export default handler;
