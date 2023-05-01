import { create } from "domain";
import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import { prisma } from "~/server/db";
import { createRoundCard } from "~/server/db/createRoundCard";
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
 * @url /api/v1/round-card
 * @description Create a new round card.
 */
const POST = async (req: NextApiRequest, res: NextApiResponse) => {
	const body = createRoundCard.schema.parse(JSON.parse(req.body));

	// No access to this endpoint.
	if (!(await isAdmin({ req, res }))) {
		return res.status(401).json(
			response({
				code: "401",
				message: "No Access",
			})
		);
	}

	if (!z.coerce.date().safeParse(body.date)) {
		return res.status(400).json(
			response({
				code: "400",
				message: "Invalid date.",
			})
		);
	}

	const roundCard = await createRoundCard(body);

	if (!roundCard) {
		return res.status(500).json(
			response({
				code: "500",
				message: "Error occured while creating new round card.",
			})
		);
	}

	return res.status(200).json(
		response({
			code: "200",
			data: roundCard,
		})
	);
};

export default handler;
