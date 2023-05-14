import { Team_Member } from "@prisma/client";

export const sortIntoMemberGroup = (members: Team_Member[]) => {
	const initReduceValue = [
		{ label: "A Players", options: [] as any },
		{ label: "B Players", options: [] as any },
		{ label: "Subs", options: [] as any },
	];

	return members.reduce((prev, next) => {
		if (next.A_or_B === "A") {
			prev[0]?.options.push({
				label: next.firstName + " " + next.lastName,
				value: next.id,
			});
		}

		if (next.A_or_B === "B") {
			prev[1]?.options.push({
				label: next.firstName + " " + next.lastName,
				value: next.id,
			});
		}

		return prev;
	}, initReduceValue);
};
