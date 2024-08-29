"use server";

import { cookies } from "next/headers";
import { permanentRedirect, redirect } from "next/navigation";

export async function login(data: { access_token: string }) {
  cookies().set("access_token", data.access_token, { secure: true });
  redirect("/dashboard");
}

export async function getToken() {
  return cookies().get("access_token");
}
