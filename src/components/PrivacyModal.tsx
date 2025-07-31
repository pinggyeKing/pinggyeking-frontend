import React from "react";
import { X, FileUser } from "lucide-react";
import CustomButton from "./Custombutton";

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PrivacyInfo = {
  collectionItems: [
    {
      title: "수집하는 정보",
      description: "서비스 개선을 위해 다음과 같은 익명 정보를 수집합니다.",
      items: [
        "이용현황: 핑계 생성 건수, 접속 시간대, 요일별 이용 패턴",
        "서비스 선택 패턴: 관계 유형(상사/친구/연인 등), 톤 선택, 재생성 횟수",
        "서비스 만족도: 이모티콘 평가(☺️😐😔), 이미지 카드 생성 여부",
        "상황 키워드: 개인 식별 정보 완전 제거 후 일반화된 키워드",
      ],
    },
    {
      title: "수집하지 않는 정보",
      description:
        "개인정보보호를 위해 다음과 같은 정보는 절대 수집하지 않습니다.",
      items: [
        "개인 식별 정보: 이름, 전화번호, 이메일, 주민등록번호",
        "민감한 개인 정보: 구체적인 개인 상황, 사생활 내용",
        "기술적 정보: IP 주소 원본, 기기 정보, 위치 정보",
        "추적 정보: 개인 식별 가능한 쿠기, 로그인 정보",
      ],
    },
    {
      title: "수집 목적",
      items: [
        "AI 서비스 개선 및 핑계 생성 품질 향상",
        "사용자 경험 최적화 및 UI/UX 개선",
        "서비스 안정성 및 시스템 성능 모니터링",
        "익명 통계를 통한 서비스 기능 확장",
      ],
    },
    {
      title: "보유 기간",
      items: [
        "서비스 제공 기간 동안 보관 (익명 통계 데이터)",
        "서비스 종료 시 모든 데이터 안전 삭제",
        "목적 달성 후 불필요한 데이터 즉시 삭제",
      ],
    },
    {
      title: "개인정보 보호 조치",
      items: [
        "수집 즉시 개인 식별 요소 완전 제거",
        "수집된 데이터 암호화 보관",
        "개발팀 내 최소 인원만 접근 권한 보유",
      ],
    },
    {
      title: "거부권 및 선택권",
      items: [
        "개인정보 수집을 원하지 않는 경우 언제든 거부 가능",
        "수집 거부시에도 기본 서비스는 정상 이용 가능",
        "수집 동의 철회 시 즉시 데이터 수집 중단",
      ],
    },
    {
      title: "문의 및 담당자",
      items: [
        "이메일: privacy@pinggyeking.com",
        "개인정보 보호책임자: 김핑계 (CPO)",
        "문의 시간: 평일 09:00~18:00",
        "처리 기간: 접수 후 7일 이내 회신",
      ],
    },
  ],
};

const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <>
      {/* 배경 오버레이 */}
      <div
        className="fixed inset-0 backdrop-blur-md z-50 flex items-center justify-center p-10"
        onClick={handleOverlayClick}
      >
        {/* 모달 컨테이너 */}
        <div className="w-[400px] h-[900px] bg-white radius-20 shadow-lg overflow-hidden flex flex-col">
          {/* 헤더 */}
          <div className="flex items-center justify-between bg-grey-10 p-4">
            <h2 className="text-section-title text-grey-0">
              핑계킹 개인정보 수집 안내
            </h2>
            <button
              onClick={onClose}
              className="p-1 hover:bg-grey-0 rounded-lg transition-colors"
            >
              <X size={24} className="text-grey-0" />
            </button>
          </div>

          {/* 메인 콘텐츠 영역 */}
          <div className="flex flex-1 gap-2 px-3 pt-2 overflow-hidden">
            {/* 스크롤 가능한 컨텐츠 영역 */}
            <div className="flex-1 overflow-y-auto max-h-full pr-2 custom-scrollbar">
              <div className="flex flex-col gap-2 pb-4">
                {/* 개인정보 수집 정책들 */}
                {PrivacyInfo.collectionItems.map((item, index) => (
                  <div key={index} className="p-4 radius-16 bg-grey-1">
                    <h3 className="text-group-title text-grey-10 mb-2">
                      {item.title}
                    </h3>

                    {item.description && (
                      <div className="border-l-[1.5px] radius-8 border-grey-8 bg-grey-0 px-2 py-1 mb-2">
                        <p className="text-group-subtitle text-grey-8">
                          {item.description}
                        </p>
                      </div>
                    )}

                    <div className="space-y-1">
                      {item.items.map((subItem, subIndex) => (
                        <p
                          key={subIndex}
                          className="text-body3-medium text-grey-7"
                        >
                          {subItem}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex flex-col items-center w-full p-6 border-t border-grey-4 gap-1">
                <div className="w-[231px]">
                  <CustomButton size="xsmall" leftIcon={<FileUser size={10} />}>
                    개인정보보호법ㆍ정보통신망법 준수
                  </CustomButton>
                </div>
                <div className="flex flex-row w-[326px] gap-1 text-grey-7">
                  <p className="text-body3-medium">
                    최종 수정일: 2025년 7월 12일
                  </p>
                  <div className="text-body3-regular">/</div>
                  <p className="text-body3-medium">시행일: 2025년 7월 12일</p>
                </div>
                <p className="text-body3-medium text-grey-8">
                  궁금한 사항이 있으시면 언제든 문의해 주세요!
                </p>
              </div>
            </div>
          </div>

          {/* 푸터 */}
          <div className="px-3 py-2 flex flex-col items-center gap-2">
            <CustomButton className="w-full" customRadius="radius-12">
              확인
            </CustomButton>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivacyModal;
