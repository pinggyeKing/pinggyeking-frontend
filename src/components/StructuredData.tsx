import Script from "next/script";

export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "변명 연구소",
    description: "AI가 상황에 맞는 완벽한 핑계를 만들어주는 웹 애플리케이션",
    url: "https://your-domain.com", // 실제 도메인으로 변경해주세요
    applicationCategory: "Entertainment",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "KRW",
    },
    creator: {
      "@type": "Organization",
      name: "변명 연구소",
    },
  };

  return (
    <>
      {/* 구조화된 데이터 (JSON-LD) */}
      <Script
        id="structured-data"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      {/* Swyg 위젯 스크립트 */}
      <Script
        src="https://cdn.swygbro.com/public/widget/swyg-widget.js"
        strategy="afterInteractive"
      />
    </>
  );
}
