"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Check, ChevronDown, ChevronUp } from "lucide-react";
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

type ProjectGroup = {
  projectKey: string;
  school: string;
  programShort: string;
  rounds: Program[];
};

function getProjectKey(programId: string): string {
  return programId.replace(/-r\d+$/i, "");
}

function getRoundOrder(round: string): number {
  const matched = round.match(/\d+/);
  return matched ? Number(matched[0]) : Number.POSITIVE_INFINITY;
}

function groupByProject(programs: Program[]): ProjectGroup[] {
  const grouped = new Map<string, ProjectGroup>();

  for (const program of programs) {
    const projectKey = getProjectKey(program.id);
    const current = grouped.get(projectKey);

    if (current) {
      current.rounds.push(program);
      continue;
    }

    grouped.set(projectKey, {
      projectKey,
      school: program.school,
      programShort: program.programShort,
      rounds: [program],
    });
  }

  return [...grouped.values()]
    .map((group) => ({
      ...group,
      rounds: [...group.rounds].sort(
        (a, b) => getRoundOrder(a.round) - getRoundOrder(b.round),
      ),
    }))
    .sort((a, b) => a.rounds[0].deadline.getTime() - b.rounds[0].deadline.getTime());
}

export default function PlanPage() {
  const router = useRouter();
  const projectGroups = useMemo(() => groupByProject(PROGRAMS), []);

  const [selectedIds, setSelectedIds] = useState<Set<string>>(() => new Set());
  const [expandedProjectKeys, setExpandedProjectKeys] = useState<Set<string>>(
    () => new Set(),
  );

  function toggleId(id: string) {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleProjectExpand(projectKey: string) {
    setExpandedProjectKeys((prev) => {
      const next = new Set(prev);
      if (next.has(projectKey)) next.delete(projectKey);
      else next.add(projectKey);
      return next;
    });
  }

  const selectedRoundCount = selectedIds.size;
  const selectedProjectCount = projectGroups.reduce((count, group) => {
    return group.rounds.some((round) => selectedIds.has(round.id)) ? count + 1 : count;
  }, 0);
  const canViewTimeline = selectedRoundCount > 0;

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

        <div className="grid grid-cols-1 items-start gap-3 md:grid-cols-2 lg:grid-cols-2">
          {projectGroups.map((group) => (
            <ProjectCard
              key={group.projectKey}
              group={group}
              selectedIds={selectedIds}
              expanded={expandedProjectKeys.has(group.projectKey)}
              onToggleExpand={() => toggleProjectExpand(group.projectKey)}
              onToggleRound={toggleId}
            />
          ))}
        </div>
      </main>

      <div className="fixed bottom-0 left-0 right-0 border-t border-gray-200 bg-white px-6 py-4 shadow-[0_-4px_24px_-8px_rgba(0,0,0,0.08)]">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4">
          <p className="text-sm text-gray-600">
            已选{" "}
            <span className="font-semibold text-gray-900">{selectedProjectCount}</span>{" "}
            个项目，共{" "}
            <span className="font-semibold text-gray-900">{selectedRoundCount}</span>{" "}
            个轮次
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

function ProjectCard({
  group,
  selectedIds,
  expanded,
  onToggleExpand,
  onToggleRound,
}: {
  group: ProjectGroup;
  selectedIds: Set<string>;
  expanded: boolean;
  onToggleExpand: () => void;
  onToggleRound: (id: string) => void;
}) {
  const earliestRound = group.rounds[0];
  const selectedCount = group.rounds.filter((round) => selectedIds.has(round.id)).length;
  const earliestFormatted = earliestRound.deadline.toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const earliestDaysLabel = formatDaysLabel(daysRelativeToToday(earliestRound.deadline));

  return (
    <article
      className="overflow-hidden rounded-xl border border-gray-200 bg-white transition-colors duration-200"
    >
      <div
        role="button"
        tabIndex={0}
        onClick={onToggleExpand}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onToggleExpand();
          }
        }}
        className="cursor-pointer px-4 py-4"
      >
        <div className="flex items-start justify-between gap-3">
          <span className="text-[16px] font-semibold leading-snug text-gray-900">
            {group.school}
          </span>
          <div className="flex items-center gap-2">
            {selectedCount > 0 ? (
              <span className="shrink-0 rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-700">
                已选 {selectedCount} 轮
              </span>
            ) : null}
            <span className="text-gray-400" aria-hidden>
              {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </span>
          </div>
        </div>

        <p className="mt-2 text-[14px] leading-snug text-gray-700">
          {group.programShort} · {group.rounds.length} 个轮次
        </p>

        <div className="mt-4 flex flex-wrap items-baseline gap-x-2 gap-y-1 text-sm">
          <span className="text-gray-900">{earliestFormatted}</span>
          <span className="text-xs text-gray-400">{earliestDaysLabel}</span>
        </div>
      </div>

      <div
        className={[
          "overflow-hidden border-gray-100 transition-all duration-200",
          expanded ? "max-h-[420px] border-t opacity-100" : "max-h-0 opacity-0",
        ].join(" ")}
      >
        <div className="bg-gray-50/30">
          {group.rounds.map((round) => {
            const checked = selectedIds.has(round.id);
            const dateText = round.deadline.toLocaleDateString("zh-CN", {
              year: "numeric",
              month: "long",
              day: "numeric",
            });
            const daysText = formatDaysLabel(daysRelativeToToday(round.deadline));

            return (
              <div
                key={round.id}
                role="checkbox"
                aria-checked={checked}
                tabIndex={0}
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleRound(round.id);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    e.stopPropagation();
                    onToggleRound(round.id);
                  }
                }}
                className="flex cursor-pointer items-center gap-3 px-4 py-3 transition-colors hover:bg-gray-50"
              >
                <span
                  className={[
                    "inline-flex h-5 w-5 items-center justify-center rounded-full border-2",
                    checked
                      ? "border-blue-600 bg-blue-600 text-white"
                      : "border-gray-300 bg-white text-transparent",
                  ].join(" ")}
                  aria-hidden
                >
                  <Check size={12} strokeWidth={3} />
                </span>
                <div className="min-w-0">
                  <p className="text-sm text-gray-900">
                    <span className="mr-2 font-semibold">{round.round}</span>
                    <span>{dateText}</span>
                  </p>
                  <p className="text-xs text-gray-400">{daysText}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </article>
  );
}
