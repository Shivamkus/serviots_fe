import { useState } from "react";

export default function FlipAuth() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [dark, setDark] = useState(false);

  const toggleForm = () => setIsFlipped(!isFlipped);
  const toggleTheme = () => setDark(!dark);

  return (
    <div className={`${dark ? "dark" : ""}`}>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 transition-colors duration-300">

        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="absolute top-5 right-5 bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-md text-sm dark:text-white"
        >
          {dark ? "Light Mode" : "Dark Mode"}
        </button>

        <div className="w-[350px] h-[430px] perspective">
          <div
            className={`relative w-full h-full transition-transform duration-700 transform-style preserve-3d ${
              isFlipped ? "rotate-y-180" : ""
            }`}
          >

            {/* LOGIN CARD */}
            <div className="absolute w-full h-full backface-hidden bg-white dark:bg-gray-800 shadow-xl 
            rounded-xl p-6 flex flex-col justify-center">
              <h2 className="text-2xl font-semibold text-center mb-6 dark:text-white">
                Login
              </h2>

              <form className="flex flex-col gap-4">
                <input
                  type="email"
                  placeholder="Email"
                  className="px-4 py-2 rounded-lg border dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="px-4 py-2 rounded-lg border dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />

                <button
                  type="submit"
                  className="mt-2 px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
                >
                  Login
                </button>
              </form>

              <p className="mt-4 text-center text-sm dark:text-gray-300">
                Don't have an account?
                <span
                  onClick={toggleForm}
                  className="text-indigo-600 dark:text-indigo-400 cursor-pointer ml-1 font-medium"
                >
                  Signup
                </span>
              </p>
            </div>

            {/* SIGNUP CARD */}
            <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-white dark:bg-gray-800 shadow-xl 
            rounded-xl p-6 flex flex-col justify-center">
              <h2 className="text-2xl font-semibold text-center mb-6 dark:text-white">
                Signup
              </h2>

              <form className="flex flex-col gap-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="px-4 py-2 rounded-lg border dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="px-4 py-2 rounded-lg border dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="px-4 py-2 rounded-lg border dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />

                <button
                  type="submit"
                  className="mt-2 px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
                >
                  Signup
                </button>
              </form>

              <p className="mt-4 text-center text-sm dark:text-gray-300">
                Already have an account?
                <span
                  onClick={toggleForm}
                  className="text-indigo-600 dark:text-indigo-400 cursor-pointer ml-1 font-medium"
                >
                  Login
                </span>
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
