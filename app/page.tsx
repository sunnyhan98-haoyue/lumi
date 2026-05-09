import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] px-6">
      <div className="mx-auto flex min-h-screen w-full max-w-[600px] flex-col items-center justify-center text-center">
        <p className="mb-10 text-2xl font-semibold tracking-tight text-[#185FA5]">
          Lumi
        </p>

        <h1 className="mb-4 text-[36px] font-semibold leading-tight text-[#1F2937]">
          让你的留学申请，每一步都有节奏。
        </h1>

        <p className="mb-12 text-[16px] leading-7 text-[#9CA3AF]">
          追踪所有 ddl，看清下一步要做什么。
        </p>

        <Link
          href="/plan"
          className="inline-flex items-center gap-2 rounded-lg bg-[#111827] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#0B1220]"
        >
          开始规划
          <ArrowRight size={16} />
        </Link>
      </div>
    </main>
  );
}
