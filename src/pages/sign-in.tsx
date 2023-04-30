import {
	Box,
	Flex,
	HStack,
	PinInput,
	PinInputField,
	Text,
} from "@chakra-ui/react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";

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
		setPin(pin);
	};

	// Pull message from query or default to simple message.
	const message =
		query.error ?? "We had an issue at sign in, please try again.";

	return (
		<Flex
			bg="blackAlpha.50"
			w="sm"
			h="36"
			p="7"
			rounded={"lg"}
			mx="auto"
			mt="10%"
			flexDir={"column"}
			gap={3}
			justify={"center"}
			align={"center"}
		>
			<Text fontWeight={"bold"} fontSize="lg" mx="auto">
				Riverview Golf League Portal
			</Text>
			<HStack>
				<PinInput type="alphanumeric" mask onChange={onPinChange}>
					<PinInputField />
					<PinInputField />
					<PinInputField />
					<PinInputField />
				</PinInput>
			</HStack>
		</Flex>
	);
};

export default SignInPage;
