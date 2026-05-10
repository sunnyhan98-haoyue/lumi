"use client";

import { AlertCircle } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { PROGRAMS, type Program } from "@/lib/programs";

function parseIds(idsParam: string | null): string[] {
  if (!idsParam) return [];
  return idsParam
    .split(",")
    .map((id) => id.trim())
    .filter(Boolean);
}

function getDaysUntil(deadline: Date, now: Date): number {
  return Math.ceil(
    (deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24),
  );
}

function formatDeadline(deadline: Date): string {
  return deadline.toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
}

export function TimelineClient() {
  const searchParams = useSearchParams();
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
  }, []);

  const ids = useMemo(
    () => parseIds(searchParams.get("ids")),
    [searchParams],
  );
  const selectedPrograms = useMemo(() => {
    if (ids.length === 0) return [];
    const idSet = new Set(ids);
    return PROGRAMS.filter((program) => idSet.has(program.id)).sort(
      (a, b) => a.deadline.getTime() - b.deadline.getTime(),
    );
  }, [ids]);

  const hasSelection = selectedPrograms.length > 0;

  const nearestProgram = selectedPrograms[0];
  const nearestDays = now && nearestProgram ? getDaysUntil(nearestProgram.deadline, now) : null;
  const uniqueProjectCount = useMemo(() => {
    const projectKeys = new Set(
      selectedPrograms.map((program) => `${program.school}|${program.programShort}`),
    );
    return projectKeys.size;
  }, [selectedPrograms]);
  const upcoming30Count = useMemo(() => {
    if (!now) return 0;
    return selectedPrograms.filter((program) => {
      const days = getDaysUntil(program.deadline, now);
      return days >= 0 && days <= 30;
    }).length;
  }, [selectedPrograms, now]);

  const renderRoundCard = (program: Program, index: number) => {
    const isNearest = index === 0;
    const daysUntil = now ? getDaysUntil(program.deadline, now) : null;

    return (
      <div
        key={program.id}
        className="mb-2.5 rounded-r-lg border-l-2"
        style={{
          backgroundColor: isNearest ? "#E6F1FB" : "#F9FAFB",
          borderLeftColor: isNearest ? "#185FA5" : "#E5E7EB",
        }}
      >
        <div className="flex items-center justify-between px-4 py-3">
          <div
            className="text-sm font-medium"
            style={{ color: isNearest ? "#0C447C" : "#111827" }}
          >
            {program.school} · {program.programShort}
          </div>
          <div
            className="rounded-full px-2 py-0.5 text-[11px]"
            style={{
              backgroundColor: isNearest ? "#B5D4F4" : "#E5E7EB",
              color: isNearest ? "#0C447C" : "#4B5563",
            }}
          >
            {program.round} · 还有 {daysUntil ?? "--"} 天
          </div>
        </div>
        <div
          className="px-4 pb-3 text-xs"
          style={{ color: isNearest ? "#185FA5" : "#6B7280" }}
        >
          {formatDeadline(program.deadline)} · 推荐信 {program.recLetters} · Essay{" "}
          {program.essays} · 视频 {program.video ? "是" : "否"}
        </div>
      </div>
    );
  };

  if (!hasSelection) {
    return (
      <div className="min-h-screen bg-white font-[family-name:var(--font-inter)]">
        <main className="mx-auto flex max-w-3xl items-center justify-center px-6 py-8">
          <div className="text-center">
            <p className="text-sm text-gray-600">还没选择项目</p>
            <Link
              href="/plan"
              className="mt-4 inline-flex rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800"
            >
              去选择项目 →
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-[family-name:var(--font-inter)]">
      <main className="mx-auto max-w-3xl px-6 py-8">
        <header className="flex h-14 items-center justify-between border-b border-gray-200">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <div className="flex h-[22px] w-[22px] items-center justify-center rounded-[4px] bg-[#185FA5] text-xs font-semibold text-white">
              L
            </div>
            <span> / 我的时间线</span>
          </div>
          <div className="text-xs text-gray-500">Sunny Han</div>
        </header>

        <section className="py-8">
          <div className="mb-1.5 text-[13px] text-gray-500">距离最近的 ddl</div>
          <div className="flex items-baseline">
            <div className="text-[48px] font-medium leading-none text-gray-900">
              {nearestDays ?? "--"}
            </div>
            <div className="ml-1 text-sm text-gray-500">天</div>
            <div className="ml-[10px] text-[13px] text-gray-500">
              · {nearestProgram.programShort} · {nearestProgram.round}
            </div>
          </div>
        </section>

        <section className="mb-8 mt-2 grid grid-cols-3 gap-3">
          <div className="rounded-lg bg-gray-50 px-3 py-4">
            <div className="text-[11px] text-gray-500">已选项目</div>
            <div className="mt-1 text-[18px] font-medium text-gray-900">
              {uniqueProjectCount}
            </div>
          </div>
          <div className="rounded-lg bg-gray-50 px-3 py-4">
            <div className="text-[11px] text-gray-500">本月 ddl</div>
            <div className="mt-1 text-[18px] font-medium text-gray-900">
              {upcoming30Count}
            </div>
          </div>
          <div className="rounded-lg bg-gray-50 px-3 py-4">
            <div className="text-[11px] text-gray-500">完成度</div>
            <div className="mt-1 text-[18px] font-medium text-gray-900">42%</div>
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between pb-2">
            <div className="text-sm font-medium text-gray-900">2026 申请时间线</div>
            <div className="text-xs text-gray-500">按 ddl 排序</div>
          </div>
          <div>{selectedPrograms.map(renderRoundCard)}</div>
        </section>

        <section className="mt-8">
          <Link
            href="/consult"
            className="flex cursor-pointer items-center gap-3 rounded-lg border p-[14px] transition hover:bg-blue-100"
            style={{ borderColor: "#185FA5", backgroundColor: "#E6F1FB" }}
          >
            <div
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
              style={{ backgroundColor: "#B5D4F4" }}
            >
              <AlertCircle size={16} color="#0C447C" />
            </div>
            <div className="flex-1">
              <div className="text-[13px] font-medium" style={{ color: "#0C447C" }}>
                你的 {nearestProgram.programShort} ddl 临近，材料还未完整
              </div>
              <div className="mt-0.5 text-xs" style={{ color: "#185FA5" }}>
                需要专业指导？预约轻录顾问免费评估 →
              </div>
            </div>
          </Link>
        </section>
      </main>
    </div>
  );
}
