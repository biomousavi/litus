"use server";

import api, { ApiTag } from "@/lib/api";
import { Optional, TODO } from "@/lib/types";
import { revalidateTag } from "next/cache";

// TODO: zod validation
export async function createTodo(
  todo: Optional<TODO, "_id" | "creation_time">
) {
  // TODO: error handeling
  await api("/todo/", { method: "POST", body: JSON.stringify(todo) });

  const tagToRevalidate: ApiTag = "TODO_LIST";
  revalidateTag(tagToRevalidate);
}
