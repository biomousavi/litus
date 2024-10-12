import { TODO } from "@/lib/types";
import ClockSVG from "@/components/SVG/Clock";
import TrashSVG from "@/components/SVG/Trash";
import * as actions from "@/actions";

interface TodoItemProps {
  todo: TODO;
}

export default function TodoItem({ todo }: TodoItemProps) {
  const deleteSnippetAction = actions.deleteTodo.bind(null, todo._id);

  // Format Creation Time
  const creationTime = new Date(todo.creation_time).toLocaleDateString(
    "en-US",
    { year: "numeric", month: "short", day: "numeric" }
  );

  return (
    <li className="h-28 basis-full w-full shrink-0 max-w-lg font-bold bg-white p-4 border-stone-700 overflow-hidden rounded-2xl border-2 border-l-[27px] flex items-center justify-between">
      <div className="flex flex-col gap-3">
        {/* Title */}
        <p className="lg:text-2xl text-base"> {todo.title} </p>

        <div className="flex justify-between">
          <p className="flex items-center gap-2">
            {/* Clock Icon */}
            <span>
              <ClockSVG />
            </span>
            {/* Estimated Time */}
            <span className="md:text-base text-sm">
              {todo.estimated_time} min
            </span>
          </p>

          <p className="text-stone-500">{creationTime}</p>
        </div>
      </div>

      <form action={deleteSnippetAction}>
        <button
          title="Delete Item"
          type="submit"
          className="font-bold focus:scale-75 hover:scale-90 duration-300 transition-all text-2xl border-gray-300 ring-0 focus:outline-none  rounded-full px-3 py-1 "
        >
          <TrashSVG />
        </button>
      </form>
    </li>
  );
}
