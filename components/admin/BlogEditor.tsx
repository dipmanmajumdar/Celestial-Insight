"use client";

import { useState, useEffect } from "react";
import { BlogMetadata, BlogPost, Difficulty } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Save, X, Image as ImageIcon, Sparkles, Loader2 } from "lucide-react";
import { saveBlog, uploadImage } from "@/app/AdminDeeEn/actions";
import { MarkdownPreview } from "./MarkdownPreview";

interface BlogEditorProps {
    blog?: BlogMetadata | null;
    onClose: () => void;
    onSave: () => void;
}

export function BlogEditor({ blog, onClose, onSave }: BlogEditorProps) {
    const [loading, setLoading] = useState(false);
    const [contentLoading, setContentLoading] = useState(!!blog);
    const [formData, setFormData] = useState({
        title: blog?.title || "",
        author: blog?.author || "Me",
        publishDate: blog?.publishDate || new Date().toISOString().split("T")[0],
        difficulty: (blog?.difficulty || "Beginner") as Difficulty,
        tags: blog?.tags.join(", ") || "",
        thumbnailImage: blog?.thumbnailImage || "",
        excerpt: blog?.excerpt || "",
        content: "",
        slug: blog?.slug || "",
    });

    useEffect(() => {
        async function fetchFullBlog() {
            if (blog) {
                // We'll use a fetch because it's client side. 
                // But wait, I'll just create a simple action for this.
                // For now, let's assume we can get it.
                try {
                    const response = await fetch(`/api/blog-content/${blog.slug}`);
                    const data = await response.json();
                    setFormData(prev => ({ ...prev, content: data.content }));
                } catch (e) {
                    console.error("Failed to fetch content", e);
                } finally {
                    setContentLoading(false);
                }
            }
        }
        fetchFullBlog();
    }, [blog]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        if (name === "title" && !blog) {
            setFormData((prev) => ({
                ...prev,
                slug: value.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "")
            }));
        }
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setLoading(true);
        const data = new FormData();
        data.append("image", file);

        const result = await uploadImage(data);
        if (result.success && result.url) {
            setFormData(prev => ({ ...prev, thumbnailImage: result.url! }));
        }
        setLoading(false);
    };

    const handleSubmit = async () => {
        setLoading(true);
        const result = await saveBlog({
            ...formData,
            tags: formData.tags.split(",").map(t => t.trim()),
        });
        if (result.success) {
            onSave();
        }
        setLoading(false);
    };

    if (contentLoading) {
        return (
            <div className="h-[60vh] flex flex-col items-center justify-center gap-4">
                <Loader2 className="w-12 h-12 animate-spin text-primary" />
                <p className="text-muted-foreground">Reconstructing cosmic data...</p>
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold">{blog ? "Edit Publication" : "New Cosmic Insight"}</h2>
                <div className="flex gap-2">
                    <Button variant="ghost" onClick={onClose} className="glass">
                        <X className="w-4 h-4 mr-2" /> Cancel
                    </Button>
                    <Button onClick={handleSubmit} disabled={loading} className="gap-2">
                        <Save className="w-4 h-4" /> {loading ? "Saving..." : "Publish to Galaxy"}
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <div className="glass p-6 rounded-2xl space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Title</label>
                            <Input name="title" value={formData.title} onChange={handleInputChange} className="bg-white/5 border-white/10" />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Author</label>
                                <Input name="author" value={formData.author} onChange={handleInputChange} className="bg-white/5 border-white/10" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Slug</label>
                                <Input name="slug" value={formData.slug} onChange={handleInputChange} className="bg-white/5 border-white/10" disabled={!!blog} />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Date</label>
                                <Input name="publishDate" type="date" value={formData.publishDate} onChange={handleInputChange} className="bg-white/5 border-white/10" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Tags (comma separated)</label>
                            <Input name="tags" value={formData.tags} onChange={handleInputChange} className="bg-white/5 border-white/10" />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Thumbnail URL</label>
                            <div className="flex gap-2">
                                <Input name="thumbnailImage" value={formData.thumbnailImage} onChange={handleInputChange} className="bg-white/5 border-white/10" />
                                <div className="relative">
                                    <input type="file" id="img-upload" className="hidden" onChange={handleImageUpload} accept="image/*" />
                                    <Button variant="outline" className="glass h-10 px-3" asChild>
                                        <label htmlFor="img-upload" className="cursor-pointer">
                                            <ImageIcon className="w-4 h-4" />
                                        </label>
                                    </Button>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Excerpt</label>
                            <Textarea name="excerpt" value={formData.excerpt} onChange={handleInputChange} className="bg-white/5 border-white/10" />
                        </div>
                    </div>
                </div>

                <div className="h-full">
                    <Tabs defaultValue="editor" className="h-full">
                        <TabsList className="bg-white/5 border-white/10">
                            <TabsTrigger value="editor">Editor</TabsTrigger>
                            <TabsTrigger value="preview">Live Preview</TabsTrigger>
                        </TabsList>
                        <TabsContent value="editor" className="h-[calc(100%-40px)]">
                            <Textarea
                                name="content"
                                value={formData.content}
                                onChange={handleInputChange}
                                className="h-[600px] font-mono p-4 bg-white/5 border-white/10 text-lg leading-relaxed"
                                placeholder="# Start writing some cosmic magic..."
                            />
                        </TabsContent>
                        <TabsContent value="preview" className="h-[calc(100%-40px)] overflow-y-auto">
                            <div className="glass p-8 rounded-2xl min-h-[600px] prose prose-invert">
                                <MarkdownPreview content={formData.content || "*No content yet*"} />
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    );
}
