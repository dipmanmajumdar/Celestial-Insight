import { supabase } from "./supabaseClient";
import { BlogPost, BlogMetadata } from "./types";

export async function getBlogSlugs() {
    const { data, error } = await supabase
        .from("blogs")
        .select("slug");

    if (error) {
        console.error("Error fetching slugs:", error);
        return [];
    }
    return data.map(b => b.slug);
}

export async function getBlogBySlug(slug: string): Promise<BlogPost | null> {
    const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .eq("slug", slug)
        .single();

    if (error || !data) {
        console.error("Error fetching blog by slug:", error);
        return null;
    }

    return {
        title: data.title,
        author: data.author,
        publishDate: data.publish_date,
        difficulty: data.difficulty,
        tags: data.tags,
        thumbnailImage: data.thumbnail_url,
        excerpt: data.excerpt,
        slug: data.slug,
        content: data.content,
    } as BlogPost;
}

export async function getAllBlogs(): Promise<BlogMetadata[]> {
    const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .order("publish_date", { ascending: false });

    if (error) {
        console.error("Error fetching blogs:", error);
        return [];
    }

    return data.map((blog) => ({
        title: blog.title,
        author: blog.author,
        publishDate: blog.publish_date,
        difficulty: blog.difficulty,
        tags: blog.tags,
        thumbnailImage: blog.thumbnail_url,
        excerpt: blog.excerpt,
        slug: blog.slug,
    }));
}

export async function getRelatedBlogs(currentSlug: string, tags: string[]): Promise<BlogMetadata[]> {
    const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .neq("slug", currentSlug)
        .contains("tags", tags)
        .limit(3);

    if (error) {
        console.error("Error fetching related blogs:", error);
        return [];
    }

    return data.map((blog) => ({
        title: blog.title,
        author: blog.author,
        publishDate: blog.publish_date,
        difficulty: blog.difficulty,
        tags: blog.tags,
        thumbnailImage: blog.thumbnail_url,
        excerpt: blog.excerpt,
        slug: blog.slug,
    }));
}
