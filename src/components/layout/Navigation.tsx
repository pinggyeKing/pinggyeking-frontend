'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import React from 'react';
import { Home, LayoutDashboard } from 'lucide-react';

interface IMenuItem {
  label: string;
  href: string;
  ariaLabel: string;
  icon: React.ElementType;
}

const menuItems: IMenuItem[] = [
  {
    label: '핑계 생성',
    href: '/', // 기본 페이지를 핑계 생성으로 가정
    ariaLabel: '핑계 생성 페이지로 이동',
    icon: Home,
  },
  {
    label: '핑계 갤러리',
    href: '/gallery',
    ariaLabel: '핑계 갤러리 페이지로 이동',
    icon: LayoutDashboard,
  },
];

const Navigation = () => {
  const currentPath = usePathname();

  return (
    <nav
      className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] h-[128px] p-2"
      aria-label="메인 네비게이션"
    >
      <div className="flex h-full items-center justify-stretch gap-8 rounded-[24px] bg-white px-8 py-6">
        {menuItems.map(({ label, href, ariaLabel, icon: Icon }) => {
          const isActive = currentPath === href;
          return (
            <Link
              key={href}
              href={href}
              aria-label={ariaLabel}
              aria-current={isActive ? 'page' : undefined}
              className={`flex h-full flex-1 cursor-pointer items-center justify-center gap-1 rounded-[24px] border-2 p-3 text-2xl font-bold transition-colors duration-200 
              ${
                isActive
                  ? 'border-[#1E1E1E] bg-[#1E1E1E] text-white'
                  : 'border-transparent bg-white text-[#1E1E1E] hover:bg-gray-100'
              }`}
              style={{ fontFamily: 'var(--font-ownglyph-pdh)' }}
            >
              <Icon
                className="h-6 w-6"
                strokeWidth={isActive ? 2.5 : 2}
                aria-hidden="true"
              />
              <span className="leading-none pt-1">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default Navigation;
