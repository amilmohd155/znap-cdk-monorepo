"use client";

import { cn } from "@/lib/utils";
import { QRCodeSVG } from "qrcode.react";
import { Button } from "./button";

type QRCodeProps = {
  value: string;
  size?: number;
  className?: string;
  buttonClassName?: string;
};

// const tag = "qrcode" as const;

export const QRCode = ({ value, size = 64, className }: QRCodeProps) => {
  const handleSaveQRCode = () => {};

  return (
    <div className={cn("space-y-5 w-4/5 mx-auto md:w-1/2", className)}>
      <QRCodeSVG
        value={value}
        size={size * 2}
        level="Q"
        marginSize={1}
        title={`QR Code for ${value}`}
        className="w-full h-full"
      />
      <Button
        className="w-full h-full"
        onClick={handleSaveQRCode}
        variant="secondary"
      >
        Save
      </Button>
    </div>
  );
};
