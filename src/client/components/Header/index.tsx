import { Button, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { Container } from "../Container";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import NavButton from "./NavButton";
import ColorMode from "../ColorMode";
import MobileHeader from "./Mobile";
import DesktopHeader from "./Desktop";

interface HeaderProps {}

/**
 * @description Header component for the application.
 * @return {React.FC<Header>}
 */
const Header: React.FC<HeaderProps> = (props) => {
	const borderColor = useColorModeValue("gray.100", "whiteAlpha.100");

	return (
		<Flex
			w="full"
			h="16"
			as="nav"
			borderBottom="1px solid"
			borderColor={borderColor}
			mb="10"
		>
			<MobileHeader />
			<DesktopHeader />
		</Flex>
	);
};

export default Header;
