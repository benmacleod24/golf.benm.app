import { Html, Head, Main, NextScript } from "next/document";
import MetaTags from "~/client/components/Meta";

export default function Document() {
	return (
		<Html>
			<Head />
			<MetaTags />
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
