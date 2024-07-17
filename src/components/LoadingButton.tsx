// components/LoadingButton.tsx

import { Button, type ButtonProps } from "./ui/button";
import { cn } from "~/lib/utils"; // Utility for className concatenation if you have one

interface LoadingButtonProps extends ButtonProps {
  isLoading?: boolean;
}

const LoadingButton: React.FC<LoadingButtonProps> = ({
  isLoading,
  children,
  className,
  ...props
}) => {
  return (
    <Button
      className={cn(className, isLoading && "cursor-not-allowed opacity-50")}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? "Loading..." : children}
    </Button>
  );
};

export default LoadingButton;
