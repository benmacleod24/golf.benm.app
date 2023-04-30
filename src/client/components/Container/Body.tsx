import React, { useState, useEffect } from "react";
import { Container, ContainerProps } from "@chakra-ui/react";

interface ContainerBodyProps extends ContainerProps {}

/**
 * @description Container body component.
 * @return {React.FC<ContainerBody>}
 */
const ContainerBody: React.FC<React.PropsWithChildren<ContainerBodyProps>> = (
	props
) => {
	return (
		<Container
			maxW={["full", null, null, "container.xl"]}
			px={["5", "5", "5", null, null]}
			{...props}
		>
			{props.children}
		</Container>
	);
};

export default ContainerBody;
