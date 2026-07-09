// "use client";

// import Link from "next/link";
// import { useEffect, useState } from "react";
// import { Menu } from "lucide-react";

// import { Button } from "@/src/components/ui/button";
// import { Sheet, SheetContent, SheetTrigger } from "@/src/components/ui/sheet";
// import { getUser, UserLogOut } from "@/src/services/auth";
// import { usePathname } from "next/navigation";
// // import { getUser, UserLogOut } from "@/services/auth";

// export default function Navbar() {
//   const [open, setOpen] = useState(false);
//   const [user, setUser] = useState(null);

//   const navLinks = [
//     { name: "Home", href: "/" },
//     { name: "Browse Tutors", href: "/tutors" },
//     { name: "profile", href: "/profile" },
//     { name: "Dashboard", href: "/dashboard" },
//     { name: "About", href: "/about-us" },
//   ];

//   const pathname = usePathname();

//   useEffect(() => {
//     const getCurrentUser = async () => {
//       const userdata = await getUser();
//       setUser(userdata);
//     };

//     getCurrentUser();
//   }, [pathname]);

//   const handleLogOut = async () => {
//     await UserLogOut();
//     setUser(null);

//     window.dispatchEvent(new Event("authChanged"));
//   };

//   return (
//     <header className="border-b bg-background">
//       <div className="container mx-auto flex h-16 items-center justify-between px-4">
//         {/* Logo */}
//         <Link href="/" className="text-xl font-bold">
//           MyApp
//         </Link>

//         {/* Desktop Menu */}
//         <nav className="hidden md:flex items-center gap-6">
//           {navLinks.map((link) => (
//             <Link
//               key={link.name}
//               href={link.href}
//               className="text-sm font-medium hover:text-primary transition-colors"
//             >
//               {link.name}
//             </Link>
//           ))}

//           {!user && (
//             <Link href={"/register"}>
//               <Button>Register</Button>
//             </Link>
//           )}

//           {user ? (
//             <Button onClick={handleLogOut}> Log Out</Button>
//           ) : (
//             <Link href={"/login"}>
//               <Button> Login</Button>
//             </Link>
//           )}
//         </nav>

//         {/* Mobile Menu */}
//         <div className="md:hidden">
//           <Sheet open={open} onOpenChange={setOpen}>
//             <SheetTrigger asChild>
//               <Button variant="ghost" size="icon">
//                 <Menu className="h-5 w-5" />
//               </Button>
//             </SheetTrigger>

//             <SheetContent side="right" className="w-64">
//               <div className="flex flex-col gap-6 mt-6">
//                 {navLinks.map((link) => (
//                   <Link
//                     key={link.name}
//                     href={link.href}
//                     onClick={() => setOpen(false)}
//                     className="text-sm font-medium hover:text-primary transition-colors"
//                   >
//                     {link.name}
//                   </Link>
//                 ))}

//                 {!user && (
//                   <Link href={"/register"}>
//                     <Button className="w-full">Register</Button>
//                   </Link>
//                 )}

//                 {user ? (
//                   <Button className="w-full" onClick={handleLogOut}>
//                     Log Out
//                   </Button>
//                 ) : (
//                   <Link href="/login">
//                     <Button className="w-full">Login</Button>
//                   </Link>
//                 )}
//               </div>
//             </SheetContent>
//           </Sheet>
//         </div>
//       </div>
//     </header>
//   );
// }

// gpt
// "use client";

// import Link from "next/link";
// import { useEffect, useState } from "react";
// import { Menu } from "lucide-react";
// import { usePathname, useRouter } from "next/navigation";

// import { Button } from "@/src/components/ui/button";
// import {
//   Sheet,
//   SheetContent,
//   SheetTrigger,
// } from "@/src/components/ui/sheet";

// import {
//   getUser,
//   UserLogOut,
// } from "@/src/services/auth";

// export default function Navbar() {
//   const [open, setOpen] = useState(false);
//   const [user, setUser] = useState<any>(null);

//   const pathname = usePathname();
//   const router = useRouter();

//   const navLinks = [
//     { name: "Home", href: "/" },
//     { name: "Browse Tutors", href: "/tutors" },
//     { name: "profile", href: "/profile" },
//     { name: "Dashboard", href: "/dashboard" },
//     { name: "About", href: "/about-us" },
//   ];

//   const loadUser = async () => {
//     const userdata = await getUser();
//     setUser(userdata);
//   };

//   useEffect(() => {
//     window.addEventListener(
//       "authChanged",
//       () => {
//         window.location.reload();
//       }
//     );

//     return () => {
//       window.removeEventListener(
//         "authChanged",
//         () => { }
//       );
//     };
//   }, []);
//   const handleLogOut = async () => {
//     await UserLogOut();
//     setUser(null);

//     window.dispatchEvent(
//       new Event("authChanged")
//     );

//     router.refresh();
//     router.push("/");
//   };

