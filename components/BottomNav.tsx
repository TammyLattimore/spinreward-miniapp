"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="bottom-nav" aria-label="Main navigation">
      <Link className={pathname === "/" ? "active" : ""} href="/">
        Spin
      </Link>
      <Link className={pathname === "/reward" ? "active" : ""} href="/reward">
        Reward
      </Link>
      <Link className={pathname === "/about" ? "active" : ""} href="/about">
        About
      </Link>
    </nav>
  );
}
