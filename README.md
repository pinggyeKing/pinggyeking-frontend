# pinggyeking-frontend

핑계킹 프론트엔드 프로젝트입니다. 이 프로젝트는 [Next.js](https://nextjs.org)를 기반으로 [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app)으로 생성되었습니다.

## 환경 설정

### 환경변수 설정

프로젝트 실행 전에 환경변수를 설정해야 합니다.

1. `.env.example` 파일을 참고하여 `.env.local` 파일을 생성하세요:

```bash
cp .env.example .env.local
```

2. 또는 다음 환경변수를 직접 설정하세요:

```env
# API 서버 설정
NEXT_PUBLIC_API_BASE_URL=http://your-api-server:8080  # 개발환경
# NEXT_PUBLIC_API_BASE_URL=http://your-api-server:8081  # 운영환경
```

### 환경별 API 서버

- **개발 환경**: 개발용 API 서버 주소
- **운영 환경**: 운영용 API 서버 주소

## Getting Started

환경변수 설정 완료 후, 개발 서버를 실행하세요:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## 프로젝트 구조

```
src/
├── app/                    # Next.js App Router 페이지
│   ├── api-test/          # API 테스트 페이지
│   ├── create/            # 핑계 생성 페이지
│   ├── dashboard/         # 대시보드
│   ├── gallery/           # 갤러리 및 통계
│   ├── result/            # 결과 페이지
│   └── share/             # 공유 페이지
├── components/            # 재사용 가능한 컴포넌트
│   ├── common/           # 공통 컴포넌트 (Modal, Toast 등)
│   ├── inputs/           # 입력 관련 컴포넌트
│   └── icons/            # 아이콘 컴포넌트
├── contexts/             # React Context
├── lib/                  # 유틸리티 및 API 설정
└── globals.css          # 전역 스타일
```

## API 통합

API 통합 관련 자세한 내용은 [`API_INTEGRATION_GUIDE.md`](./API_INTEGRATION_GUIDE.md)를 참고하세요.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## 배포

### Vercel 배포

가장 쉬운 배포 방법은 Next.js 개발팀이 만든 [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)을 사용하는 것입니다.

배포 시 환경변수 설정:
- `NEXT_PUBLIC_API_BASE_URL`: 운영 환경 API 서버 URL

자세한 배포 가이드는 [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying)을 참고하세요.

### 기타 배포 플랫폼

다른 배포 플랫폼을 사용하는 경우에도 다음 환경변수를 설정해야 합니다:

```env
NEXT_PUBLIC_API_BASE_URL=http://your-production-api-server:8081
```

## 기술 스택

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS, SCSS Modules
- **HTTP Client**: Axios
- **State Management**: React Query (TanStack Query)
- **Icons & Animations**: Custom SVG, Lottie
