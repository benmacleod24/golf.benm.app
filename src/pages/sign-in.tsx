import {
	Alert,
	AlertDescription,
	AlertIcon,
	AlertTitle,
	Box,
	CloseButton,
	Flex,
	HStack,
	PinInput,
	PinInputField,
	Text,
} from "@chakra-ui/react";
import { signIn } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import ColorMode from "~/client/components/ColorMode";

interface SignInPageProps {}

/**
 * @description Sign In page
 * @return {React.FC<SignInPage>}
 */
const SignInPage: React.FC<SignInPageProps> = (props) => {
	const { query } = useRouter();
	const [pin, setPin] = useState<string>("");

	// Listen for pin changes and check validity when lenght is 4.
	const onPinChange = (pin: string) => {
		if (pin.length == 4) {
			signIn("credentials", {
				pin,
				callbackUrl: "/",
			});
		}

		// Set pin state value.
		setPin(pin.toUpperCase());
	};

	// Pull message from query or default to simple message.
	const message =
		query.error ?? "We had an issue at sign in, please try again.";

	return (
		<Flex
			bg="blackAlpha.50"
			minW="sm"
			w="fit-content"
			maxW="md"
			p="7"
			rounded={"lg"}
			mx="auto"
			mt="10%"
			flexDir={"column"}
			justify={"center"}
			align={"center"}
		>
			<Head>
				<title>Signin | RGL</title>
			</Head>
			<Text fontWeight={"bold"} fontSize="lg" mx="auto">
				Riverview Golf League Portal
			</Text>
			<Text
				fontSize="md"
				mx="auto"
				textAlign={"center"}
				fontStyle={"italic"}
			>
				Please enter the login pin you were given.
			</Text>

			<HStack my="6">
				<PinInput type="alphanumeric" mask onChange={onPinChange}>
					<PinInputField textTransform={"uppercase"} />
					<PinInputField textTransform={"uppercase"} />
					<PinInputField textTransform={"uppercase"} />
					<PinInputField textTransform={"uppercase"} />
				</PinInput>
			</HStack>

			{/* Simple Error Banner */}
			{query.error && (
				<Alert status="error" variant="subtle" rounded={"md"}>
					<AlertIcon />
					<AlertDescription fontSize="sm">
						{message}
					</AlertDescription>
				</Alert>
			)}

			<Box pos="fixed" bottom="2" left="2">
				<ColorMode />
			</Box>
		</Flex>
	);
};

export default SignInPage;
