"use client";

import { OrganizationList, useOrganizationList } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function OnboardingPage() {
  const { setActive } = useOrganizationList();
  const router = useRouter();
  const [redirecting, setRedirecting] = useState(false);

  const handleOrgAction = async (org) => {
    if (!org?.id || redirecting) return;

    setRedirecting(true);
    try {
      await setActive({ organization: org.id });

      // ✅ WAIT a bit, THEN use full page reload to force Clerk context sync
      setTimeout(() => {
        window.location.href = `/organization/${org.slug}`;
      }, 800); // not router.push - use full reload
    } catch (error) {
      console.error("Error setting active org:", error);
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
