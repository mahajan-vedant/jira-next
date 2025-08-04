import { auth } from "@clerk/nextjs/server";
import CreateProjectClient from "../components/client";

export default async function CreateProjectPage() {
  const { orgId, userId } = auth();

  if (!userId) {
    return <div className="text-center mt-20 text-xl">Please sign in.</div>;
  }

  if (!orgId) {
    return <div className="text-center mt-20 text-xl">No organization selected.</div>;
  }

  return <CreateProjectClient orgId={orgId} />;
}
