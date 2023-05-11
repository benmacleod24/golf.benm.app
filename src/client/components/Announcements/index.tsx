import { Flex, Icon, Spinner, Text } from "@chakra-ui/react";
import { Announcement } from "@prisma/client";
import React, { useState, useEffect } from "react";
import useSWR from "swr";
import { response } from "~/server/helpers";
import { CgSmileSad } from "react-icons/cg";
import NothingHere from "./NothingHere";
import AnnouncementComp from "./Announcement";
import { Admin } from "../Admin";

interface AnnouncementsProps {}

/**
 * @description Announcement Container
 * @return {React.FC<Announcements>}
 */
const Announcements: React.FC<AnnouncementsProps> = (props) => {
	const { data, isLoading } = useSWR<
		ReturnType<typeof response<Announcement[]>>
	>("/api/v1/announcements");

	return (
		<Flex flexDir={"column"} maxW="xl" mx="auto">
			<Admin.Section title="Announcements" theme="brand.700">
				<Flex
					w="full"
					flexDir={"column"}
					overflow={"auto"}
					h="xs"
					maxH="xs"
					__css={{
						"::-webkit-scrollbar": {
							display: "none",
						},
					}}
					justify={
						data && data.data && data.data?.length >= 1
							? "flex-start"
							: "center"
					}
					align={
						data && data.data && data.data?.length >= 1
							? "flex-start"
							: "center"
					}
				>
					{isLoading && (
						<Spinner color="brand.700" thickness="3px" size="lg" />
					)}
					{!data ||
						!data.data ||
						(data.data.length <= 0 && <NothingHere />)}
					{data &&
						data.data &&
						data.data.map((a) => (
							<AnnouncementComp data={a} key={a.id} />
						))}
				</Flex>
			</Admin.Section>
		</Flex>
	);
};

export default Announcements;
