"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar, Button } from "antd";
import {
  LogoutOutlined,
  HistoryOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";
import Logo from "@/shared/ui/Logo";
import { logoutAction } from "@/repository/auth/server-actions";
import { ROUTES } from "@/shared/util/constants";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: ROUTES.setup, label: "Mulai Kuis", icon: <ThunderboltOutlined /> },
  { href: ROUTES.history, label: "Riwayat", icon: <HistoryOutlined /> },
];

export default function AppNavbar({ username }: { username: string }) {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/85 backdrop-blur-md transition-all shadow-xs">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
        <Link
          href={ROUTES.home}
          className="flex items-center transition-transform hover:scale-[1.02]"
        >
          <Logo />
        </Link>

        <nav className="hidden items-center gap-2 sm:flex">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-200",
                  isActive
                    ? "bg-indigo-50/90 text-indigo-600 shadow-xs ring-1 ring-indigo-200/60"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
                )}
              >
                <span
                  className={cn(
                    "text-base",
                    isActive ? "text-indigo-600" : "text-slate-400",
                  )}
                >
                  {link.icon}
                </span>
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 rounded-full border border-slate-200/80 bg-slate-50/80 py-1 pl-1.5 pr-3 shadow-xs sm:flex">
            <Avatar
              size={28}
              className="!bg-gradient-to-tr !from-indigo-600 !to-indigo-500 !text-xs !font-bold !text-white"
            >
              {username.charAt(0).toUpperCase()}
            </Avatar>
            <span className="text-xs font-semibold text-slate-700 max-w-[120px] truncate">
              {username}
            </span>
          </div>

          <form action={logoutAction} className="flex items-center">
            <Button
              type="text"
              icon={<LogoutOutlined />}
              htmlType="submit"
              aria-label="Keluar"
              title="Keluar"
              className="!flex !items-center !justify-center !h-9 !w-9 !rounded-xl !text-slate-400 hover:!text-rose-600 hover:!bg-rose-50"
            />
          </form>
        </div>
      </div>

      {/* Mobile nav bar */}
      <nav className="flex items-center gap-2 border-t border-slate-200/60 bg-white/90 px-4 py-2 sm:hidden">
        {NAV_LINKS.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex flex-1 items-center justify-center gap-2 rounded-xl py-2 text-xs font-semibold transition-all",
                isActive
                  ? "bg-indigo-50 text-indigo-600 ring-1 ring-indigo-200/60"
                  : "text-slate-600 hover:bg-slate-100",
              )}
            >
              <span
                className={cn(
                  "text-sm",
                  isActive ? "text-indigo-600" : "text-slate-400",
                )}
              >
                {link.icon}
              </span>
              {link.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
