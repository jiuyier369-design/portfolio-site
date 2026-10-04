import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "个人作品集", description: "个人网站与 Job Copilot 工程作品展示" };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body>{children}</body></html>;
}
