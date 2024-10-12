export default function TodoItem({ }) {
  return (
    <li className="h-28 max-h-28 capitalize basis-full w-full shrink-0 text-2xl max-w-lg font-bold bg-white p-4 border-stone-700 overflow-hidden rounded-2xl border-2 border-l-[27px] flex items-center justify-between">
      <p> title </p>
      <p>estimated time</p>

      <button
        type="button"
        className="font-bold border focus:scale-75 transition-all text-2xl border-gray-300 hover:border-black ring-0 focus:outline-none  rounded-full px-3 py-1 "
      >
        X
      </button>

      <a
        href="https://github.com/trpc/trpc/stargazers"
        target="_blank"
        rel="noopener"
        className="inline-grid cursor-pointer appearance-none grid-flow-col items-center justify-center gap-1 rounded-lg px-2 py-1.5 text-sm font-bold tracking-normal no-underline shadow-xl shadow-sky-500/20 transition-all duration-300 hover:no-underline sm:gap-1.5 sm:px-4 sm:py-2 sm:text-base bg-gradient-to-r from-sky-50 to-sky-200 text-slate-800 hover:text-primary-darker lg:text-lg"
      >
        <svg
          stroke="currentColor"
          fill="none"
          stroke-width="3"
          viewBox="0 0 24 24"
          stroke-linecap="round"
          stroke-linejoin="round"
          height="18"
          width="18"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
        </svg>
        <span>Star</span>
        <span style={{ transition: 'max-width 1s', opacity: '1s' }} className="w-full overflow-hidden whitespace-nowrap max-w-[100px] opacity-100">
          34,645
        </span>
      </a>
    </li>
  );
}
