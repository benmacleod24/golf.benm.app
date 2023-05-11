import { Divider, Flex, FlexProps, Text } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";

interface AdminSectionProps {
	title: string;
	containerProps?: FlexProps;
	wrapperProps?: FlexProps;
	theme?: string;
}

/**
 * @description Section in the admin page.
 * @return {React.FC<AdminSection>}
 */
const AdminSection: React.FC<React.PropsWithChildren<AdminSectionProps>> = (
	props
) => {
	return (
		<Flex flexDir={"column"} {...props.wrapperProps}>
			<Flex align={"center"} mb="5">
				<Text
					minW="fit-content"
					fontWeight={"semibold"}
					color={props.theme || "white"}
				>
					{props.title}
				</Text>
				<Divider ml="5" mt="0.5" />
			</Flex>
			<Flex {...props.containerProps}>{props.children}</Flex>
		</Flex>
	);
};

export default AdminSection;
