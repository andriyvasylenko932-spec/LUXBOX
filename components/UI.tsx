import type React from "react";

function cn(...classes: Array<string | undefined | null | false>) {
  return classes.filter(Boolean).join(" ");
}

export function Container({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("mx-auto w-full max-w-6xl px-4", className)} {...props} />;
}

export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-zinc-200/70 bg-white/70 shadow-soft backdrop-blur",
        className
      )}
      {...props}
    />
  );
}

export function Badge({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border border-zinc-200/70 bg-white/70 px-3 py-1 text-xs text-zinc-700 backdrop-blur",
        className
      )}
      {...props}
    />
  );
}

export function Button({
  className,
  variant = "primary",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost" | "glass";
}) {
  const base =
    "inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold transition active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed";

  const styles =
    variant === "primary"
      ? "text-white bg-gradient-to-r from-fuchsia-600 via-violet-600 to-cyan-600 hover:brightness-110 shadow-soft"
      : variant === "glass"
      ? "border border-white/40 bg-white/20 text-zinc-900 hover:bg-white/30 backdrop-blur"
      : "bg-transparent text-zinc-900 hover:bg-zinc-100/70";

  return <button className={cn(base, styles, className)} {...props} />;
}

export function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "w-full rounded-2xl border border-zinc-200/70 bg-white/70 px-4 py-3 text-sm outline-none transition focus:border-zinc-900/60 focus:bg-white backdrop-blur",
        className
      )}
      {...props}
    />
  );
}

export function Textarea({ className, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        "w-full rounded-2xl border border-zinc-200/70 bg-white/70 px-4 py-3 text-sm outline-none transition focus:border-zinc-900/60 focus:bg-white backdrop-blur",
        className
      )}
      {...props}
    />
  );
}
