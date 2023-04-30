import React, { useState, useEffect } from "react";

interface MetaTagsProps {}

/**
 * @description Meta tags for the app.
 * @return {React.FC<MetaTags>}
 */
const MetaTags: React.FC<MetaTagsProps> = (props) => {
	return (
		<head>
			<link rel="preconnect" href="https://fonts.googleapis.com" />
			<link
				rel="preconnect"
				href="https://fonts.gstatic.com"
				crossOrigin=""
			/>
			<link
				href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
				rel="stylesheet"
			/>
		</head>
	);
};

export default MetaTags;
