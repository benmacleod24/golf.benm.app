import { Flex, Icon, Text } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import AdminButton from "./Button";

// Icons
import { FaFlagCheckered } from "react-icons/fa";
import { AiOutlineTeam } from "react-icons/ai";
import { BsFillPersonBadgeFill } from "react-icons/bs";
import { MdMiscellaneousServices, MdOutlineManageHistory } from "react-icons/md";

interface AdminMenuProps {}

/**
 * @description Menu section for the admin panel.
 * @return {React.FC<AdminMenu>}
 */
const AdminMenu: React.FC<AdminMenuProps> = (props) => {
	return (
		<Flex flexDir={"column"}>
			<Flex mb="5" align="center" gap={4}>
				<Icon as={MdOutlineManageHistory} fontSize={"3xl"} color="brand.700" />
				<Text fontSize={"3xl"} fontWeight={"bold"} color="gray.300">
					Admin Section
				</Text>
			</Flex>
			<Flex
				flexDir={"column"}
				gap={2}
				pr="10"
				mr="10"
				h="xs"
				pt="8"
				borderRight="1px solid"
				borderColor={"whiteAlpha.200"}
			>
				<AdminButton tabType="scores" icon={<Icon as={FaFlagCheckered} />}>
					Scores
				</AdminButton>
				<AdminButton tabType="teams" icon={<Icon as={AiOutlineTeam} />}>
					Teams
				</AdminButton>
				<AdminButton tabType="members" icon={<Icon as={BsFillPersonBadgeFill} />}>
					Team Members
				</AdminButton>
				<AdminButton tabType="misc" icon={<Icon as={MdMiscellaneousServices} />}>
					Misc.
				</AdminButton>
			</Flex>
		</Flex>
	);
};

export default AdminMenu;
