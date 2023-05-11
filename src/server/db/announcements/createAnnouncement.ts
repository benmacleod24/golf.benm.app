import { z } from "zod";
import { prisma } from "../prisma";

export const createAnnouncement = async (data: z.infer<typeof schema>) => {
	try {
		const announcement = await prisma.announcement.create({
			data: {
				message: data.message,
				title: data.title,
			},
		});

		return announcement;
	} catch (e) {
		throw e;
	}
};

const schema = z.object({
	message: z.string(),
	title: z.string(),
});

createAnnouncement.schema = schema;
