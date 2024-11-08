"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { BsCopy } from "react-icons/bs";

type CopyClipboardProps = {
  value: string;
  className?: string;
};

export const CopyClipboard = ({ value, className }: CopyClipboardProps) => {
  const y = useMotionValue(0);

  const copiedY = useTransform(y, [-100, 0], [0, 100]);

  const handleOnClick = () => {
    navigator.clipboard.writeText(value);

    y.set(-100);
    setTimeout(() => {
      y.set(0);
    }, 3000);
  };

  return (
    <Button
      variant="outline"
      className={cn("h-fit py-2 overflow-hidden relative", className)}
      onClick={handleOnClick}
    >
      <motion.span
        style={{ y: copiedY }}
        className="absolute inset-0 flex items-center justify-center transition-all duration-500 ease-linear"
      >
        Copied
      </motion.span>
      <motion.span
        style={{ y }}
        className="flex flex-row items-center transition-all duration-500 ease-linear"
      >
        <BsCopy className="w-5 h-5" />
        <span className="ml-2">Copy</span>
      </motion.span>
    </Button>
  );
};
