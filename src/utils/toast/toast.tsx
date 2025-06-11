
// src/utils/toaster.ts
import toast from "react-hot-toast";
import { icons } from "@/utils";
import type React from "react";

type IconType =
  | "success"
  | "edit"
  | "error"
  | "cancel"
  | "warning"
  | "logout"
  | "loading"
  | "delete";

export type ToasterProp = {
  message?: string;
  title?: string;
  icon?: IconType;
  className?: "bg-red-50" | "bg-green-50" | "bg-yellow-50" | "bg-blue-50";
};

let activeToast: string[] = [];

const actionIcon: Record<IconType, React.ReactNode> = {
  success: <icons.check className="size-5 sm:size-6 text-green-600 " />,
  edit: <icons.edit className="size-5 sm:size-6 text-blue-600 " />,
  error: <icons.alert className="size-5 sm:size-6 text-red-600 " />,
  cancel: <icons.cancel className="size-5 sm:size-6 text-red-600 " />,
  warning: <icons.warning className="size-5 sm:size-6 text-yellow-600 " />,
  logout: <icons.logout className="size-5 sm:size-6 text-red-600 " />,
  delete: <icons.delete className="size-5 sm:size-6 text-red-600 " />,
  loading: (
    <icons.loading className="size-5 sm:size-6 animate-spin text-blue-600 " />
  ),
};

export const toaster = ({
  message,
  title,
  icon = "success",
  className,
}: ToasterProp) => {
  if (activeToast?.length >= 3) {
    const oldToast = activeToast.shift();
    if (oldToast) toast.dismiss(oldToast);
  }

  const toastId = toast.custom(
    (t) => (
      <div
        className={`${
          t.visible ? "animate-enter" : "animate-leave opacity-0"
        } max-w-md justify-between w-full ${
          className || "bg-white"
        } shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-gray-300 ring-opacity-5`}
      >
        <div className="flex px-2 sm:px-3 sm:py-4 py-2 items-center">
          <div className="p-2 rounded-full bg-white">
            {actionIcon[icon] || actionIcon["success"]} {/* Fallback icon */}
          </div>
          <div className="ml-3 flex-1">
            <p className="text-sm font-semibold text-gray-900">{title}</p>
            {message && <p className="mt-1 text-sm text-gray-500">{message}</p>}
          </div>
        </div>
        <div className="w-[60px] cursor-pointer rounded-r-lg flex items-center justify-center border-gray-300 border-l h-full  ">
          <button
            onClick={() => toast.dismiss(toastId)}
            className="w-full  py-1.5 text-[var(--primary-text)] "
          >
            Close
          </button>
        </div>
      </div>
    ),
    { position: "top-right", duration: icon === "loading" ? Infinity : 5000 } // Auto-close after 5s
  );
  activeToast.push(toastId);
  return toastId; // Return toast ID to close it programmatically
};