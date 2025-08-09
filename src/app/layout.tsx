import type { Metadata } from "next";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout";
import { SplashProvider } from "@/contexts/SplashContext";
import { NavigationProvider } from "@/contexts/NavigationContext";
import { ToastProvider, ToastContainer } from "@/components/common/Toast";
import StructuredData from "@/components/StructuredData";
import QueryClientWrapper from "@/components/QueryClientWrapper";

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
          <div className="h-svh flex items-center justify-center mx-8 my-1/2">
            <div
              className="w-[463px] h-full bg-cover bg-center bg-no-repeat rounded-[31px] border-[5.8711px] border-[#000000] shadow-lg"
              style={{
                backgroundImage: "url(/Background.svg)",
              }}
            >
              <div className="w-full h-full overflow-y-auto overflow-x-hidden rounded-[28px] pb-[140px]">
                <StructuredData />
                <QueryClientWrapper>
                  <SplashProvider>
                    <ToastProvider>
                      <NavigationProvider>
                        <ClientLayout>{children}</ClientLayout>
                      </NavigationProvider>
                    </ToastProvider>
                  </SplashProvider>
                </QueryClientWrapper>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile background - full screen */}
        <div
          className="md:hidden bg-cover bg-center bg-no-repeat bg-fixed min-h-screen pb-[140px]"
          style={{
            backgroundImage: "url(/Background.svg)",
          }}
        >
          <StructuredData />
          <QueryClientWrapper>
            <SplashProvider>
              <NavigationProvider>
                <ToastProvider>
                  <ClientLayout>{children}</ClientLayout>
                  <ToastContainer />
                </ToastProvider>
              </NavigationProvider>
            </SplashProvider>
          </QueryClientWrapper>
        </div>
      </body>
    </html>
  );
}
