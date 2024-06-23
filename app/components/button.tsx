import { ComponentProps } from "react";

import { flex } from "@/styled-system/patterns";

type Props = ComponentProps<"button">;

export function Button({ children, ...props }: Props): JSX.Element {
  return (
    <button
      {...props}
      className={flex({
        alignItems: "center",
        cursor: "pointer",
        px: 2,
        py: 1,
        rounded: "md",
        _hover: {
          bg: "gray.100",
        },
      })}
    >
      {children}
    </button>
  );
}
