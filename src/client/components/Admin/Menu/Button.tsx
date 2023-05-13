import { Button } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";

interface AdminButtonProps extends React.PropsWithChildren {
	tabType: string;
	icon?: any;
}

/**
 * @description Admin Menu Button
 * @return {React.FC<AdminButton>}
 */
const AdminButton: React.FC<AdminButtonProps> = (props) => {
	const { query } = useRouter();
	const isSelectedTab = props.tabType === (query.tab as string);

	return (
		<Link href={`/admin?tab=${props.tabType}`}>
			<Button
				w="75%"
				justifyContent={"left"}
				leftIcon={props.icon}
				variant={isSelectedTab ? "solid" : "ghost"}
				color={isSelectedTab ? "white" : "blackAlpha.800"}
				bg={isSelectedTab ? " brand.700" : "none"}
				_hover={{
					bg: isSelectedTab ? "brand.700" : "blackAlpha.100",
				}}
				gap={2}
			>
				{props.children}
			</Button>
		</Link>
	);
};

export default AdminButton;
