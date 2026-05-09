"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { PROGRAMS, type Program } from "@/lib/programs";

function daysRelativeToToday(deadline: Date): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const d = new Date(deadline);
  d.setHours(0, 0, 0, 0);
  return Math.round((d.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
}

function formatDaysLabel(days: number): string {
  if (days === 0) return "今天截止";
  if (days > 0) return `还有 ${days} 天`;
  return `已过去 ${Math.abs(days)} 天`;
}

export default function PlanPage() {
  const router = useRouter();
  const sortedPrograms = useMemo(
    () => [...PROGRAMS].sort((a, b) => a.deadline.getTime() - b.deadline.getTime()),
    [],
  );

  const [selectedIds, setSelectedIds] = useState<Set<string>>(() => new Set());

  function toggleId(id: string) {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  const count = selectedIds.size;
  const canViewTimeline = count > 0;

  function goTimeline() {
    if (!canViewTimeline) return;
    const qs = [...selectedIds].sort().join(",");
    router.push(`/timeline?ids=${qs}`);
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB] pb-28 font-[family-name:var(--font-inter)]">
      <main className="mx-auto max-w-3xl px-6 py-12">
        <div className="mb-12 text-center">
          <Link
            href="/"
            className="mb-10 inline-flex items-center gap-1 text-sm text-gray-500 transition hover:text-gray-800"
          >
            <ArrowLeft size={14} aria-hidden />
            返回首页
          </Link>
          <h1 className="mb-3 text-[28px] font-semibold leading-tight tracking-tight text-[#111827] sm:text-[32px]">
            选择你想申请的项目
          </h1>
          <p className="text-[15px] leading-relaxed text-gray-500">
            勾选下面的项目，我们会帮你生成时间线
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-2">
          {sortedPrograms.map((p) => (
            <ProgramCard
              key={p.id}
              program={p}
              selected={selectedIds.has(p.id)}
              onToggle={() => toggleId(p.id)}
            />
          ))}
        </div>
      </main>

      <div className="fixed bottom-0 left-0 right-0 border-t border-gray-200 bg-white px-6 py-4 shadow-[0_-4px_24px_-8px_rgba(0,0,0,0.08)]">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4">
          <p className="text-sm text-gray-600">
            已选 <span className="font-semibold text-gray-900">{count}</span> 个项目
          </p>
          <button
            type="button"
            disabled={!canViewTimeline}
            onClick={goTimeline}
            className="inline-flex items-center gap-2 rounded-lg bg-[#111827] px-5 py-2.5 text-sm font-medium text-white transition enabled:hover:bg-[#0B1220] disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400"
          >
            查看时间线
            <ArrowRight size={16} aria-hidden />
          </button>
        </div>
      </div>
    </div>
  );
}

function ProgramCard({
  program,
  selected,
  onToggle,
}: {
  program: Program;
  selected: boolean;
  onToggle: () => void;
}) {
  const formatted = program.deadline.toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const daysLabel = formatDaysLabel(daysRelativeToToday(program.deadline));

  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={selected}
      onClick={onToggle}
      className={[
        "relative w-full rounded-xl p-4 text-left transition-colors duration-200",
        selected
          ? "border-2 border-blue-600 bg-blue-50"
          : "border border-gray-200 bg-white hover:border-gray-300",
      ].join(" ")}
    >
      {selected ? (
        <span className="absolute right-3 top-3 text-blue-600" aria-hidden>
          <Check size={20} strokeWidth={2.5} />
        </span>
      ) : null}

      <div className="flex items-start justify-between gap-3 pr-7">
        <span className="text-[16px] font-semibold leading-snug text-gray-900">
          {program.school}
        </span>
        <span className="shrink-0 rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600">
          {program.round}
        </span>
      </div>

      <p className="mt-2 text-[14px] leading-snug text-gray-700">
        {program.programShort}
      </p>

      <div className="mt-4 flex flex-wrap items-baseline gap-x-2 gap-y-1 text-sm">
        <span className="text-gray-900">{formatted}</span>
        <span className="text-xs text-gray-400">{daysLabel}</span>
      </div>
    </button>
  );
}
