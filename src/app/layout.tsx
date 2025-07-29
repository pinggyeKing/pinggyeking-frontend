import type { Metadata } from "next";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout";
import { SplashProvider } from "@/contexts/SplashContext";
import { NavigationProvider } from "@/contexts/NavigationContext";

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
      <body
        className="antialiased bg-cover bg-center bg-no-repeat bg-fixed"
        style={{
          backgroundImage: "url(/Background.svg)",
        }}
      >
        <SplashProvider>
          <NavigationProvider>
            <ClientLayout>{children}</ClientLayout>
          </NavigationProvider>
        </SplashProvider>
      </body>
    </html>
  );
}
