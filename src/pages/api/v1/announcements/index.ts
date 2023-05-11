import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "~/server/db";
import { createAnnouncement } from "~/server/db/announcements/createAnnouncement";
import { getAnnouncements } from "~/server/db/announcements/getAnnouncements";
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
 * @url /api/v1/announcements
 * @description Get announcement.
 */
const GET = async (req: NextApiRequest, res: NextApiResponse) => {
	const { limit } = getAnnouncements.query.parse(req.query);

	const announcements = await getAnnouncements(limit);

	if (!announcements || announcements == undefined) {
		return res.status(500).json(
			response({
				code: "500",
				message: "Error occured while fetching announcements.",
			})
		);
	}

	return res.status(200).json(
		response({
			code: "200",
			message: "Successfully collected all Announcements.",
			data: announcements,
		})
	);
};

/**
 * @method POST
 * @url /api/v1/announcements
 * @description Create a new announcements
 */
const POST = async (req: NextApiRequest, res: NextApiResponse) => {
	const data = createAnnouncement.schema.parse(JSON.parse(req.body));

	// No access to this endpoint.
	if (!(await isAdmin({ req, res }))) {
		return res.status(401).json(
			response({
				code: "401",
				message: "No Access",
			})
		);
	}

	if (!data) {
		return res.status(404).json(
			response({
				code: "404",
				message: "Could not find correct data to create.",
			})
		);
	}

	const announcement = await createAnnouncement(data);

	if (!announcement || !announcement.id) {
		return res.status(500).json(
			response({
				code: "500",
				message: "Error occured while creating announcement",
			})
		);
	}

	return res.status(200).json(
		response({
			code: "200",
			data: announcement,
			message: "Successfully created announcement.",
		})
	);
};

export default handler;
