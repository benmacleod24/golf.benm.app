import { Button, ButtonProps } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface FormSubmitProps extends React.PropsWithChildren {
	buttonProps?: ButtonProps;
}

/**
 * @description Form Submit
 * @return {React.FC<FormSubmit>}
 */
const FormSubmit: React.FC<FormSubmitProps> = (props) => {
	return (
		<Button
			variant={"solid"}
			bg="brand.700"
			_hover={{ bg: "#a33235" }}
			_active={{ bg: "#ed454a" }}
			type="submit"
			as={motion.button}
			whileTap={{
				scale: "0.95",
			}}
			{...props.buttonProps}
		>
			{props.children}
		</Button>
	);
};

export default FormSubmit;
