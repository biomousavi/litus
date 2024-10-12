export default async function TodoInput() {
  return (
    <form className="flex mt-8 items-center gap-3 justify-center">
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
  );
}
