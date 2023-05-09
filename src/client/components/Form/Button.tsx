import React, { useState, useEffect } from "react";
import { FormState } from "react-hook-form";
import { CreatePlayerFormData } from "../Admin/CreatePlayer";
import { Button, ButtonProps } from "@chakra-ui/react";
import { RGBA } from "@skinnypete/color";
import { motion } from "framer-motion";

interface FormSubmitButtonProps {
	formState?: FormState<any>;
	buttonProps?: ButtonProps;
	onClick?: () => void;
}

/**
 * @description Submit Butto for the form.
 * @return {React.FC<FormSubmitButton>}
 */
const FormSubmitButton: React.FC<
	React.PropsWithChildren<FormSubmitButtonProps>
> = ({ formState, children, buttonProps, ...props }) => {
	return (
		<Button
			isLoading={formState ? formState.isSubmitting : false}
			bg="brand.700"
			color="white"
			as={motion.button}
			whileTap={{ scale: 0.8 }}
			_hover={{ bg: RGBA.fromHex("#cf4044").darken(10).toString() }}
			{...buttonProps}
			type="submit"
			onClick={props.onClick ? props.onClick : () => {}}
		>
			{children}
		</Button>
	);
};

export default FormSubmitButton;
