import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { BANK_EXAMS, getExamBySlug } from "@/config/bank-exams";
import { ExamJsonLd } from "@/components/seo/ExamJsonLd";
import { AdBanner } from "@/components/ads/AdBanner";
import { EdTechPartners } from "@/components/affiliates/EdTechPartners";
import {
  Sparkles,
  Clock,
  Target,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  HelpCircle,
  Play,
  Layers,
  Award,
  ChevronRight,
} from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BANK_EXAMS.map((exam) => ({
    slug: exam.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const exam = getExamBySlug(slug);
  if (!exam) return {};

  return {
    title: exam.metaTitle,
    description: exam.metaDescription,
    keywords: exam.keywords,
    alternates: {
      canonical: `https://testprime.app/mock-test/${exam.slug}`,
    },
    openGraph: {
      title: exam.metaTitle,
      description: exam.metaDescription,
      type: "website",
      url: `https://testprime.app/mock-test/${exam.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: exam.metaTitle,
      description: exam.metaDescription,
    },
  };
}

export default async function MockTestHubPage({ params }: PageProps) {
  const { slug } = await params;
  const exam = getExamBySlug(slug);

  if (!exam) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-24 selection:bg-cyan-500 selection:text-black">
      {/* Schema Injection */}
      <ExamJsonLd exam={exam} />

      {/* Header */}
      <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-xl border-b border-white/10 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 font-mono font-bold text-cyan-400">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-slate-950 font-black text-sm">
            TP
          </div>
          <span>TestPrime</span>
        </Link>

        <div className="flex items-center gap-3">
          <Link
            href="/exam/sbi-po-prelims-mock-1"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-slate-950 font-bold font-mono text-xs sm:text-sm hover:opacity-90 transition-all shadow-md active:scale-95"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Launch Mock Test</span>
          </Link>
        </div>
      </header>

      {/* Breadcrumbs */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 flex items-center gap-2 text-xs font-mono text-slate-400">
        <Link href="/" className="hover:text-cyan-400 transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3 h-3" />
        <span>Mock Tests</span>
        <ChevronRight className="w-3 h-3" />
        <span className="text-white font-semibold">{exam.name}</span>
      </div>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 space-y-12">
        {/* Hero Section */}
        <div className="relative overflow-hidden p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 border border-white/10 shadow-2xl text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>{exam.examBody} • Official TCS iON Interface Simulation</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white font-mono max-w-3xl mx-auto leading-tight">
            {exam.name} Free Mock Test 2026
          </h1>

          <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
            {exam.tagline}
          </p>

          {/* Key Metric Highlights */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto pt-2">
            <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-white/5 font-mono">
              <div className="text-xs text-slate-400">Total Marks</div>
              <div className="text-lg sm:text-xl font-bold text-white">{exam.totalMarks}</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-white/5 font-mono">
              <div className="text-xs text-slate-400">Duration</div>
              <div className="text-lg sm:text-xl font-bold text-cyan-400">{exam.totalDurationMinutes} Mins</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-white/5 font-mono">
              <div className="text-xs text-slate-400">Sections</div>
              <div className="text-lg sm:text-xl font-bold text-white">{exam.sections.length} Locked</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-white/5 font-mono">
              <div className="text-xs text-slate-400">Negative Mark</div>
              <div className="text-lg sm:text-xl font-bold text-rose-400">-0.25</div>
            </div>
          </div>

          {/* Direct CTA */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/exam/sbi-po-prelims-mock-1"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-slate-950 font-bold font-mono text-base hover:opacity-95 shadow-xl shadow-cyan-500/25 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Start Real CBT Mock Test (Free)</span>
            </Link>
            <Link
              href="/create"
              className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-mono text-sm font-semibold transition-colors flex items-center justify-center gap-2"
            >
              <span>Upload Custom DPP / Notes</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Leaderboard Ad Slot */}
        <div className="flex justify-center">
          <AdBanner format="leaderboard" slot={`${exam.slug}-top-leaderboard`} />
        </div>

        {/* Sectional Pattern Table */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 font-mono font-bold text-lg text-white">
            <Layers className="w-5 h-5 text-cyan-400" />
            <h2>{exam.name} Exam Pattern & Sectional Timing</h2>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-white/10 bg-slate-900/60">
            <table className="w-full text-left font-mono text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-white/10 bg-slate-950/80 text-slate-400">
                  <th className="p-4">Section Name</th>
                  <th className="p-4 text-center">Questions</th>
                  <th className="p-4 text-center">Maximum Marks</th>
                  <th className="p-4 text-center">Sectional Duration</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-slate-300">
                {exam.sections.map((sec, idx) => (
                  <tr key={idx} className="hover:bg-white/5 transition-colors">
                    <td className="p-4 font-semibold text-white">{sec.name}</td>
                    <td className="p-4 text-center">{sec.questions}</td>
                    <td className="p-4 text-center">{sec.marks}</td>
                    <td className="p-4 text-center text-cyan-400 font-bold">{sec.durationMinutes} Minutes</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Cutoff & Strategy Insight */}
        <section className="p-6 sm:p-8 rounded-3xl bg-slate-900/40 border border-white/10 space-y-4">
          <div className="flex items-center gap-2 font-mono font-bold text-base text-white">
            <Target className="w-5 h-5 text-amber-400" />
            <h3>Expected Cutoff & Target Attempt Strategy</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm font-mono text-slate-300">
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-white/5">
              <span className="text-slate-400 block mb-1">Expected Safe Score:</span>
              <span className="text-base font-bold text-emerald-400">{exam.expectedCutoff}</span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-white/5">
              <span className="text-slate-400 block mb-1">Negative Marking Rule:</span>
              <span className="text-base font-bold text-rose-400">{exam.negativeMarking}</span>
            </div>
          </div>
        </section>

        {/* TestPrime vs Paid Test Series Comparison Matrix */}
        <section className="p-6 sm:p-8 rounded-3xl bg-slate-900/50 border border-white/10 space-y-4">
          <h2 className="text-lg font-bold text-white font-mono text-center">
            TestPrime vs. Paid Test Series (Testbook, Oliveboard, Adda247)
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-white/10 text-slate-400">
                  <th className="pb-3">Feature</th>
                  <th className="pb-3 text-cyan-400 font-bold">TestPrime (Free)</th>
                  <th className="pb-3">Overpriced Paid Portals</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-slate-300">
                <tr>
                  <td className="py-3">TCS iON Console Authenticity</td>
                  <td className="py-3 text-emerald-400 font-bold">100% Real Exam Layout + Dual Split View</td>
                  <td className="py-3 text-slate-500">Often custom web quiz layouts</td>
                </tr>
                <tr>
                  <td className="py-3">Sectional 20-Min Lock</td>
                  <td className="py-3 text-emerald-400 font-bold">Exact Timer Auto-Submit</td>
                  <td className="py-3 text-slate-400">Available behind paywall</td>
                </tr>
                <tr>
                  <td className="py-3">Custom PDF/DPP Generator</td>
                  <td className="py-3 text-emerald-400 font-bold">Convert any notes into CBT mock test</td>
                  <td className="py-3 text-rose-400">Not supported (Fixed question banks only)</td>
                </tr>
                <tr>
                  <td className="py-3">Subscription Fee</td>
                  <td className="py-3 text-emerald-400 font-bold">₹0 Free Open-Source</td>
                  <td className="py-3 text-rose-400">₹799 - ₹2,999 / year</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* EdTech Affiliate Deals */}
        <EdTechPartners examName={exam.name} />

        {/* FAQs */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 font-mono font-bold text-lg text-white">
            <HelpCircle className="w-5 h-5 text-cyan-400" />
            <h2>Frequently Asked Questions ({exam.name})</h2>
          </div>
          <div className="space-y-3">
            {exam.faqs.map((faq, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-slate-900/60 border border-white/10 space-y-2"
              >
                <h3 className="font-bold text-sm text-white font-mono">
                  {faq.question}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom Banner */}
        <div className="flex justify-center">
          <AdBanner format="leaderboard" slot={`${exam.slug}-bottom-leaderboard`} />
        </div>
      </main>
    </div>
  );
}
