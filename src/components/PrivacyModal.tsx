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
      title: "수집하는 개인정보",
      description: "서비스 개선을 위한 익명 통계 정보",
      items: [
        "변명 생성 건수 및 이용 시간대",
        "관계 유형, 톤 선택 등 서비스 이용 패턴",
        "만족도 평가 결과",
        "개인정보를 제거한 일반화된 키워드",
      ],
    },
    {
      title: "수집하지 않는 정보",
      items: [
        "성명, 전화번호, 이메일 주소 등 개인식별정보",
        "작성하신 변명 내용의 원본",
        "IP 주소, 기기 정보, 위치 정보",
        "기타 개인을 식별할 수 있는 모든 정보",
      ],
    },
    {
      title: "개인정보의 처리 목적",
      items: [
        "AI 기반 변명 생성 서비스 품질 향상",
        "사용자 경험 개선 및 서비스 기능 최적화",
        "서비스 안정성 향상",
      ],
    },
    {
      title: "개인정보의 처리 및 보유 기간",
      items: [
        "보유기간: 서비스 제공 기간",
        "서비스 종료 시 수집된 모든 정보 즉시 파기",
        "관련 법령에 따라 보존이 필요한 경우 해당 기간 동안 보관 후 파기",
      ],
    },
    {
      title: "정보주체의 권리·의무 및 행사방법",
      items: [
        "개인정보 수집·이용에 대한 동의를 거부할 권리가 있습니다",
        "동의 거부 시에도 서비스 이용에 제한이 없습니다",
        "수집에 동의한 경우라도 언제든지 동의를 철회할 수 있습니다",
      ],
    },
    {
      title: "개인정보 관련 문의",
      items: [
        "이메일: contact@byeongmyeong-lab.com",
        "처리기간: 문의 접수 후 7일 이내",
      ],
    },
    {
      title: "기타",
      items: [
        "본 방침은 개인정보보호법, 정보통신망 이용촉진 및 정보보호 등에 관한 법률에 따라 작성되었습니다.",
      ],
    },
  ],
  postingDate: [
    {
      title: "최종 수정일",
      Date: "2025.07.12",
    },
  ],
  effectiveDate: [
    {
      title: "시행일",
      Date: "2025.07.12",
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
        className="fixed inset-0 z-50 flex items-center justify-center p-6"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
        }}
        onClick={handleOverlayClick}
      >
        {/* 모달 컨테이너 */}
        <div className="w-full h-[75%] bg-white radius-20 shadow-lg overflow-hidden flex flex-col">
          {/* 헤더 */}
          <div className="flex items-center justify-between bg-grey-10 p-4">
            <h2 className="text-section-title text-grey-0">
              변명연구소 개인정보 수집 안내
            </h2>
            <button
              onClick={onClose}
              className="p-1 hover:bg-grey-0 rounded-lg transition-colors"
            >
              <X size={24} className="text-grey-0" />
            </button>
          </div>

          {/* 메인 콘텐츠 영역 */}
          <div className="flex flex-1 gap-2 pl-3 pr-1 pt-2 overflow-hidden">
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
              <div className="flex flex-col items-center w-full px-4 py-6 border-t border-grey-4 gap-1 text-center">
                <div className="w-full flex flex-row items-center px-2.5 py-1 gap-1 radius-16 bg-grey-2">
                  <FileUser size={18} className="text-grey-10" />
                  <p className="text-body3-semibold text-grey-10 text-center">
                    개인정보보호법ㆍ정보통신망법 준수
                  </p>
                </div>
                <div className="flex flex-row items-center gap-2 text-grey-7">
                  {PrivacyInfo.postingDate.map((item, index) => (
                    <p key={index} className="text-body3-medium">
                      {item.title}: {item.Date}
                    </p>
                  ))}
                  <div className="text-body3-regular">|</div>
                  {PrivacyInfo.effectiveDate.map((item, index) => (
                    <p key={index} className="text-body3-medium">
                      {item.title}: {item.Date}
                    </p>
                  ))}
                </div>
                <p className="text-body3-medium text-grey-8">
                  궁금한 사항이 있으시면 언제든 문의해 주세요!
                </p>
              </div>
            </div>
          </div>

          {/* 푸터 */}
          <div className="px-3 py-2 flex flex-col items-center gap-2">
            <CustomButton
              className="w-full"
              customRadius="radius-12"
              onClick={handleOverlayClick}
            >
              확인
            </CustomButton>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivacyModal;
