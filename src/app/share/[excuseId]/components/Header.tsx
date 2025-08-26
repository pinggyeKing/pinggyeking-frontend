"use client";

import Image from "next/image";
import React from "react";

function Header() {
  return (
    <div className="flex items-center gap-2 flex-col">
      <Image src="/icons/crown.svg" alt="logo" width={56} height={56} />
      <div className="text-center">
        <div className="text-section-title">흥미 유발 헤드 타이틀 문구</div>
        <div className="text-section-subtitle">핑계도 센스있게 너 차례야!</div>
      </div>
    </div>
  );
}

export default Header;
