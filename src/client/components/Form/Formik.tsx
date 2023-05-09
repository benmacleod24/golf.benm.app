import React, { useState, useEffect } from "react";
import {
	Form,
	FormikHelpers,
	Formik as FormikRoot,
	FormikProps as FormikRootProps,
} from "formik";

interface FormikProps {
	defaultValue: any;
	children: (p: FormikRootProps<any>) => any;
	onSubmit: (
		values: any,
		formikHelpers?: FormikHelpers<any>
	) => any | Promise<any>;
}

/**
 * @description Formik Wrapper
 * @return {React.FC<Formik>}
 */
const Formik: React.FC<FormikProps> = (props) => {
	return (
		<FormikRoot initialValues={props.defaultValue} onSubmit={() => {}}>
			{(formProps) => {
				return (
					<Form style={{ width: "100%" }}>
						{props.children(formProps)}
					</Form>
				);
			}}
		</FormikRoot>
	);
};

export default Formik;
