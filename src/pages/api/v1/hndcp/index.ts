import { NextApiRequest, NextApiResponse } from "next";
import { generateHndcpReport } from "~/server/db/generateHndcpReport";

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
 * @url /api/v1/hndcp
 * @description Generate new handicap report.
 */
const GET = async (req: NextApiRequest, res: NextApiResponse) => {
	const data = await generateHndcpReport("A");

	res.status(200).json(data);
	return data;
};

export { GET as getHndcpReport };
export default handler;
