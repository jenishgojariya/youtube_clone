import type { Metadata } from "next";
import "./globals.css";
import { Provider } from "@/utils";
import MainLayout from "@/layout/MainLayout";

export const metadata: Metadata = {
  title: "Youtube Clone",
  description: "Constructed By Jenish Gojariya",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased relative`}>
        <Provider>
          <MainLayout>{children}</MainLayout>
        </Provider>
      </body>
    </html>
  );
}
