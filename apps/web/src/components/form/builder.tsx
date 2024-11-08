"use client";

import { useForm } from "react-hook-form";
import { formSchema, FormSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export const Builder = ({ className }: React.ComponentProps<"div">) => {
  const router = useRouter();

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: "",
    },
  });

  const onSubmit = (data: FormSchema) => {
    router.push("/url/" + encodeURIComponent(data.url));
  };

  return (
    <div
      className={cn(
        "rounded-xl px-0 py-5 md:p-10 h-full justify-center flex flex-col",
        "md:border",
        className
      )}
    >
      {/* Form */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 md:space-y-8"
        >
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Paste your long URL here</FormLabel>
                <FormControl>
                  <Input type="url" placeholder="www.example.com" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="w-full items-center flex justify-center">
            <Button
              // disabled={isPending}
              type="submit"
              variant="default"
              className="w-full"
            >
              Submit
            </Button>
          </div>
        </form>
      </Form>
      {/* Result */}
      {/* <ShortUrlResult /> */}
    </div>
  );
};
