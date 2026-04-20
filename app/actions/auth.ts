"use server";

import { revalidatePath } from "next/cache";
import {redirect} from "next/navigation";
import { createClient } from "@/app/lib/supabase/server";
import { toast } from "sonner"

export const signIn = async (prevState: { error?: string } | null, formData: FormData) => {
    const supabase = await createClient();

    const data = {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
    }

    const { error } = await supabase.auth.signInWithPassword(data);

    if (error) {
        return { error: error.message };
    }

    revalidatePath("/", "layout");
    try {
        redirect("/dashboard");
    } catch (error) {
        throw error;
    }
}   



export const signUp = async (prevState: { error?: string } | null, formData: FormData) => {
    const supabase = await createClient();

    const data = {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
    }

    const { error } = await supabase.auth.signUp(data);

    if (error) {
        return { error: error.message };
    }

    revalidatePath("/", "layout");
    toast.success("Created account Successfully!");

}   


export const signOut = async () => {
    const supabase = await createClient();

    revalidatePath("/", "layout");
        redirect("/");
}