import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { BlogPost, BlogMetadata } from "./types";

const blogsDirectory = path.join(process.cwd(), "content/blogs");

export async function getBlogSlugs() {
    if (!fs.existsSync(blogsDirectory)) {
        return [];
    }
    return fs.readdirSync(blogsDirectory).filter((file) => file.endsWith(".md") || file.endsWith(".mdx"));
}

export async function getBlogBySlug(slug: string): Promise<BlogPost | null> {
    const realSlug = slug.replace(/\.mdx?$/, "");
    const fullPath = path.join(blogsDirectory, `${realSlug}.md`);
    const fullPathMdx = path.join(blogsDirectory, `${realSlug}.mdx`);

    let actualPath = "";
    if (fs.existsSync(fullPath)) {
        actualPath = fullPath;
    } else if (fs.existsSync(fullPathMdx)) {
        actualPath = fullPathMdx;
    } else {
        return null;
    }

    const fileContents = fs.readFileSync(actualPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
        ...data,
        slug: realSlug,
        content,
    } as BlogPost;
}

export async function getAllBlogs(): Promise<BlogMetadata[]> {
    const slugs = await getBlogSlugs();
    const blogs = await Promise.all(
        slugs.map(async (slug) => {
            const blog = await getBlogBySlug(slug);
            if (!blog) return null;
            const { content, ...metadata } = blog;
            return metadata;
        })
    );

    return (blogs.filter((blog) => blog !== null) as BlogMetadata[]).sort((a, b) => {
        return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime();
    });
}

export async function getRelatedBlogs(currentSlug: string, tags: string[]): Promise<BlogMetadata[]> {
    const allBlogs = await getAllBlogs();
    return allBlogs
        .filter((blog) => blog.slug !== currentSlug)
        .filter((blog) => blog.tags.some((tag) => tags.includes(tag)))
        .slice(0, 3);
}
