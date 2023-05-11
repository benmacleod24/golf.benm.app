import React, { useState, useEffect } from "react";
import { Admin } from "..";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createAnnouncement } from "~/server/db/announcements/createAnnouncement";
import { Form } from "../../Form";
import { Grid, VStack, useToast } from "@chakra-ui/react";
import { response } from "~/server/helpers";
import { Announcement } from "@prisma/client";
import { mutate } from "swr";

interface CreateAnnouncementProps {}

/**
 * @description
 * @return {React.FC<CreateAnnouncement>}
 */
const CreateAnnouncement: React.FC<CreateAnnouncementProps> = (props) => {
	const toast = useToast();
	const { register, handleSubmit, formState, ...rest } =
		useForm<z.infer<typeof createAnnouncement.schema>>();

	const onSubmit = async (
		data: z.infer<typeof createAnnouncement.schema>
	) => {
		const res = (await fetch(`/api/v1/announcements`, {
			method: "POST",
			body: JSON.stringify(data),
		}).then((r) => r.json())) as ReturnType<typeof response<Announcement>>;

		if (res.code === "200") {
			rest.reset();
			mutate("/api/v1/announcements");
			toast({
				title: "Success!",
				status: "success",
				description: res.message,
				position: "bottom-right",
			});
		}
	};

	return (
		<Admin.Section title="Post Announcement">
			<form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
				<VStack w="full">
					<Grid
						templateColumns={["repeat(2, 1fr))"]}
						w="full"
						mb="5"
						gap={5}
					>
						<Form.TextInput
							formState={formState}
							name="title"
							register={register}
							title="Title"
							placeholder="Grab their attention..."
						/>
						<Form.Textarea
							placeholder="What is the big news?"
							formState={formState}
							name="message"
							register={register}
							title="Message"
						/>
					</Grid>
					<Form.SubmitButton buttonProps={{ w: "full" }}>
						Post Announcement
					</Form.SubmitButton>
				</VStack>
			</form>
		</Admin.Section>
	);
};

export default CreateAnnouncement;
