"use client";

import { useState } from "react";
import { login } from "@/app/AdminDeeEn/actions";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Lock, User, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export function AdminLogin() {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        setError("");

        const formData = new FormData(e.currentTarget);
        const result = await login(formData);

        if (result.success) {
            router.refresh();
        } else {
            setError(result.error || "Login failed");
        }
        setLoading(false);
    }

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <Card className="w-full max-w-md glass border-white/10">
                <CardHeader className="text-center">
                    <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                        <Lock className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-3xl font-bold">Admin Access</CardTitle>
                    <CardDescription>Enter your cosmic credentials to continue</CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-4">
                        {error && (
                            <div className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
                                <AlertCircle className="w-4 h-4" />
                                {error}
                            </div>
                        )}
                        <div className="space-y-2">
                            <label className="text-sm font-medium flex items-center gap-2">
                                <User className="w-4 h-4" /> Username
                            </label>
                            <Input name="username" placeholder="admin" required className="bg-white/5 border-white/10" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium flex items-center gap-2">
                                <Lock className="w-4 h-4" /> Password
                            </label>
                            <Input name="password" type="password" required className="bg-white/5 border-white/10" />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button type="submit" className="w-full h-12 text-lg" disabled={loading}>
                            {loading ? "Authenticating..." : "Login to Command Center"}
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
