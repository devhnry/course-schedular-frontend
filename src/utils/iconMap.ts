import * as Icons from "lucide-react";
import {LucideIcon} from "lucide-react";

export const getLucideIcon = (iconName: string): LucideIcon => {
    const maybeIcon = Icons[iconName as keyof typeof Icons];

    if (maybeIcon && typeof maybeIcon === "function") {
        return maybeIcon as LucideIcon;
    }

    console.warn(`Icon "${iconName}" not found. Falling back to HelpCircle.`);
    return Icons.HelpCircle;
};
