import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "~/styles";
import { Analytics } from "@vercel/analytics/react";
import { SWRConfig } from "swr";

const MyApp: AppType<{ session: Session | null }> = ({
	Component,
	pageProps: { session, ...pageProps },
}) => {
	return (
		<SessionProvider session={session}>
			<SWRConfig
				value={{
					fetcher: (resource, init) =>
						fetch(resource, init).then((res) => res.json()),
				}}
			>
				<ChakraProvider resetCSS theme={theme}>
					<Component {...pageProps} />
					<Analytics />
				</ChakraProvider>
			</SWRConfig>
		</SessionProvider>
	);
};

export default MyApp;
