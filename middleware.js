import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Define protected routes that require authentication
const isProtectedRoute = createRouteMatcher([
  "/onboarding(.*)",
  "/organisation(.*)",
  "/project(.*)",
  "/issue(.*)",
  "/sprint(.*)",
]);

export default clerkMiddleware((auth, req) => {
  const { userId } = auth();

  // Redirect unauthenticated users from protected routes to sign-in
  if (!userId && isProtectedRoute(req)) {
    return auth().redirectToSignIn();
  }

  // ⚠️ Do NOT check orgId here — handle it inside layout.tsx or server components
  return NextResponse.next();
});

export const config = {
  matcher: [
    // Avoid static/internal Next.js files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
