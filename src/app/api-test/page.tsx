"use client";

import React from "react";
import ApiExampleUsage from "@/components/ApiExampleUsage";

export default function ApiTestPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto py-8">
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            API 통합 테스트
          </h1>
          <div className="space-y-4 text-gray-600">
            <p>이 페이지는 구현된 API 통합을 테스트하고 사용법을 보여줍니다.</p>
            <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
              <h3 className="font-semibold text-blue-900 mb-2">구현된 API</h3>
              <ul className="text-blue-800 space-y-1">
                <li>
                  • <strong>핑계 상세 조회 API:</strong>{" "}
                  <code>/api/excuses/{"{excuseId}"}/detail</code>
                </li>
                <li>
                  • <strong>대시보드 API:</strong> <code>/api/dashboard</code>
                </li>
              </ul>
            </div>
            <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-400">
              <h3 className="font-semibold text-green-900 mb-2">사용된 기술</h3>
              <ul className="text-green-800 space-y-1">
                <li>
                  • <strong>Axios:</strong> HTTP 클라이언트
                </li>
                <li>
                  • <strong>TanStack Query:</strong> 서버 상태 관리
                </li>
                <li>
                  • <strong>LottieLoading:</strong> 로딩 상태 표시
                </li>
                <li>
                  • <strong>Mock Data:</strong> 개발 환경에서 테스트용 데이터
                </li>
              </ul>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
              <h3 className="font-semibold text-yellow-900 mb-2">개발 모드</h3>
              <p className="text-yellow-800">
                현재 개발 모드에서는 Mock 데이터를 사용합니다. 프로덕션
                환경에서는 실제 API (<code>49.50.133.127:8080</code>)에
                연결됩니다.
              </p>
            </div>
          </div>
        </div>

        <ApiExampleUsage />
      </div>
    </div>
  );
}
