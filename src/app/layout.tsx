import type { Metadata } from "next";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout";
import { SplashProvider } from "@/contexts/SplashContext";
import { NavigationProvider } from "@/contexts/NavigationContext";
import StructuredData from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "변명 연구소",
  description:
    "완벽한 핑계를 찾고 있나요? AI가 상황에 맞는 완벽한 핑계를 만들어 드려요",
  keywords: ["변명", "핑계", "AI", "완벽한 핑계", "핑계 생성"],
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
    shortcut: "/favicon.png",
  },
  openGraph: {
    siteName: "변명 연구소",
    title: "변명 연구소",
    description:
      "완벽한 핑계를 찾고 있나요? AI가 상황에 맞는 완벽한 핑계를 만들어 드려요",
    type: "website",
    url: "https://excuselab.com",
    locale: "ko_KR",
    images: ["/favicon.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "변명 연구소",
    description:
      "완벽한 핑계를 찾고 있나요? AI가 상황에 맞는 완벽한 핑계를 만들어 드려요",
    images: ["/favicon.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">
        {/* Desktop background with frame */}
        <div className="hidden md:block fixed inset-0 bg-gray-50">
          <div className="min-h-screen flex items-center justify-center p-8">
            <div
              className="w-[463px] h-[1002px] bg-cover bg-center bg-no-repeat rounded-[31px] border-[5.8711px] border-[#000000] shadow-lg"
              style={{
                backgroundImage: "url(/Background.svg)",
              }}
            >
              <div className="w-full h-full overflow-hidden rounded-[28px]">
                <StructuredData />
                <SplashProvider>
                  <NavigationProvider>
                    <ClientLayout>{children}</ClientLayout>
                  </NavigationProvider>
                </SplashProvider>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile background - full screen */}
        <div
          className="md:hidden bg-cover bg-center bg-no-repeat bg-fixed min-h-screen"
          style={{
            backgroundImage: "url(/Background.svg)",
          }}
        >
          <StructuredData />
          <SplashProvider>
            <NavigationProvider>
              <ClientLayout>{children}</ClientLayout>
            </NavigationProvider>
          </SplashProvider>
        </div>
      </body>
    </html>
  );
}
