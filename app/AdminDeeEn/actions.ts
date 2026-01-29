"use server";

import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import fs from "fs";
import path from "path";
import { BlogPost, Difficulty } from "@/lib/types";
import { redirect } from "next/navigation";

const USERNAME = process.env.ADMIN_USERNAME || "admin";
const PASSWORD = process.env.ADMIN_PASSWORD || "password";
const SECRET = new TextEncoder().encode(process.env.SESSION_SECRET || "secret");

const blogsDirectory = path.join(process.cwd(), "content/blogs");
const imagesDirectory = path.join(process.cwd(), "public/images/blogs");

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
}) {
    if (!(await isAuthenticated())) throw new Error("Unauthorized");

    const frontmatter = [
        "---",
        `title: "${blog.title.replace(/"/g, '\\"')}"`,
        `author: "${blog.author.replace(/"/g, '\\"')}"`,
        `publishDate: "${blog.publishDate}"`,
        `difficulty: "${blog.difficulty}"`,
        `tags: ${JSON.stringify(blog.tags)}`,
        `thumbnailImage: "${blog.thumbnailImage}"`,
        `excerpt: "${blog.excerpt.replace(/"/g, '\\"')}"`,
        "---",
        "",
        blog.content,
    ].join("\n");

    const filePath = path.join(blogsDirectory, `${blog.slug}.md`);
    fs.writeFileSync(filePath, frontmatter, "utf8");
    return { success: true };
}

export async function deleteBlog(slug: string) {
    if (!(await isAuthenticated())) throw new Error("Unauthorized");
    const filePath = path.join(blogsDirectory, `${slug}.md`);
    const filePathMdx = path.join(blogsDirectory, `${slug}.mdx`);

    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    else if (fs.existsSync(filePathMdx)) fs.unlinkSync(filePathMdx);

    return { success: true };
}

export async function uploadImage(formData: FormData) {
    if (!(await isAuthenticated())) throw new Error("Unauthorized");

    const file = formData.get("image") as File;
    if (!file) return { success: false, error: "No file uploaded" };

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    if (!fs.existsSync(imagesDirectory)) {
        fs.mkdirSync(imagesDirectory, { recursive: true });
    }

    const fileName = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
    const filePath = path.join(imagesDirectory, fileName);
    fs.writeFileSync(filePath, buffer);

    return { success: true, url: `/images/blogs/${fileName}` };
}
