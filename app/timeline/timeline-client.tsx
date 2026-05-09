"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

function parseIds(idsParam: string | null): string[] {
  if (!idsParam) return [];
  return idsParam.split(",").map((id) => id.trim()).filter(Boolean);
}

export function TimelineClient() {
  const searchParams = useSearchParams();
  const ids = useMemo(
    () => parseIds(searchParams.get("ids")),
    [searchParams],
  );

  return (
    <div className="min-h-screen bg-[#F9FAFB] font-[family-name:var(--font-inter)]">
      <main className="mx-auto max-w-3xl px-6 py-12">
        <h1 className="mb-8 text-[28px] font-semibold leading-tight tracking-tight text-[#111827] sm:text-[32px]">
          时间线
        </h1>

        <p className="mb-6 text-[15px] text-gray-600">
          选中了{" "}
          <span className="font-semibold text-gray-900">{ids.length}</span>{" "}
          个项目
        </p>

        {ids.length > 0 ? (
          <ul className="mb-8 list-none space-y-2 pl-0">
            {ids.map((id) => (
              <li key={id} className="text-sm leading-relaxed text-gray-800">
                {id}
              </li>
            ))}
          </ul>
        ) : (
          <p className="mb-8 text-sm text-gray-500">暂无选中的项目 id。</p>
        )}

        <p className="mb-8 text-[15px] leading-relaxed text-gray-500">
          完整时间线视图正在开发中（Day 3 实现）
        </p>

        <Link
          href="/plan"
          className="inline-flex text-sm font-medium text-gray-700 underline decoration-gray-300 underline-offset-4 transition hover:text-gray-900"
        >
          返回项目选择
        </Link>
      </main>
    </div>
  );
}
