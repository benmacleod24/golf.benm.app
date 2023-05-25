import { Modal, ModalContent, ModalOverlay } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";

interface ModalContainerProps extends React.PropsWithChildren {
	isOpen: boolean;
	onClose: () => void;
}

/**
 * @description Modal Container.
 * @return {React.FC<ModalContainer>}
 */
const ModalContainer: React.FC<ModalContainerProps> = (props) => {
	return (
		<Modal isOpen={props.isOpen} onClose={props.onClose} size={"xl"}>
			<ModalOverlay backdropFilter={"blur(1.5px)"} />
			<ModalContent border="1px solid" borderColor={"whiteAlpha.300"} p="3">
				{props.children}
			</ModalContent>
		</Modal>
	);
};

export default ModalContainer;
