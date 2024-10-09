export default function List() {
  return (
    <div className="w-full h-full">
      <div>
        <ul className="flex flex-col py-6 items-center gap-y-4 overflow-y-auto w-full h-full px-4 max-h-[60vh]">
          {/* <TodoItem
          v-for="todo of sortedTodoList"
          :key="todo.id"
          :todo="todo"
        /> */}
        </ul>
      </div>
    </div>
  );
}
