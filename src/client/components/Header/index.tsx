import { Button, Flex, Text } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { Container } from "../Container";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import NavButton from "./NavButton";
import ColorMode from "../ColorMode";

interface HeaderProps {}

/**
 * @description Header component for the application.
 * @return {React.FC<Header>}
 */
const Header: React.FC<HeaderProps> = (props) => {
	const { data, status } = useSession();

	// Auth States
	const isLoaded = status === "authenticated";
	const isAdmin = data && data.user && data.user.role === "ADMIN";

	return (
		<Flex
			w="full"
			h="16"
			as="nav"
			border="1px solid"
			borderColor={"gray.100"}
		>
			<Container.Body>
				<Flex w="full" h="full" align="center">
					<Flex align="center" h="full">
						<Link href="/">
							<Text
								fontWeight={"bold"}
								fontSize={"lg"}
								userSelect={"none"}
								cursor={"pointer"}
							>
								Riverview Golf Leauge
							</Text>
						</Link>
					</Flex>
					<Flex ml="20" gap={5} flex={1}>
						<NavButton href="/">Home</NavButton>
						<NavButton href="/teams">Teams</NavButton>
						<NavButton href="/players">Players</NavButton>
						{isLoaded && isAdmin && (
							<NavButton href="/admin">Nate's Section</NavButton>
						)}
					</Flex>
					<Flex align={"center"} gap={5}>
						<ColorMode />
						<NavButton onClick={signOut}>Logout</NavButton>
					</Flex>
				</Flex>
			</Container.Body>
		</Flex>
	);
};

export default Header;
