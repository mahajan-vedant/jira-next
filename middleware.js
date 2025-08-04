import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Define protected routes
const isProtectedRoute = createRouteMatcher([
  "/onboarding(.*)",
  "/organisation(.*)",
  "/project(.*)",
  "/issue(.*)",
  "/sprint(.*)",
]);

export default clerkMiddleware((auth, req) => {
  const { userId, orgId } = auth();

  // 🔍 Temporary Debug Log — useful during dev
  console.log("AUTH CHECK:", {
    userId,
    orgId,
    pathname: req.nextUrl.pathname,
  });

  // Redirect to sign in if user not logged in and route is protected
  if (!userId && isProtectedRoute(req)) {
    return auth().redirectToSignIn();
  }

  // Redirect to onboarding if user is logged in but has no org selected
  // if (
  //   userId &&
  //   !orgId &&
  //   !req.nextUrl.pathname.startsWith("/onboarding") &&
  //   !req.nextUrl.pathname.startsWith("/organization")
  // ) {
  //   return NextResponse.redirect(new URL("/onboarding", req.url));
  // }
});

// Match all non-static, non-internal, and API routes
export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
