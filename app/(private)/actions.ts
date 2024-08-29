"use server";

import { cookies } from "next/headers";
import { permanentRedirect } from "next/navigation";

export async function logout() {
  cookies().delete("access_token");
  // cookies().set("access_token", "none");
  permanentRedirect("/login");
}
