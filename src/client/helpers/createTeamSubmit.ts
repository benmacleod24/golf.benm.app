export const createTeamSubmit = async (teamName: string) => {
	return await fetch(`/api/v1/teams`, {
		method: "POST",
		body: JSON.stringify({ name: teamName }),
	}).then((r) => r.json());
};
