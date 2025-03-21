"use client";

import useWaitlistForm from "@/lib/useWaitlistForm";
import { cn } from "@/lib/utils";

interface WaitlistFormProps {
  variant?: "inline" | "stacked";
  className?: string;
}

export default function WaitlistForm({
  variant = "inline",
  className = "",
}: WaitlistFormProps) {
  const { email, setEmail, status, message, handleSubmit } = useWaitlistForm();

  return (
    <div className={className}>
      <form
        onSubmit={handleSubmit}
        className={cn(
          "w-full",
          variant === "inline"
            ? "grid grid-cols-1 gap-4 md:grid-cols-2"
            : "flex flex-col gap-3",
        )}
      >
        <div className="w-full">
          <input
            type="email"
            placeholder="Enter your email"
            className={cn(
              "w-full rounded-md border border-[#C9DBFD]/30 bg-[#0E191C]/80 p-3 text-white",
              "focus:outline-none focus:ring-2 focus:ring-[#DA655E]",
              status === "error" && "border-red-500",
            )}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status === "loading" || status === "success"}
          />
        </div>
        <button
          type="submit"
          className={cn(
            "rounded-md bg-[#DA655E] p-3 font-semibold text-white",
            "transition-colors hover:bg-[#9B3D3D]",
            "flex items-center justify-center disabled:cursor-not-allowed disabled:opacity-50",
          )}
          disabled={status === "loading" || status === "success"}
        >
          {status === "loading" ? (
            <svg
              className="h-5 w-5 animate-spin text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          ) : status === "success" ? (
            "Joined!"
          ) : (
            "Join Waitlist"
          )}
        </button>

        {message && (
          <div
            className={cn(
              variant === "inline" ? "col-span-full" : "",
              "mt-2 text-sm",
              status === "error" ? "text-red-400" : "text-green-400",
            )}
          >
            {message}
          </div>
        )}
      </form>
    </div>
  );
}
