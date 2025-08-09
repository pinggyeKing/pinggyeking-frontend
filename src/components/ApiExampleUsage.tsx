"use client";

import React from "react";
import { useExcuseDetail } from "@/app/share/api";
import { useGallery } from "@/app/gallery/api";
import LottieLoading from "@/components/LottieLoading";

// API 사용법 예제 컴포넌트
export default function ApiExampleUsage() {
  // 1. 핑계 상세 정보 조회 API 사용
  const {
    data: excuseData,
    isLoading: excuseLoading,
    error: excuseError,
  } = useExcuseDetail("sample-excuse-123");

  // 2. 대시보드 API 사용
  const {
    data: dashboardData,
    isLoading: dashboardLoading,
    error: dashboardError,
  } = useGallery();

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold">API 사용 예제</h1>

      {/* 핑계 상세 정보 API 예제 */}
      <div className="border p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">1. 핑계 상세 정보 API</h2>
        <p className="text-sm text-gray-600 mb-4">
          <code>useExcuseDetail(excuseId)</code> 훅을 사용하여 특정 핑계의 상세
          정보를 가져올 수 있습니다.
        </p>

        {excuseLoading && <LottieLoading text="핑계를 불러오는 중..." />}

        {excuseError && (
          <div className="text-red-600">에러: {excuseError.message}</div>
        )}

        {excuseData && (
          <div className="bg-gray-50 p-4 rounded">
            <h3 className="font-semibold">핑계 내용:</h3>
            <p>
              <strong>상황:</strong> {excuseData.situation}
            </p>
            <p>
              <strong>대상:</strong> {excuseData.target}
            </p>
            <p>
              <strong>톤:</strong> {excuseData.tone}
            </p>
            <p>
              <strong>핑계:</strong> {excuseData.excuse}
            </p>
          </div>
        )}
      </div>

      {/* 대시보드 API 예제 */}
      <div className="border p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">2. 대시보드 API</h2>
        <p className="text-sm text-gray-600 mb-4">
          <code>useDashboard()</code> 훅을 사용하여 대시보드 통계 정보를 가져올
          수 있습니다.
        </p>

        {dashboardLoading && <LottieLoading text="대시보드를 불러오는 중..." />}

        {dashboardError && (
          <div className="text-red-600">에러: {dashboardError.message}</div>
        )}

        {dashboardData && (
          <div className="bg-gray-50 p-4 rounded">
            <h3 className="font-semibold">대시보드 데이터:</h3>
            <p>
              <strong>전체 핑계 수:</strong> {dashboardData.totalExcuses}
            </p>
            <p>
              <strong>평균 만족도:</strong> {dashboardData.averageSatisfaction}
            </p>
            <p>
              <strong>재생성 비율:</strong> {dashboardData.regenerationRate}%
            </p>
            <p>
              <strong>피크타임:</strong> {dashboardData.peakTime.hour}시 (
              {dashboardData.peakTime.count}개)
            </p>
          </div>
        )}
      </div>

      {/* 사용법 가이드 */}
      <div className="border p-4 rounded-lg bg-blue-50">
        <h2 className="text-xl font-semibold mb-4">사용법 가이드</h2>
        <div className="space-y-2 text-sm">
          <p>
            <strong>1. 핑계 상세 조회:</strong>
          </p>
          <code className="block bg-white p-2 rounded">
            {`import { useExcuseDetail } from '@/app/share/api';
const { data, isLoading, error } = useExcuseDetail('excuse-id');`}
          </code>

          <p>
            <strong>2. 대시보드 조회:</strong>
          </p>
          <code className="block bg-white p-2 rounded">
            {`import { useDashboard } from '@/app/dashboard/api';
const { data, isLoading, error } = useDashboard();`}
          </code>

          <p>
            <strong>3. 로딩 컴포넌트 사용:</strong>
          </p>
          <code className="block bg-white p-2 rounded">
            {`import LottieLoading from '@/components/LottieLoading';
{isLoading && <LottieLoading text="로딩 중..." />}`}
          </code>
        </div>
      </div>
    </div>
  );
}
