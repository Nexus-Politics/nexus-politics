"use client";

import useWaitlistForm from "@/lib/useWaitlistForm";
import { cn } from "@/lib/utils";
import { Button, Input } from "@nexus-politics/ui";
import { ReloadIcon } from "@radix-ui/react-icons";

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
          <Input
            type="email"
            placeholder="Enter your email"
            className={cn(
              "h-12 w-full border-[#C9DBFD]/30 bg-[#0E191C]/80 text-sm text-white",
              "focus-visible:ring-[#DA655E] focus-visible:ring-opacity-50",
              status === "error" && "border-red-500",
            )}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status === "loading" || status === "success"}
          />
        </div>
        <Button
          type="submit"
          className={cn(
            "h-12 bg-[#DA655E] text-sm font-semibold text-white",
            "hover:bg-[#9B3D3D]",
          )}
          disabled={status === "loading" || status === "success"}
        >
          {status === "loading" ? (
            <>
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              Loading
            </>
          ) : status === "success" ? (
            "Joined!"
          ) : (
            "Join Waitlist"
          )}
        </Button>

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
