# API 연동 가이드

## 개요

이 프로젝트는 Axios와 TanStack Query를 사용하여 백엔드 API와 연동됩니다.

## 구현된 API

### 1. 핑계 상세 조회 API
- **엔드포인트**: `/api/excuses/{excuseId}/detail`
- **메서드**: GET
- **설명**: 특정 핑계의 상세 정보를 조회합니다.

#### 응답 형식
```typescript
{
  "excuse": {
    "situation": "string",    // 상황 설명
    "target": "string",       // 대상 상대방
    "tone": "string",         // 말투/톤
    "excuse": "string"        // 핑계 내용
  }
}
```

#### 사용법
```typescript
import { useExcuseDetail } from '@/app/share/api';

const { data, isLoading, error } = useExcuseDetail('excuse-id');
```

### 2. 대시보드 API (Gallery 페이지에서 사용)
- **엔드포인트**: `/api/dashboard`
- **메서드**: GET
- **설명**: 갤러리 페이지의 통계 정보를 조회합니다.

#### 응답 형식
```typescript
{
  "totalExcuses": 11,           // 전체 생성된 핑계 갯수
  "averageSatisfaction": 7.09,  // 만족도 평균
  "regenerationRate": 45.45,    // 재생성 비율
  "peakTime": {
    "hour": 14,                 // 피크타임 시간
    "count": 7                  // 피크타임에 생성된 갯수
  }
}
```

#### 사용법
```typescript
import { useDashboard } from '@/app/dashboard/api';

const { data, isLoading, error } = useDashboard();
```

## 기술 스택

- **Axios**: HTTP 클라이언트 라이브러리
- **TanStack Query**: 서버 상태 관리 및 캐싱
- **TypeScript**: 타입 안전성

## 설정

### API 기본 설정 (`src/lib/api.ts`)
```typescript
export const api = axios.create({
  baseURL: 'http://49.50.133.127:8080',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});
```

### TanStack Query 설정 (`src/lib/queryClient.ts`)
```typescript
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      staleTime: 1000 * 60 * 5, // 5분
      gcTime: 1000 * 60 * 10,   // 10분
    },
  },
});
```

## 파일 구조

```
src/
├── lib/
│   ├── api.ts           # Axios 설정 및 타입 정의
│   ├── queryClient.ts   # TanStack Query 설정
│   └── mockData.ts      # 개발용 Mock 데이터
├── app/
│   ├── share/
│   │   ├── api/
│   │   │   ├── excuseDetail.ts  # 핑계 상세 API 함수
│   │   │   ├── hooks.ts         # 커스텀 훅
│   │   │   └── index.ts         # Barrel export
│   │   └── [excuseId]/
│   │       └── page.tsx         # 동적 라우트 페이지
│   ├── dashboard/
│   │   ├── api/
│   │   │   ├── dashboard.ts     # 대시보드 API 함수
│   │   │   ├── hooks.ts         # 커스텀 훅
│   │   │   └── index.ts         # Barrel export
│   │   └── page.tsx             # 단순 테스트 페이지
│   └── gallery/
│       └── page.tsx             # 대시보드 API를 사용하는 갤러리 페이지
└── components/
    ├── LottieLoading.tsx        # 로딩 컴포넌트
    └── ApiExampleUsage.tsx      # API 사용 예제
```

## 로딩 상태 처리

모든 API 호출에서 `LottieLoading` 컴포넌트를 사용하여 로딩 상태를 표시합니다.

```typescript
import LottieLoading from '@/components/LottieLoading';

if (isLoading) {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <LottieLoading text="데이터를 불러오는 중이에요!" />
    </div>
  );
}
```

## 에러 처리

API 에러는 사용자 친화적인 메시지와 함께 처리됩니다.

```typescript
if (error) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <p className="text-lg text-gray-600">데이터를 불러오는 중 오류가 발생했습니다.</p>
      <button onClick={() => window.location.reload()}>
        다시 시도
      </button>
    </div>
  );
}
```

## 개발 환경 설정

개발 환경에서는 Mock 데이터를 사용하여 백엔드 없이도 개발할 수 있습니다.

```typescript
// src/lib/mockData.ts
export const USE_MOCK_DATA = process.env.NODE_ENV === 'development';
```

## 테스트

API 통합을 테스트하려면 `/api-test` 페이지를 방문하세요.

## 추가 정보

- **인증**: 현재 인증이 필요하지 않습니다.
- **에러 형식**: 표준 HTTP 상태 코드를 사용합니다.
- **캐싱**: TanStack Query가 자동으로 캐싱을 처리합니다.
- **재시도**: 실패한 요청은 자동으로 3번까지 재시도됩니다.

## 사용 예제

### 핑계 상세 페이지
```typescript
// src/app/share/[excuseId]/page.tsx
export default function SharePage({ params }: { params: { excuseId: string } }) {
  const { data, isLoading, error } = useExcuseDetail(params.excuseId);
  
  if (isLoading) return <LottieLoading text="핑계를 불러오는 중..." />;
  if (error) return <div>에러가 발생했습니다.</div>;
  
  return <div>{data?.excuse.excuse}</div>;
}
```

### 갤러리 페이지 (대시보드 API 사용)
```typescript
// src/app/gallery/page.tsx
export default function GalleryPage() {
  const { data, isLoading, error } = useDashboard();
  
  if (isLoading) return <LottieLoading text="갤러리를 불러오는 중..." />;
  if (error) return <div>에러가 발생했습니다.</div>;
  
  return (
    <div>
      <StatsGrid data={data} />
      {/* 차트 컴포넌트들 */}
    </div>
  );
}
``` 