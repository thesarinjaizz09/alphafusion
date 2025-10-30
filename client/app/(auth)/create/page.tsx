import { type Metadata } from "next"
import { CreateForm } from "@/app/(auth)/create/create-form"

export const metadata: Metadata = {
  title: "Create - AlphaFusion",
  description: "Sign up for AlphaFusion – the AI-powered trading ecosystem for equities, assets and many more. Get real-time forecasts, actionable signals, and autonomous trading for smarter investments."
}

export default function SignupPage() {
  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="w-full max-w-xs">
        <CreateForm />
      </div>
    </div>
  )
}
