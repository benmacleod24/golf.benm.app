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
		<Flex>
			<Flex
				w="full"
				flexDir={"column"}
				overflow={"auto"}
				h="full"
				maxH="30.3em"
				__css={{
					"::-webkit-scrollbar": {
						display: "none",
					},
				}}
				justify={"center"}
				align={"center"}
			>
				{isLoading && (
					<Flex w="full" justify={"center"} align="center">
						<Spinner color="brand.700" size="lg" mx="auto" />
					</Flex>
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
		</Flex>
	);
};

export default Announcements;
