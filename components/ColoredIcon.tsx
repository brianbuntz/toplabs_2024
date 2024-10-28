// components/ColoredIcon.tsx
import React from "react";
import { LucideIcon } from "lucide-react";

interface ColoredIconProps {
  Icon: LucideIcon;
  color: "blue" | "purple" | "primary" | "secondary" | "green"; // Added 'green'
  className?: string;
}

const ColoredIcon: React.FC<ColoredIconProps> = ({
  Icon,
  color,
  className = "",
}) => {
  let colorClass: string;

  switch (color) {
    case "blue":
    case "primary":
      colorClass = "text-primary-new";
      break;
    case "purple":
    case "secondary":
      colorClass = "text-secondary-new";
      break;
    case "green": // Handle 'green'
      colorClass = "text-green-500"; // Use appropriate Tailwind CSS class
      break;
    default:
      colorClass = "text-gray-400"; // Fallback color
  }

  return <Icon className={`${colorClass} ${className}`} />;
};

export default ColoredIcon;
