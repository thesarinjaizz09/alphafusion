import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { ArrowBigRightDash, Mail, Lock, FileKey } from "lucide-react"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <FieldGroup>
        <div className="flex flex-col items-start gap-1 text-left">
          <h1 className="text-3xl font-bold">Login Credentials</h1>
          <p className="text-sm w-full">
            Enter your credentials to access the AlphaFusion Dashboard
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="email"><Mail className="size-3.5 text-primary" /> Email</FieldLabel>
          <Input id="email" type="email" placeholder="m@example.com" required />
        </Field>
        <Field>
          <div className="flex items-center">
            <FieldLabel htmlFor="password"><Lock className="size-3.5 text-primary" />Password</FieldLabel>
            <Link
              href="/forgot"
              className="ml-auto text-xs underline-offset-4 hover:underline text-gray-400"
            >
              Forgot your password?
            </Link>
          </div>
          <Input id="password" type="password" required />
        </Field>
        <Field>
          <Button type="submit" className="cursor-pointer">Dashboard <ArrowBigRightDash /></Button>
        </Field>
        <Field>
          <FieldDescription className="text-center text-xs">
            Don&apos;t have credentials?{" "}
            <Link href="/create" className="underline underline-offset-4">
              Sign up
            </Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  )
}
