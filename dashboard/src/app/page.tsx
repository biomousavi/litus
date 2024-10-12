import TodoList from "@/components/TodoList";
import api from "@/lib/api";

export default async function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white shadow-lg rounded-xl p-8">
          <header>
            <h1 className="text-5xl font-bold mb-6 text-center text-border-black text-shadow-black">
              TODO
            </h1>
          </header>

          <div>
            <form className="flex mt-8 items-center gap-3 justify-center">
              {/* TODO: extract input wrappper */}
              <div className="rounded-3xl text-center border-2 border-gray-300 p-1">
                <div className="rounded-2xl border-2 border-stone-950 p-1 overflow-hidden">
                  <div className="relative">
                    <input
                      id="title-input"
                      v-model="input"
                      type="text"
                      autoComplete="off"
                      className="block w-full p-2 text-base text-gray-900 border-none font-medium rounded-lg bg-gray-50 border-transparent focus:border-transparent focus:ring-0 outline-none"
                      placeholder="Title"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="rounded-3xl text-center border-2 border-gray-300 p-1">
                <div className="rounded-2xl border-2 border-stone-950 p-1 overflow-hidden">
                  <div className="relative">
                    <input
                      id="estimated-time"
                      v-model="input"
                      autoComplete="off"
                      type="number"
                      className="block w-full p-2 text-base text-gray-900 border-none font-medium rounded-lg bg-gray-50 border-transparent focus:border-transparent focus:ring-0 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      placeholder="Estimated Time"
                      required
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="text-white font-bold bg-gray-800 hover:bg-black ring-0 focus:outline-none  rounded-xl text-lg px-6 py-3"
              >
                Add
              </button>
            </form>
          </div>
        </div>
      </div>
      <TodoList />
    </main>
  );
}
