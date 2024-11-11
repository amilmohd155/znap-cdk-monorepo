"use client";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { Toaster as Sonner, toast } from "sonner";

export default function Toaster() {
  const searchParams = useSearchParams();

  const error = searchParams.get("error");

  useEffect(() => {
    if (error && error === "invalid") {
      toast.error("Invalid url provided!!");
    }
  }, [error]);

  return <Sonner />;
}
