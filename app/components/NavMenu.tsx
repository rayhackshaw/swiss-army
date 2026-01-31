"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import classNames from "classnames";

const menuItems = [
  {
    title: "Text Compare",
    href: "/text-compare",
  },
  {
    title: "JSON Prettify",
    href: "/json-prettify",
  },
  {
    title: "SQL Syntax Highlighter",
    href: "/sql-highlighter",
  },
  {
    title: "Typing Speed Test",
    href: "/typing-speed-test",
  },
  {
    title: "Reaction Speed Test",
    href: "/reaction-speed",
  },
];

export const NavMenu = () => {
  const pathname = usePathname();

  return (
    <>
      {menuItems.map((item) => {
        const isActive = pathname.includes(item.href);
        return (
          <Link
            href={item.href}
            prefetch={false}
            key={item.href}
            className={classNames(
              isActive ? "font-bold underline" : "",
              "mr-4"
            )}
          >
            {item.title}
          </Link>
        );
      })}
    </>
  );
};
