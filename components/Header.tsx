"use client"; // Mark as a client component

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react"; // Use next-auth/react for client-side sign-out
import { Session } from "next-auth"; // Import Session type

type HeaderProps = {
  session: Session | null; // Accept session as a prop
};

const Header = ({ session }: HeaderProps) => {
  // Handle sign-out on the client side
  const handleSignOut = async () => {
    await signOut({ redirect: true, callbackUrl: "/sign-in" });
  };

  return (
    <header className="my-10 flex justify-between gap-5">
      <Link href="/">
        <Image src="/icons/logo.svg" alt="logo" width={40} height={40} />
      </Link>

      <ul className="flex flex-row items-center gap-8">
        {session && ( // Only show logout button if session exists
          <li>
            <Button onClick={handleSignOut}>Logout</Button>
          </li>
        )}
      </ul>
    </header>
  );
};

export default Header;