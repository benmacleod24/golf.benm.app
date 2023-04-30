import { z } from "zod";
import { createPlayer } from "~/server/db";
import { CreatePlayerFormData } from "../components/Admin/CreatePlayer";
import { SubmitHandler } from "react-hook-form";

export const createPlayerSubmit = async (data: any) => {
	return await fetch(`/api/v1/players`, {
		method: "POST",
		body: JSON.stringify(data),
	}).then((r) => r.json());
};
