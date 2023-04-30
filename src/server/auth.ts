import { type GetServerSidePropsContext } from "next";
import {
	getServerSession,
	type NextAuthOptions,
	type DefaultSession,
} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { env } from "~/env.mjs";
import { UserRoles } from "@prisma/client";
import { verifyLoginPin } from "./helpers";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
	interface Session extends DefaultSession {
		user: {
			role: UserRoles;
		} & DefaultSession["user"];
	}

	interface User {
		role: UserRoles;
	}
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
	callbacks: {
		session: ({ session, token, user, newSession }) => {
			return {
				...session,
				user: {
					...session.user,
					/**
					 * Forwhatever reason next auth will not pass the user object
					 * from the credentails, so we passed the user role though the sub
					 * value in the token object, since we don't have any ID for users.
					 */
					role: token.sub,
				},
			};
		},
	},
	session: {
		strategy: "jwt",
	},
	providers: [
		CredentialsProvider({
			name: "Login Pin",
			credentials: {
				pin: { label: "Login Pin", placeholder: "pin", type: "text" },
			},

			// Check if the pin is correct.
			authorize: async (credentials, req) => {
				if (!credentials || !credentials.pin)
					throw new Error(
						"Please try again, we could not find the pin."
					);

				// Check if the pin exist in the database.
				const isValidPin = await verifyLoginPin(credentials.pin);

				// Was not a valid pin, we return the null response from the function.
				if (!isValidPin || isValidPin == null)
					throw new Error(
						"The pin your entered is incorrect, please try again."
					);

				return { role: isValidPin.role, id: isValidPin.role };
			},
		}),
	],
	pages: {
		signIn: "/sign-in",
		error: "/sign-in",
	},
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
	req: GetServerSidePropsContext["req"];
	res: GetServerSidePropsContext["res"];
}) => {
	return getServerSession(ctx.req, ctx.res, authOptions);
};
