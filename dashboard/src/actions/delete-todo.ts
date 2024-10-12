"use server";

import api, { ApiTag } from "@/lib/api";
import { revalidateTag } from "next/cache";

// TODO: zod validation
export async function deleteTodo(id: string) {
  // TODO: error handeling
  await api(`/todo/${id}`, { method: "DELETE" });

  const tagToRevalidate: ApiTag = "TODO_LIST";
  revalidateTag(tagToRevalidate);
}
