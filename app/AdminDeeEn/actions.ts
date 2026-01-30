"use server";

import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import { redirect } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

const USERNAME = process.env.ADMIN_USERNAME || "admin";
const PASSWORD = process.env.ADMIN_PASSWORD || "password";
const SECRET = new TextEncoder().encode(process.env.SESSION_SECRET || "secret");

export async function login(formData: FormData) {
    const username = formData.get("username");
    const password = formData.get("password");

    if (username === USERNAME && password === PASSWORD) {
        const token = await new SignJWT({ role: "admin" })
            .setProtectedHeader({ alg: "HS256" })
            .setExpirationTime("2h")
            .sign(SECRET);

        const cookieStore = await cookies();
        cookieStore.set("admin_session", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7200,
            path: "/",
        });
        return { success: true };
    }
    return { success: false, error: "Invalid credentials" };
}

export async function logout() {
    const cookieStore = await cookies();
    cookieStore.delete("admin_session");
    redirect("/AdminDeeEn");
}

export async function isAuthenticated() {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_session")?.value;
    if (!token) return false;
    try {
        await jwtVerify(token, SECRET);
        return true;
    } catch {
        return false;
    }
}

export async function saveBlog(blog: {
    title: string;
    author: string;
    publishDate: string;
    difficulty: string;
    tags: string[];
    thumbnailImage: string;
    excerpt: string;
    content: string;
    slug: string;
}): Promise<{ success: boolean; error?: string }> {
    if (!(await isAuthenticated())) throw new Error("Unauthorized");

    // Ensure slug is always sanitized, whether provided or generated
    const rawSlug = blog.slug || blog.title;
    const generatedSlug = rawSlug.toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]/g, "")
        .replace(/--+/g, "-")
        .replace(/^-+|-+$/g, "");

    const { data, error } = await supabase
        .from("blogs")
        .upsert({
            title: blog.title,
            slug: generatedSlug,
            content: blog.content,
            excerpt: blog.excerpt,
            author: blog.author,
            publish_date: blog.publishDate,
            difficulty: blog.difficulty,
            tags: blog.tags,
            thumbnail_url: blog.thumbnailImage,
            published: true
        });

    if (error) {
        console.error("Supabase Error:", error);
        return { success: false, error: error.message };
    }

    return { success: true };
}

export async function deleteBlog(slug: string): Promise<{ success: boolean; error?: string }> {
    if (!(await isAuthenticated())) throw new Error("Unauthorized");

    const { error } = await supabase
        .from("blogs")
        .delete()
        .eq("slug", slug);

    if (error) {
        console.error("Supabase Error:", error);
        return { success: false, error: error.message };
    }

    return { success: true };
}

export async function uploadImage(formData: FormData): Promise<{ success: boolean; error?: string; url?: string }> {
    if (!(await isAuthenticated())) throw new Error("Unauthorized");

    // Filesystem usage is forbidden. Returning error or using Supabase Storage if bucket exists.
    // For now, we recommend users to use external URLs or implement Supabase Storage.
    return {
        success: false,
        error: "Direct image upload is disabled (Filesystem usage is forbidden). Please use a Supabase Storage bucket or external URL."
    };
}
