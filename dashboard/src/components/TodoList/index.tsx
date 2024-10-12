import api from "@/lib/api";
import { TODO } from "@/lib/types";
import TodoItem from "../TodoItem";

interface TodoListProps {
  todoList: TODO[];
}

export default async function TodoList({ todoList }: TodoListProps) {
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
