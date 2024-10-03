import { auth } from "./auth";
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from "./routes";
import { NextResponse } from "next/server";

// all the routes should be protected

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const { nextUrl } = req;
  console.log("ROUTE: ", req.nextUrl.pathname);
  console.log("IS LOGGED IN: ", isLoggedIn);
  const urlPath = nextUrl.pathname;
  const isApiAuthRoute = urlPath.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(urlPath);
  const isAuthRoute = authRoutes.includes(urlPath);

  // let the next auth do it's work
  if (isApiAuthRoute) {
    return NextResponse.next();
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return NextResponse.next();
  }

  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL("/login", nextUrl));
  }

  if (isLoggedIn && isPublicRoute) {
    return Response.redirect(new URL("/your-work", nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