//   return (
//     <header className="border-b bg-background">
//       <div className="container mx-auto flex h-16 items-center justify-between px-4">
//         <Link href="/" className="text-xl font-bold">
//           MyApp
//         </Link>

//         <nav className="hidden md:flex items-center gap-6">
//           {navLinks.map((link) => (
//             <Link
//               key={link.name}
//               href={link.href}
//               className="text-sm font-medium"
//             >
//               {link.name}
//             </Link>
//           ))}

//           {!user && (
//             <Link href="/register">
//               <Button>Register</Button>
//             </Link>
//           )}

//           {user ? (
//             <Button onClick={handleLogOut}>
//               Log Out
//             </Button>
//           ) : (
//             <Link href="/login">
//               <Button>Login</Button>
//             </Link>
//           )}
//         </nav>

//         <div className="md:hidden">
//           <Sheet open={open} onOpenChange={setOpen}>
//             <SheetTrigger asChild>
//               <Button variant="ghost" size="icon">
//                 <Menu className="h-5 w-5" />
//               </Button>
//             </SheetTrigger>

//             <SheetContent side="right" className="w-64">
//               <div className="flex flex-col gap-6 mt-6">
//                 {navLinks.map((link) => (
//                   <Link
//                     key={link.name}
//                     href={link.href}
//                     onClick={() => setOpen(false)}
//                   >
//                     {link.name}
//                   </Link>
//                 ))}

//                 {!user && (
//                   <Link href="/register">
//                     <Button className="w-full">
//                       Register
//                     </Button>
//                   </Link>
//                 )}

//                 {user ? (
//                   <Button
//                     className="w-full"
//                     onClick={handleLogOut}
//                   >
//                     Log Out
//                   </Button>
//                 ) : (
//                   <Link href="/login">
//                     <Button className="w-full">
//                       Login
//                     </Button>
//                   </Link>
//                 )}
//               </div>
//             </SheetContent>
//           </Sheet>
//         </div>
//       </div>
//     </header>
//   );
// }


//----------------------
// gpt

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import { Button } from "@/src/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/src/components/ui/sheet";

type User = {
  id?: string;
  email?: string;
  role?: string;
};

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Browse Tutors", href: "/tutors" },
    { name: "Profile", href: "/profile" },
    { name: "Dashboard", href: "/dashboard" },
    { name: "About", href: "/about-us" },
  ];

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/me", {
          credentials: "include",
        });

        if (!res.ok) {
          setUser(null);
          return;
        }

        const data = await res.json();
        const u = data?.user;
        if (!u || typeof u !== "object") {
          setUser(null);
          return;
        }
        const raw = u as Record<string, unknown>;
        const id =
          typeof raw.id === "string"
            ? raw.id
            : raw.id != null
              ? String(raw.id)
              : typeof raw.sub === "string"
                ? raw.sub
                : raw.sub != null
                  ? String(raw.sub)
                  : undefined;
        const email =
          typeof raw.email === "string" ? raw.email : undefined;
        const role =
          typeof raw.role === "string" ? raw.role : undefined;
        if (!id && !email) {
          setUser(null);
          return;
        }
        setUser({ id, email, role });
      } catch {
        setUser(null);
      }
    };

    checkAuth();

    const onAuthChanged = () => {
      void checkAuth();
    };
    window.addEventListener("authChanged", onAuthChanged);
    return () => window.removeEventListener("authChanged", onAuthChanged);
  }, [pathname]);

  const handleLogOut = async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    const base = process.env.NEXT_PUBLIC_BASE_URL;
    if (base) {
      await fetch(`${base}/auth/logout`, {
        method: "POST",
        credentials: "include",
      }).catch(() => {});
    }

    setUser(null);
    window.location.href = "/";
  };

  const isLoggedIn = Boolean(
    user && (user.id || user.email)
  );

  return (
    <header className="border-b bg-background">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* LOGO */}
        <Link href="/" className="text-xl font-bold">
          MyApp
        </Link>

        {/* DESKTOP MENU */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium hover:opacity-70"
            >
              {link.name}
            </Link>
          ))}

          {!isLoggedIn ? (
            <>
              <Link href="/register">
                <Button>Register</Button>
              </Link>

              <Link href="/login">
                <Button>Login</Button>
              </Link>
            </>
          ) : (
            <Button onClick={handleLogOut}>
              Log Out
            </Button>
          )}
        </nav>

        {/* MOBILE MENU */}
        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost">Menu</Button>
            </SheetTrigger>

            <SheetContent side="right">
              <div className="flex flex-col gap-4 mt-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}

                {!isLoggedIn ? (
                  <>
                    <Link href="/register">
                      <Button className="w-full">
                        Register
                      </Button>
                    </Link>

                    <Link href="/login">
                      <Button className="w-full">
                        Login
                      </Button>
                    </Link>
                  </>
                ) : (
                  <Button
                    className="w-full"
                    onClick={handleLogOut}
                  >
                    Log Out
                  </Button>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}