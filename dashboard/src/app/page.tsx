import TodoInput from "@/components/TodoInput";
import TodoList from "@/components/TodoList";

export default async function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white shadow-lg rounded-xl p-12">
          <header>
            <h1 className="text-5xl font-bold mb-6 text-center text-border-black text-shadow-black">
              TODO
            </h1>
          </header>
          <TodoInput />
        </div>
      </div>
      <TodoList />
    </main>
  );
}
