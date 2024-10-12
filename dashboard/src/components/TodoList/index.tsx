import api from "@/lib/api";
import { TODO } from "@/lib/types";
import TodoItem from "../TodoItem";

export default async function TodoList() {
  const response = await api("/todo", {
    next: { tags: ["TODO_LIST"], revalidate: 10 },
  });
  const todoList: TODO[] = await response.json();

  return (
    <div className="w-full h-full">
      <ul className="flex flex-col py-6 items-center gap-y-4 overflow-y-auto w-full h-full px-4 max-h-[60vh]">
        {todoList.map((item) => (
          <TodoItem key={item._id} todo={item} />
        ))}
      </ul>
    </div>
  );
}
