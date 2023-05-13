import { Flex, Icon } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import AdminButton from "./Button";

// Icons
import {
	FaFlagCheckered,
	AiOutlineTeam,
	BsFillPersonBadgeFill,
	MdMiscellaneousServices,
} from "react-icons/all";

interface AdminMenuProps {}

/**
 * @description Menu section for the admin panel.
 * @return {React.FC<AdminMenu>}
 */
const AdminMenu: React.FC<AdminMenuProps> = (props) => {
	return (
		<Flex maxW="25%" w="full" flexDir={"column"} gap={2}>
			<AdminButton tabType="scores" icon={<Icon as={FaFlagCheckered} />}>
				Scores
			</AdminButton>
			<AdminButton tabType="teams" icon={<Icon as={AiOutlineTeam} />}>
				Teams
			</AdminButton>
			<AdminButton
				tabType="members"
				icon={<Icon as={BsFillPersonBadgeFill} />}
			>
				Team Members
			</AdminButton>
			<AdminButton
				tabType="misc"
				icon={<Icon as={MdMiscellaneousServices} />}
			>
				Misc.
			</AdminButton>
		</Flex>
	);
};

export default AdminMenu;
