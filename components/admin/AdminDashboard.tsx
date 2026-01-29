"use client";

import { useState } from "react";
import { BlogMetadata } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, LogOut, Eye, Search } from "lucide-react";
import { logout, deleteBlog } from "@/app/AdminDeeEn/actions";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { BlogEditor } from "./BlogEditor";
import { Input } from "@/components/ui/input";

interface AdminDashboardProps {
    initialBlogs: BlogMetadata[];
}

export function AdminDashboard({ initialBlogs }: AdminDashboardProps) {
    const [blogs, setBlogs] = useState(initialBlogs);
    const [editingBlog, setEditingBlog] = useState<BlogMetadata | null>(null);
    const [isCreating, setIsCreating] = useState(false);
    const [search, setSearch] = useState("");

    const filteredBlogs = blogs.filter(blog =>
        blog.title.toLowerCase().includes(search.toLowerCase()) ||
        blog.author.toLowerCase().includes(search.toLowerCase())
    );

    async function handleDelete(slug: string) {
        if (confirm("Are you sure you want to delete this blog? This cannot be undone.")) {
            await deleteBlog(slug);
            setBlogs(blogs.filter(b => b.slug !== slug));
        }
    }

    if (editingBlog || isCreating) {
        return (
            <BlogEditor
                blog={editingBlog}
                onClose={() => {
                    setEditingBlog(null);
                    setIsCreating(false);
                }}
                onSave={() => window.location.reload()}
            />
        );
    }

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-4xl font-bold tracking-tight">Mission Control</h1>
                    <p className="text-muted-foreground">Manage your astrophysical publications</p>
                </div>
                <div className="flex gap-2">
                    <Button onClick={() => setIsCreating(true)} className="gap-2">
                        <Plus className="w-4 h-4" /> Create Blog
                    </Button>
                    <Button variant="outline" onClick={() => logout()} className="gap-2 glass">
                        <LogOut className="w-4 h-4" /> Logout
                    </Button>
                </div>
            </div>

            <div className="flex items-center gap-4 glass p-4 rounded-xl">
                <Search className="w-5 h-5 text-muted-foreground" />
                <Input
                    placeholder="Search by title or author..."
                    className="bg-transparent border-none focus-visible:ring-0"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            <div className="glass rounded-2xl overflow-hidden">
                <Table>
                    <TableHeader className="bg-white/5">
                        <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Author</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredBlogs.map((blog) => (
                            <TableRow key={blog.slug} className="hover:bg-white/5 border-white/5">
                                <TableCell className="font-bold">{blog.title}</TableCell>
                                <TableCell>{blog.author}</TableCell>
                                <TableCell className="text-muted-foreground">{format(new Date(blog.publishDate), "MMM dd, yyyy")}</TableCell>
                                <TableCell className="text-right flex justify-end gap-2">

                                    <Button size="icon" variant="ghost" className="hover:text-primary" asChild>
                                        <a href={`/blogs/${blog.slug}`} target="_blank" rel="noopener noreferrer">
                                            <Eye className="w-4 h-4" />
                                        </a>
                                    </Button>
                                    <Button size="icon" variant="ghost" className="hover:text-indigo-400" onClick={() => setEditingBlog(blog)}>
                                        <Edit className="w-4 h-4" />
                                    </Button>
                                    <Button size="icon" variant="ghost" className="hover:text-destructive" onClick={() => handleDelete(blog.slug)}>
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
