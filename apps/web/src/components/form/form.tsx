import { UseFormReturn } from "react-hook-form";
import { Form } from "../ui/form";

const ShortUrlForm = ({ form }: ShortUrlFormProps) => {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(() => {})}></form>
    </Form>
  );
};

export default ShortUrlForm;
