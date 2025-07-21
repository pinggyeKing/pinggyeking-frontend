import React from "react";
import clsx from "clsx";

export type TabIndicatorValue = "login" | "signup";

interface TabIndicatorProps {
  value: TabIndicatorValue;
  onChange: (value: TabIndicatorValue) => void;
  className?: string;
  labels?: { login: string; signup: string };
}

const TabIndicator: React.FC<TabIndicatorProps> = ({
  value,
  onChange,
  className,
  labels = { login: "로그인", signup: "회원가입" },
}) => {
  return (
    <div
      className={clsx(
        "flex w-fit bg-grey-1 radius-8 border border-grey-1 shadow-main",
        className
      )}
    >
      <button
        type="button"
        className={clsx(
          "px-6 py-3 text-section-subtitle radius-8 transition-all",
          value === "login"
            ? "bg-grey-0 text-grey-10 shadow-sub"
            : "bg-transparent text-grey-6"
        )}
        onClick={() => onChange("login")}
      >
        {labels.login}
      </button>
      <button
        type="button"
        className={clsx(
          "px-6 py-3 text-section-subtitle radius-8 transition-all",
          value === "signup"
            ? "bg-grey-0 text-grey-10 shadow-sub"
            : "bg-transparent text-grey-6"
        )}
        onClick={() => onChange("signup")}
      >
        {labels.signup}
      </button>
    </div>
  );
};

export default TabIndicator;
