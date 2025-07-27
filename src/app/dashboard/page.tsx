import React from "react";

function Dashboard() {
  const [pickerValue, setPickerValue] = React.useState("a");
  const pickerOptions = [
    { label: "옵션 A", value: "a" },
    { label: "옵션 B", value: "b" },
    { label: "옵션 C (비활성화)", value: "c", disabled: true },
    { label: "옵션 D", value: "d" },
  ];

  return (
    <div>
      <div className="text-extra-title">온글잎 PDH 테스트</div>
      <div className="text-screen-subtitle">온글잎 RDO 테스트</div>
      <div className="text-group-title">Pretendard 테스트</div>
    </div>
  );
}

export default Dashboard;
