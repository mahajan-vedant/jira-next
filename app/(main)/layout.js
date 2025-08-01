// app/layout.jsx
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

export default async function Layout({ children }) {
  const { orgId } = auth();

  if (!orgId) {
    redirect("/onboarding");
  }

  return <div className="container mx-auto mt-5 px-4">{children}</div>;
}
