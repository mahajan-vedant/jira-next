"use client";

import { useEffect } from "react";

export default function OrgClientComponent({ organizations }) {
  useEffect(() => {
    console.log("✅ Client-side organization list:", organizations);
  }, [organizations]);

  return (
    <div className="mt-4">
      <h2 className="text-lg font-semibold">Your Organizations:</h2>
      <ul className="list-disc pl-6">
        {organizations.map((org) => (
          <li key={org.id}>
            {org.name} ({org.id})
          </li>
        ))}
      </ul>
    </div>
  );
}
