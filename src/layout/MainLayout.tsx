"use client";

import { Header } from "@/components";
import Sidebar from "@/components/Sidebar";
import { useAppSelector } from "@/lib/store";
import { ReactNode } from "react";

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const isMenuOpen = useAppSelector((state) => state.app.isMenuOpen);

  return (
    <>
      <Header />
      <div className="flex p-2 w-full">
        <div>{isMenuOpen && <Sidebar />}</div>
        {children}
      </div>
    </>
  );
}
