"use client";

import React from "react";
import { UserRole } from "@/types/match";
import { USER_ROLES_CONFIG } from "@/lib/data/get-tournament-data";
import { Shield } from "lucide-react";

interface RoleIndicatorBadgeProps {
  currentRole: UserRole;
  onOpenRoleModal?: () => void;
}

export default function RoleIndicatorBadge({ currentRole }: RoleIndicatorBadgeProps) {
  const config = USER_ROLES_CONFIG[currentRole] || USER_ROLES_CONFIG.USER;

  return (
    <div className="bg-white border border-[#f0f0f0] rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-[#f5f5f5] border border-[#e5e5e5] flex items-center justify-center text-[#222222]">
          <Shield className="w-5 h-5" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#666666] font-medium">Perspektif Role Aktif:</span>
            <span className={`text-xs font-bold px-2 py-0.5 rounded border ${config.badgeColor}`}>
              {config.label}
            </span>
          </div>
          <p className="text-xs text-[#4b5563] mt-0.5">
            {config.description}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-1.5 self-end sm:self-center">
        {config.allowedActions.slice(0, 3).map((act, i) => (
          <span
            key={i}
            className="text-[11px] px-2.5 py-1 rounded-md bg-[#f9fafb] border border-[#e5e7eb] text-[#374151] font-semibold whitespace-nowrap"
          >
            ✓ {act}
          </span>
        ))}
      </div>
    </div>
  );
}
