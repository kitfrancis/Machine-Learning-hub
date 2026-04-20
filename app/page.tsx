import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div className="min-h-screen bg-black">
      <div className="flex flex-col items-center justify-center h-screen gap-6 px-10 md:px-70">
        <h1 className="text-3xl font-semibold text-center text-gray-100">The <span className="text-blue-500">Machine Learning Hub</span> for students.</h1>
        <p className="text-gray-300 text-base text-center">
         A simple platform to explore machine learning concepts, track your learning, and connect with peers — powered by Supabase and deployed on Vercel.
        </p>
        <Link href="/login">
          <Button className="text-base rounded-lg bg-gray-50 text-black hover:bg-gray-300">Get Started</Button>
        </Link>
      </div>
    </div>
    </main>
    
  );
}
