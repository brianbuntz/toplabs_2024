// components/InfoItem.tsx
import React from "react";
import { LucideIcon } from "lucide-react";

export type InfoItemColor = "blue" | "purple";

export interface InfoItemProps {
  Icon: LucideIcon;
  color: InfoItemColor;
  label: string;
  href?: string;
}

const InfoItem: React.FC<InfoItemProps> = ({ Icon, color, label, href }) => {
  const content = (
    <>
      <Icon className={`text-${color}-500`} size={24} aria-hidden="true" />
      <div className="flex flex-col">
        <span className="text-gray-300">{label}</span>
      </div>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
      >
        {content}
      </a>
    );
  }

  return <div className="flex items-center space-x-2">{content}</div>;
};

export default InfoItem;
