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
    <div className='flex flex-wrap gap-y-2'>
      {menuItems.map((item) => {
        const isActive = pathname.includes(item.href);
        return (
          <Link
            href={item.href}
            prefetch={false}
            key={item.href}
            className={classNames(
              isActive ? "font-bold text-black underline underline-offset-4 decoration-saffron" : "hover:text-black",
              "mr-4 transition-colors duration-100"
            )}
          >
            {item.title}
          </Link>
        );
      })}
    </div>
  );
};
