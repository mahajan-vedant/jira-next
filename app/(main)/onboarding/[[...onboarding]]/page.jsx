"use client";

import { OrganizationList, useOrganizationList } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function OnboardingPage() {
  const { organizationList, isLoaded, setActive } = useOrganizationList();
  const [redirecting, setRedirecting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) return;

    if (organizationList && organizationList.length > 0) {
      console.log("➡ Full orgList raw:", organizationList);
organizationList.forEach((orgItem, index) => {
  const org = orgItem?.organization;
  if (org) {
    console.log(`Org ${index + 1}:`, {
      id: org.id,
      name: org.name,
      slug: org.slug,
    });
  } else {
    console.warn("❌ No organization in item:", orgItem);
  }
});

    
    }
  }, [isLoaded, organizationList]);

  const handleOrgAction = async (orgLike) => {
    try {
      if (!orgLike || redirecting || !setActive) {
        console.warn("⚠️ Cannot set active org yet.");
        return;
      }

      const orgId = orgLike?.id ?? orgLike?.organization?.id;
      const orgSlug = orgLike?.slug ?? orgLike?.organization?.slug;

      if (!orgId || !orgSlug) {
        console.warn("⚠️ Invalid organization object", orgLike);
        return;
      }

      setRedirecting(true);

      console.log("👉 Setting active organization:", orgId);
      await setActive({ organization: orgId });

      console.log("✅ Organization set active. Redirecting to:", `/organization/${orgSlug}`);
      router.push(`/organization/${orgSlug}`);
    } catch (error) {
      console.error("❌ Error setting active org:", error);
      setRedirecting(false);
    }
  };

  return (
    <div className="flex justify-center items-center pt-14">
      <OrganizationList
        hidePersonal
        afterCreateOrganizationUrl={null}
        afterSelectOrganizationUrl={null}
        onCreateOrganization={handleOrgAction}
        onSelectOrganization={handleOrgAction}
      />
    </div>
  );
}
