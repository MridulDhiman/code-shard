"use server";

import { signOut } from "@/auth";



export const signOutHandler =  async (e) => {
    await signOut();
    router.replace("/login");
  }