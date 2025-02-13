import * as React from "react";
import { cn } from "../../lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  HTMLMotionProps<"button"> & {
    variant?: "primary" | "secondary" | "outline";
  };

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", ...props }, ref) => {
    return (
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-lg px-6 py-3 text-sm font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2",
          variant === "primary" &&
            "bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl focus:ring-blue-400",
          variant === "secondary" &&
            "bg-white text-gray-900 hover:bg-gray-50 shadow-sm hover:shadow focus:ring-gray-400",
          variant === "outline" &&
            "border-2 border-gray-200 text-gray-700 hover:bg-gray-50 focus:ring-gray-400",
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button };
