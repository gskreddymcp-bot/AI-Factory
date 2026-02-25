import type { ButtonHTMLAttributes } from "react";

export function Button(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      style={{
        padding: "0.5rem 0.75rem",
        borderRadius: "8px",
        background: "#5b8cff",
        border: "none",
        color: "white",
        cursor: "pointer"
      }}
    />
  );
}
