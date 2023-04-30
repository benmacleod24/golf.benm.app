import React, { useState, useEffect } from "react";
import { Admin } from "..";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createPlayer } from "~/server/db";
import { Form } from "../../Form";
import { Grid, useToast } from "@chakra-ui/react";
import useSWR from "swr";
import { createPlayerSubmit } from "~/client/helpers/createPlayerSubmit";

interface CreatePlayerProps {}

export type CreatePlayerFormData = z.infer<typeof createPlayer.schema>;

/**
 * @description Create Player Section for Admin
 * @return {React.FC<CreatePlayer>}
 */
const CreatePlayer: React.FC<CreatePlayerProps> = (props) => {
	const { register, handleSubmit, formState, ...rest } =
		useForm<CreatePlayerFormData>();
	const toast = useToast();

	const { data, isLoading } = useSWR("/api/v1/teams");

	const onSubmit = async (data: CreatePlayerFormData) => {
		const res = await createPlayerSubmit(data);

		if (res.code === "200") {
			rest.reset();
			toast({
				title: "Success!",
				status: "success",
				description: "Successfully created player.",
				position: "bottom-right",
			});
		}
	};

	return (
		<Admin.Section title="Create New Player">
			<form onSubmit={handleSubmit(onSubmit)}>
				<Grid templateColumns={"repeat(2, 1fr)"} gap={5} mb="5">
					<Form.TextInput
						formState={formState}
						name="firstName"
						register={register}
						title="First Name"
					/>
					<Form.TextInput
						formState={formState}
						name="lastName"
						register={register}
						title="Last Name"
					/>
				</Grid>
				<Form.Select
					formState={formState}
					name="teamId"
					register={register}
					title="Team"
					valueKey="id"
					displayKey="name"
					data={(data && data.data) || []}
					placeholder="Select a Team"
				/>
				<Form.SubmitButton
					formState={formState}
					buttonProps={{
						colorScheme: "whatsapp",
						w: "full",
						mt: "5",
					}}
				>
					Create Player
				</Form.SubmitButton>
			</form>
		</Admin.Section>
	);
};

export default CreatePlayer;
