import { Flex, Text, useColorModeValue } from "@chakra-ui/react";
import { Announcement } from "@prisma/client";
import dayjs from "dayjs";
import React, { useState, useEffect } from "react";

interface AnnouncementProps {
	data: Announcement;
}

/**
 * @description Annoucement component.
 * @return {React.FC<Announcement>}
 */
const Announcement: React.FC<AnnouncementProps> = (props) => {
	const borderColor = useColorModeValue("gray.300", "whiteAlpha.300");

	return (
		<Flex
			pos="relative"
			flexDir={"column"}
			p="4"
			pb="1"
			mb="4"
			rounded={"lg"}
			w="full"
			border={"1px solid"}
			borderColor={borderColor}
		>
			<Text
				mb="3"
				fontWeight={"semibold"}
				color="blue.300"
				textTransform={"capitalize"}
			>
				{props.data.title}
			</Text>
			<Text>{props.data.message}</Text>
			<Flex
				w="full"
				justify={"flex-end"}
				borderTop={"1px solid"}
				borderColor={borderColor}
				my="3"
				pt="2"
			>
				<Text fontSize={"sm"} fontStyle={"italic"} color="gray.500">
					{dayjs(props.data.createdAt).format(
						"MMM D, YYYY @ h:mm A"
					)}
				</Text>
			</Flex>
		</Flex>
	);
};

export default Announcement;
