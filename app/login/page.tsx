import { AuthForm } from "@/app/components/authForms";
import { signIn } from "@/app/actions/auth";

export default function Login() {
  return <AuthForm action={signIn} />;
}