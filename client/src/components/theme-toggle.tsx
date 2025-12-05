import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme") as "light" | "dark" | null;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initial = stored || (prefersDark ? "dark" : "light");
    setTheme(initial);
    document.documentElement.classList.toggle("dark", initial === "dark");
  }, []);

  const toggle = () => {
    setIsAnimating(true);
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    localStorage.setItem("theme", next);
    document.documentElement.classList.toggle("dark", next === "dark");
    setTimeout(() => setIsAnimating(false), 300);
  };

  return (
    <div className="relative group">
      {/* Slide Bar Toggle */}
      <button
        onClick={toggle}
        data-testid="button-theme-toggle"
        aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        className="
          relative
          w-14
          h-7
          bg-gradient-to-r from-yellow-200 to-yellow-400
          dark:from-gray-600 dark:to-gray-800
          rounded-full
          shadow-lg
          border border-yellow-300
          dark:border-gray-600
          transition-all
          duration-300
          hover:shadow-xl
          hover:scale-105
          focus:outline-none
          focus:ring-2
          focus:ring-yellow-400
          dark:focus:ring-gray-400
          focus:ring-opacity-50
        "
      >
        {/* Sliding Handle */}
        <div
          className={`
            absolute
            top-0.5
            w-6
            h-6
            bg-white
            dark:bg-gray-300
            rounded-full
            shadow-lg
            transform
            transition-all
            duration-300
            ease-in-out
            flex
            items-center
            justify-center
            ${theme === "light" ? "left-0.5" : "left-7"}
            ${isAnimating ? 'scale-110' : 'scale-100'}
          `}
        >
          {/* Sun Icon */}
          <Sun
            className={`
              h-3 w-3
              text-yellow-500
              transition-all
              duration-300
              ${theme === "light" ? "opacity-100 scale-100" : "opacity-0 scale-0"}
            `}
          />
          
          {/* Moon Icon */}
          <Moon
            className={`
              absolute
              h-3 w-3
              text-gray-700
              transition-all
              duration-300
              ${theme === "dark" ? "opacity-100 scale-100" : "opacity-0 scale-0"}
            `}
          />
        </div>

        {/* Background Pattern */}
        <div className="absolute inset-0 rounded-full overflow-hidden">
          <div className="
            absolute
            inset-0
            bg-gradient-to-r
            from-transparent
            via-white/20
            to-transparent
            transform
            -skew-x-12
            transition-opacity
            duration-500
            group-hover:opacity-100
            opacity-0
          " />
        </div>
      </button>

      {/* Simple Tooltip */}
      <div className="
        absolute
        -bottom-8
        left-1/2
        transform
        -translate-x-1/2
        bg-gray-900
        dark:bg-gray-700
        text-white
        text-xs
        py-1
        px-2
        rounded
        opacity-0
        group-hover:opacity-100
        transition-opacity
        duration-200
        pointer-events-none
        whitespace-nowrap
        shadow-md
      ">
        {theme === "light" ? "Dark mode" : "Light mode"}
      </div>
    </div>
  );
}