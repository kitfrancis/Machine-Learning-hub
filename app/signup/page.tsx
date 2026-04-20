import { AuthForm } from "@/app/components/authForms";
import { signUp } from "@/app/actions/auth";

export default function SignUpPage() {
  return <AuthForm action={signUp} isRegister />;
}