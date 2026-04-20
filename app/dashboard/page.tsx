import { createClient } from "../lib/supabase/server";
import { signOut } from "@/app/actions/auth";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function Dashboard() {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return null;
    }

    const userName = user.user_metadata?.name || user.email?.split("@")[0] || "User";

    return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-6">
            <h1 className="text-2xl font-semibold">Welcome to Machine Learning Hub, {userName}!</h1>
            <p className="text-muted-foreground">You are logged in as {user.email}</p>
            <form action={signOut}>
                <Button type="submit" variant="outline">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                </Button>
            </form>
        </div>
    );
}