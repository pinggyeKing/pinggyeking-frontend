import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/layout/Navigation";
import ClientLayout from "@/components/ClientLayout";
import { SplashProvider } from "@/contexts/SplashContext";

export const metadata: Metadata = {
  title: "변명 연구소",
  description:
    "완벽한 핑계를 찾고 있나요? AI가 상황에 맞는 완벽한 핑계를 만들어 드려요",
  icons: "/default.svg",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`antialiased`}>
        <SplashProvider>
          <ClientLayout>
            {children}
            <Navigation />
          </ClientLayout>
        </SplashProvider>
      </body>
    </html>
  );
}
