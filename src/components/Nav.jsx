"use client";

import { useState } from "react";
import { Dialog, DialogPanel, PopoverGroup } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Logo from '../assets/logo.webp'

export default function Nav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const handleLogout = async () => {
    localStorage.removeItem("token");
    toast.success("logout successfully");
    navigate("/");
  };

  return (
    <header className="bg-white dark:bg-gray-800">
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
      >
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img
              alt=""
              src={Logo}
              className="h-8 w-auto dark:hidden"
            />
            <img
              alt=""
              src={Logo}
              className="h-8 w-auto not-dark:hidden"
            />
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 dark:text-gray-400"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
        </div>
        <PopoverGroup className="hidden lg:flex lg:gap-x-12">
          <a
            href="/"
            className="text-sm/6 font-semibold text-gray-900 dark:text-white"
          >
            Home
          </a>
          <a
            href="task"
            className="text-sm/6 font-semibold text-gray-900 dark:text-white"
          >
            Task
          </a>
         
        </PopoverGroup>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {token ? (
            <p
              className="text-sm/6 font-semibold text-gray-900 dark:text-white cursor-pointer"
              onClick={handleLogout}
            >
              Log Out <span aria-hidden="true">&rarr;</span>
            </p>
          ) : (
            <a
              href="/login"
              className="text-sm/6 font-semibold text-gray-900 dark:text-white"
            >
              Log in <span aria-hidden="true">&rarr;</span>
            </a>
          )}
        </div>
      </nav>
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-50" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 dark:bg-gray-900 dark:sm:ring-gray-100/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                alt=""
              src={Logo}
                className="h-8 w-auto dark:hidden"
              />
              <img
                alt=""
              src={Logo}
                className="h-8 w-auto not-dark:hidden"
              />
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700 dark:text-gray-400"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10 dark:divide-white/10">
              <div className="space-y-2 py-6">
                <a
                  href="/"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50 dark:text-white dark:hover:bg-white/5"
                >
                  Home
                </a>
                <a
                  href="/task"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50 dark:text-white dark:hover:bg-white/5"
                >
                  Task
                </a>
                
              </div>
              <div className="py-6">
                {token ? (
                  <p
                    onClick={handleLogout}
                    className="-mx-3 block cursor-pointer rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50 dark:text-white dark:hover:bg-white/5"
                  >
                    Log Out
                  </p>
                ) : (
                  <a
                    href="/login"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50 dark:text-white dark:hover:bg-white/5"
                  >
                    Log in
                  </a>
                )}
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
