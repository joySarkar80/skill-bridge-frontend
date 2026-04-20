"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu } from "lucide-react";

import { Button } from "@/src/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/src/components/ui/sheet";
import { getUserFromToken, UserLogOut } from "@/src/services/auth";
import { usePathname } from "next/navigation";
// import { getUser, UserLogOut } from "@/services/auth";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Browse Tutors", href: "/tutors" },
    { name: "profile", href: "/profile" },
    { name: "Dashboard", href: "/dashboard" },
    { name: "About", href: "/about-us" },
  ];

  const pathname = usePathname();

  useEffect(() => {
    const getCurrentUser = async () => {
      const userdata = await getUserFromToken();
      setUser(userdata);
    };

    getCurrentUser();
  }, [pathname]);

  const handleLogOut = async () => {
    await UserLogOut();
    setUser(null);

    window.dispatchEvent(new Event("authChanged"));
  };

  return (
    <header className="border-b bg-background">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold">
          MyApp
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              {link.name}
            </Link>
          ))}

          {!user && (
            <Link href={"/register"}>
              <Button className="cursor-pointer">Register</Button>
            </Link>
          )}

          {user ? (
            <Button className="cursor-pointer" onClick={handleLogOut}>
              Log Out
            </Button>
          ) : (
            <Link href={"/login"}>
              <Button className="cursor-pointer"> Login</Button>
            </Link>
          )}
        </nav>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-64">
              <SheetHeader className="sr-only">
                <SheetTitle>Navigation Menu</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-6 mt-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="text-sm font-medium hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}

                {!user && (
                  <Link href={"/register"}>
                    <Button className="w-full cursor-pointer">Register</Button>
                  </Link>
                )}

                {user ? (
                  <Button className="w-full cursor-pointer" onClick={handleLogOut}>
                    Log Out
                  </Button>
                ) : (
                  <Link href="/login">
                    <Button className="w-full cursor-pointer">Login</Button>
                  </Link>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}