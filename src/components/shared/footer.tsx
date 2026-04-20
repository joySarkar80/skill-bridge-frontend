"use client";

import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-muted/40 border-t mt-16">
            <div className="max-w-7xl mx-auto px-6 py-12 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">

                {/* Brand */}
                <div>
                    <h2 className="text-xl font-bold">SkillBridge</h2>
                    <p className="text-sm text-muted-foreground mt-2">
                        Connect with expert tutors and start learning anything, anytime.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="font-semibold mb-3">Quick Links</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="text-gray-500 hover:text-black transition-colors duration-200"><Link href="/">Home</Link></li>
                        <li className="text-gray-500 hover:text-black transition-colors duration-200"><Link href="/tutors">Browse Tutors</Link></li>
                        <li className="text-gray-500 hover:text-black transition-colors duration-200"><Link href="/login">Login</Link></li>
                        <li className="text-gray-500 hover:text-black transition-colors duration-200"><Link href="/register">Register</Link></li>
                    </ul>
                </div>

                {/* Roles */}
                <div>
                    <h3 className="font-semibold mb-3">For Users</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="text-gray-500 hover:text-black transition-colors duration-200"><Link href="/dashboard">Dashboard</Link></li>
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h3 className="font-semibold mb-3">Contact</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>Email: support@skillbridge.com</li>
                        <li>Phone: +880 1234-567890</li>
                        <li>Location: Bangladesh</li>
                    </ul>
                </div>

            </div>

            {/* Bottom bar */}
            <div className="border-t py-4 text-center text-sm text-muted-foreground">
                © {new Date().getFullYear()} SkillBridge. All rights reserved.
            </div>
        </footer>
    );
}