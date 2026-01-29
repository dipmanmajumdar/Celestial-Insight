"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Send, Mail, MapPin, Github, Twitter, Linkedin } from "lucide-react";
import { SparklesCore } from "@/components/aceternity/Sparkles";

export default function ContactPage() {
    return (
        <div className="pt-32 pb-24 px-6 min-h-screen relative overflow-hidden">
            <div className="absolute inset-0 -z-10">
                <SparklesCore
                    id="contact-bg"
                    background="transparent"
                    minSize={0.4}
                    maxSize={1}
                    particleDensity={30}
                    className="w-full h-full"
                    particleColor="#FFFFFF"
                />
            </div>

            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-8">
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tighter">
                        GET IN <span className="text-gradient">ORBIT</span>
                    </h1>
                    <p className="text-muted-foreground text-lg leading-relaxed max-w-lg">
                        Whether you're a fellow space enthusiast, a student, or just want to say hi, I'm always excited to talk about the cosmos.
                    </p>

                    <div className="space-y-6">
                        <div className="flex items-center gap-4 group">
                            <div className="w-12 h-12 rounded-2xl glass flex items-center justify-center group-hover:text-primary transition-colors">
                                <Mail className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Main Frequency</p>
                                <p className="font-bold">dmworkspace@yahoo.com</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 group">
                            <div className="w-12 h-12 rounded-2xl glass flex items-center justify-center group-hover:text-primary transition-colors">
                                <MapPin className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Location</p>
                                <p className="font-bold">Earth (Orbiting Sol)</p>
                            </div>
                        </div>

                        <div className="pt-6">
                            <p className="text-sm text-muted-foreground mb-4 font-medium uppercase tracking-widest">Connect with Me</p>
                            <div className="flex gap-4">
                                <a href="https://github.com/dipmanmajumdar" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-2xl glass flex items-center justify-center hover:text-primary transition-all hover:scale-110">
                                    <Github className="w-6 h-6" />
                                </a>
                                <a href="https://x.com/dipmanmajumdar" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-2xl glass flex items-center justify-center hover:text-primary transition-all hover:scale-110">
                                    <Twitter className="w-6 h-6" />
                                </a>
                                <a href="https://www.linkedin.com/in/dipman-majumdar-624288341/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-2xl glass flex items-center justify-center hover:text-primary transition-all hover:scale-110">
                                    <Linkedin className="w-6 h-6" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <Card className="glass border-white/10 p-4">
                    <CardHeader>
                        <CardTitle className="text-2xl">Send a Transmission</CardTitle>
                        <CardDescription>Fill out the form below and I'll get back to you across the void.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <form action="https://formspree.io/f/xbdyoyyo" method="POST" className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Name</label>
                                    <Input name="name" placeholder="Your Name" className="bg-white/5 border-white/10" required />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Email</label>
                                    <Input name="email" type="email" placeholder="email@example.com" className="bg-white/5 border-white/10" required />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Subject</label>
                                <Input name="subject" placeholder="Wormhole Mechanics" className="bg-white/5 border-white/10" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Message</label>
                                <Textarea name="message" placeholder="How does the event horizon affect..." className="bg-white/5 border-white/10 min-h-[150px]" required />
                            </div>
                            <Button type="submit" className="w-full gap-2 text-lg h-12">
                                Send Message <Send className="w-4 h-4" />
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
