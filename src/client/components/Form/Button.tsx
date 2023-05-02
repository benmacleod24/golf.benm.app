import React, { useState, useEffect } from "react";
import { FormState } from "react-hook-form";
import { CreatePlayerFormData } from "../Admin/CreatePlayer";
import { Button, ButtonProps } from "@chakra-ui/react";
import { RGBA } from "@skinnypete/color";
import { motion } from "framer-motion";

interface FormSubmitButtonProps {
	formState: FormState<any>;
	buttonProps?: ButtonProps;
}

/**
 * @description Submit Butto for the form.
 * @return {React.FC<FormSubmitButton>}
 */
const FormSubmitButton: React.FC<
	React.PropsWithChildren<FormSubmitButtonProps>
> = ({ formState, children, buttonProps }) => {
	return (
		<Button
			type="submit"
			isLoading={formState.isSubmitting}
			bg="brand.700"
			color="white"
			as={motion.div}
			whileTap={{ scale: 0.8 }}
			_hover={{ bg: RGBA.fromHex("#cf4044").darken(10).toString() }}
			{...buttonProps}
		>
			{children}
		</Button>
	);
};

export default FormSubmitButton;
