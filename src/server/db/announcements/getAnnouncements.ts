import { z } from "zod";
import { prisma } from "../prisma";
import { stringToNumber } from "~/server/helpers";

export const getAnnouncements = async (
	limit?: z.infer<typeof query>["limit"]
) => {
	try {
		const announcements = prisma.announcement.findMany({
			take: limit || 7,
			orderBy: {
				createdAt: "desc",
			},
		});

		return announcements;
	} catch (e) {
		throw e;
	}
};

const query = z.object({
	limit: z.ostring().transform(stringToNumber),
});

getAnnouncements.query = query;
