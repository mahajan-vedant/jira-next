import { clerkClient } from "@clerk/nextjs/server";

export const getOrgList = async (userId) => {
  console.log(userId)
  if (!userId) {
    console.log("❌ No userId provided to getOrgList");
    return [];
  }

  try {
    // ✅ Fetch user details
   const memberships = await clerkClient.users.getOrganizationMemberships(userId);


    if (memberships.length === 0) {
      console.log("ℹ️ No organizations found for this user.");
      return [];
    }

    // ✅ Get full org info for each membership
    const orgs = await Promise.all(
      memberships.map((m) =>
        clerkClient.organizations.getOrganization(m.organization.id)
      )
    );

    // ✅ Format safely
    const safeData = orgs.map((org) => ({
      id: org.id,
      name: org.name,
      slug: org.slug,
      imageUrl: org.imageUrl || null,
    }));

    console.log("📦 Safe Parsed Org Data:", safeData);
    return safeData;
  } catch (error) {
    console.error("❌ Error fetching organizations:", error);
    return [];
  }
};
