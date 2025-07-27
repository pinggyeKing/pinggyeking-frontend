import React from "react";
import clsx from "clsx";
import { Info, Check, TriangleAlert, X } from "lucide-react";

export type MessageType = "hint" | "success" | "warning" | "error";

interface MessageProps {
  type?: MessageType;
  message: string;
  className?: string;
}

const Message: React.FC<MessageProps> = ({
  type = "hint",
  message,
  className,
}) => {
  const getIcon = () => {
    switch (type) {
      case "success":
        return <Check size={14} />;
      case "warning":
        return <TriangleAlert size={14} />;
      case "error":
        return <X size={14} />;
      case "hint":
      default:
        return <Info size={14} />;
    }
  };

  const getStyles = () => {
    switch (type) {
      case "success":
        return {
          icon: "text-green-600",
          text: "text-green-600",
        };
      case "warning":
        return {
          icon: "text-yellow-600",
          text: "text-yellow-600",
        };
      case "error":
        return {
          icon: "text-red-600",
          text: "text-red-600",
        };
      case "hint":
      default:
        return {
          icon: "text-gray-600",
          text: "text-gray-600",
        };
    }
  };

  const styles = getStyles();

  return (
    <div className={clsx("flex items-center gap-1", className)}>
      <div className={clsx("flex-shrink-0", styles.icon)}>{getIcon()}</div>
      <span
        className={clsx("text-xs font-semibold leading-tight", styles.text)}
        style={{ width: "182px" }}
      >
        {message}
      </span>
    </div>
  );
};

export default Message;
