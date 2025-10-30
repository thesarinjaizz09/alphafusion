'use client'

import { cn } from "@/lib/utils"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link"
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod";
import { LayoutDashboard, Mail, Lock, SquareUser } from "lucide-react"

export function CreateForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <FieldGroup>
        <div className="flex flex-col items-start gap-1 text-left">
          <h1 className="text-3xl font-bold">Create Credentials</h1>
          <p className="text-sm w-full">
            Create your credentials to access the AlphaFusion Dashboard
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="name"><SquareUser className="size-3.5 text-primary" /> Name</FieldLabel>
          <Input id="name" type="text" placeholder="John Doe" required />
        </Field>
        <Field>
          <FieldLabel htmlFor="email"><Mail className="size-3.5 text-primary" /> Email</FieldLabel>

          <Input id="email" type="email" placeholder="m@example.com" required />
        </Field>
        <Field>
          <FieldLabel htmlFor="password"><Lock className="size-3.5 text-primary" />Password</FieldLabel>

          <Input id="password" type="password" required placeholder="********" />
        </Field>
        <Field>
          <Button type="submit" className="cursor-pointer"><LayoutDashboard className="size-3" />Dashboard </Button>
        </Field>
        <Field>
          <FieldDescription className="text-center text-xs">
            Already have credentials?{" "}
            <Link href="/auth" className="underline underline-offset-4">
              Sign in
            </Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  )
}
