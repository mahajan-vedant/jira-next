// components/Header.server.jsx
import HeaderClient from "./header-client";
import { checkUser } from "@/lib/checkUser";

export default async function HeaderServer() {
  try {
    await checkUser(); // ✅ create user if not exists
  } catch (err) {
    console.error("User check failed:", err); // Don't break server component
  }

  return <HeaderClient />;
}
