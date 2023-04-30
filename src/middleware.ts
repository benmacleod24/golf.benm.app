// middleware.ts
import { UserRoles } from "@prisma/client";
import { NextMiddleware, NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getServerAuthSession } from "./server/auth";
import { getToken } from "next-auth/jwt";

const protectedPages: string[] = ["/", "/players", "/teams", "/admin"];

export const middleware: NextMiddleware = async (req: NextRequest) => {
	const endpoint = req.nextUrl.pathname;
	const token = await getToken({ req });
	const isProtected = protectedPages.includes(endpoint);

	// Requesting a protected page.
	if (isProtected) {
		if (!token) {
			return NextResponse.redirect(new URL(`/sign-in`, req.url));
		}

		// Endpoint is admin only.
		if (endpoint === "/admin" && token.sub !== "ADMIN") {
			if (token) return NextResponse.redirect(new URL("/", req.url));

			return NextResponse.redirect(
				new URL(
					`/sign-in?error=${encodeURIComponent(
						"You are not authorized to access that page."
					)}`,
					req.url
				)
			);
		}
	}

	return NextResponse.next();
};
