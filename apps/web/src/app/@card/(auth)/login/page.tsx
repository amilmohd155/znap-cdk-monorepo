import { signInAction } from "@/actions/sign-in";
import { providerMap } from "@/auth";
import { Button } from "@/components/ui/button";
import { match } from "ts-pattern";
import { FaLinkedinIn } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { FiGithub } from "react-icons/fi";
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="grid flex-1 grid-rows-[1fr,auto] gap-3 py-5 items-center h-full">
      <Link
        href="https://storyset.com/online"
        aria-label="Online illustrations by Storyset"
        rel="noopener noreferrer"
        target="_blank"
        title="Online illustrations by Storyset"
        className="overflow-hidden"
      >
        <Image
          src="/login.svg"
          alt="login illustration - Online illustrations by Storyset"
          width={720}
          height={720}
          className="w-full aspect-video object-contain  scale-125"
        />
      </Link>
      <div className="flex flex-col gap-y-3 items-center">
        <h1 className="text-xl text-center my-3 md:my-5 font-bold">
          Let&apos;s sign you in
        </h1>
        {Object.values(providerMap).map((provider) => (
          <form
            action={signInAction}
            key={provider.id}
            className="w-full md:w-3/5 min-w-fit"
          >
            <input type="hidden" name="providerId" value={provider.id} />
            <Button
              type="submit"
              className="w-full bg-transparent text-foreground border border-input hover:bg-accent hover:text-accent-foreground py-7 gap-x-3"
            >
              {getProviderIcon(provider.name)}
              Continue with {provider.name}
            </Button>
          </form>
        ))}
      </div>
    </div>
  );
}

function getProviderIcon(providerName: string) {
  return match(providerName)
    .with("GitHub", () => <FiGithub />)
    .with("Google", () => <FcGoogle />)
    .with("LinkedIn", () => <FaLinkedinIn />)
    .otherwise(() => null);
}
