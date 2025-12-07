"use client";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <section className="w-full min-h-screen flex flex-col-reverse md:flex-row items-center justify-center px-6 md:px-16 lg:px-24 py-10 bg-gray-900 text-white">
      {/* LEFT TEXT CONTENT */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full md:w-1/2 flex flex-col gap-6"
      >
        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
          Turn Your Tasks Into a Smooth,{" "}
          <span className="text-blue-500">Productive Workflow</span>
        </h1>

        <p className="text-gray-300 text-lg md:text-xl">
          Quickly create and manage your tasks. Search, filter, and stay
          organized with a minimal and modern task management system.
        </p>
        <a href="/task">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-600 px-6 py-3 rounded-xl text-lg font-medium hover:bg-blue-700 w-fit"
          >
            Get Started
          </motion.button>
        </a>
      </motion.div>

      {/* RIGHT IMAGE */}
      <motion.div
        initial={{ opacity: 0, x: 80 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9 }}
        className="w-full md:w-1/2 flex justify-center"
      >
        <img
          src="https://images.unsplash.com/photo-1522199710521-72d69614c702"
          alt="Hero"
          className="w-full max-w-md rounded-3xl shadow-lg"
        />
      </motion.div>
    </section>
  );
}
