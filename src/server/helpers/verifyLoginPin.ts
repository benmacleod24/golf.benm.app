import { prisma } from "~/server/db";

export const verifyLoginPin = async (pin: string) => {
	if (!pin) return false;

	const validPin = await prisma.loginPins.findUnique({
		where: { pin },
	});

	if (!validPin || validPin == null) return false;

	return validPin;
};
