import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div className="min-h-screen">
      <div className="flex flex-col items-center justify-center h-screen gap-6">
        <h1 className="text-3xl font-semibold">Machine Learning Hub</h1>
        <p className="text-muted-foreground text-base">
         A simple platform to explore machine learning concepts, track your learning, and connect with peers — powered by Supabase and deployed on Vercel.
        </p>
        <Link href="/login">
          <Button>Get Started</Button>
        </Link>
      </div>
    </div>
    </main>
    
  );
}
