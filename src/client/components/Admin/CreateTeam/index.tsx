import React, { useState, useEffect } from "react";
import { Admin } from "..";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createPlayer, createTeamSchema } from "~/server/db";
import { Form } from "../../Form";
import { Grid, useToast } from "@chakra-ui/react";
import { mutate } from "swr";
import { createPlayerSubmit } from "~/client/helpers/createPlayerSubmit";
import { createTeamSubmit } from "~/client/helpers/createTeamSubmit";

interface CreateTeamProps {}

/**
 * @description Create Team Component
 * @return {React.FC<CreateTeam>}
 */
const CreateTeam: React.FC<CreateTeamProps> = (props) => {
	const { register, handleSubmit, formState, ...rest } =
		useForm<z.infer<typeof createTeamSchema>>();
	const toast = useToast();

	const onSubmit = async (data: z.infer<typeof createTeamSchema>) => {
		const res = await createTeamSubmit(data.name);

		if (res.code === "200") {
			rest.reset();
			mutate("/api/v1/teams");
			toast({
				title: "Success!",
				status: "success",
				description: "Successfully created a team.",
				position: "bottom-right",
			});
		}
	};

	return (
		<Admin.Section title="Create New Team">
			<form onSubmit={handleSubmit(onSubmit)}>
				<Form.TextInput
					formState={formState}
					name="name"
					register={register}
					title="Team Name"
				/>

				<Form.SubmitButton
					formState={formState}
					buttonProps={{
						colorScheme: "whatsapp",
						w: "full",
						mt: "5",
						type: "submit",
					}}
				>
					Create Team
				</Form.SubmitButton>
			</form>
		</Admin.Section>
	);
};

export default CreateTeam;
