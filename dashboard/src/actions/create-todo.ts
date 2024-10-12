"use server";

import api, { ApiTag } from "@/lib/api";
import { Optional, TODO } from "@/lib/types";
import { revalidateTag } from "next/cache";

type Payload = Optional<TODO, "_id" | "creation_time">;

export async function createTodo(
  formData: FormData
): Promise<{ success?: boolean; error?: string }> {
  try {
    const title = formData.get("title");
    const estimatedTime = formData.get("estimated_time");

    if (typeof title !== "string" || typeof estimatedTime !== "string") {
      throw new Error("Invalid form data");
    }

    const payload: Payload = {
      title,
      estimated_time: parseInt(estimatedTime),
    };

    const response = await api("/todo", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to create todo");
    }

    const tagToRevalidate: ApiTag = "TODO_LIST";
    revalidateTag(tagToRevalidate);

    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: "Failed to create todo. Please try again." };
  }
}
