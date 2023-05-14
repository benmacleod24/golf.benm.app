import React, { useState, useEffect } from "react";
import { Form, Formik, FormikHelpers, FormikProps } from "formik";

interface FormWrapperProps {
	initValue: any;
	children: (helpers: FormikProps<any>) => any;
	onSubmit: any;
}

/**
 * @description Formik Wrapper
 * @return {React.FC<FormWrapper>}
 */
const FormWrapper: React.FC<FormWrapperProps> = (props) => {
	return (
		<Formik initialValues={props.initValue} onSubmit={props.onSubmit}>
			{(helpers) => {
				return (
					<Form style={{ width: "100%" }}>
						{props.children(helpers)}
					</Form>
				);
			}}
		</Formik>
	);
};

export default FormWrapper;
