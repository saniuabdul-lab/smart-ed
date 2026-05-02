import Link from "next/link";
import Logo from "@/components/shared/Logo";
import {
  BookOpen,
  Calendar,
  FileText,
  Lightbulb,
  ClipboardList,
  Lock,
  Star,
  Check,
} from "lucide-react";

export default function LandingPage() {
  const features = [
    {
      icon: BookOpen,
      title: "Curriculum Generator",
      desc: "Generate NERDC-aligned curriculum outlines for any class from Nursery 1 to SS3 in minutes.",
      limit: "3/week",
      color: "text-teal-600 bg-teal-50 border-teal-100",
    },
    {
      icon: Calendar,
      title: "Scheme of Work",
      desc: "Automated First Term schemes with weekly topics, objectives and evaluation strategies.",
      limit: "First Term only",
      color: "text-blue-600 bg-blue-50 border-blue-100",
    },
    {
      icon: FileText,
      title: "Lesson Plan Builder",
      desc: "Create structured lesson plans using the proven ABCD Objective Method.",
      limit: "8/month",
      color: "text-purple-600 bg-purple-50 border-purple-100",
    },
    {
      icon: Lightbulb,
      title: "Resource Suggestions",
      desc: "Discover low-cost, locally-sourced teaching aids and instructional materials.",
      limit: "10/month",
      color: "text-green-600 bg-green-50 border-green-100",
    },
    {
      icon: ClipboardList,
      title: "Assessment Generator",
      desc: "Generate 10 objective questions and 3 theory questions with answer keys.",
      limit: "6/month",
      color: "text-amber-600 bg-amber-50 border-amber-100",
    },
  ];

  const lockedFeatures = [
    "Advanced AI Curriculum Generator",
    "Full-Year Scheme of Work",
    "Premium Lesson Plans (5E + SMART)",
    "WAEC / NECO Exam Generator",
    "School Branding + Letterhead",
    "DOCX Export (no watermark)",
    "Teacher Management",
    "School Analytics Dashboard",
    "Bloom's Taxonomy Assessment",
    "Unlimited Generations",
  ];

  const testimonials = [
    {
      name: "Mrs. Adaeze Okonkwo",
      role: "Head of Curriculum, Greenfield Academy Lagos",
      text: "SMART-ED gave our teachers a solid foundation. Within 2 weeks we upgraded to Pro because the value was undeniable.",
      stars: 5,
    },
    {
      name: "Mr. Ibrahim Aliyu",
      role: "Principal, New Horizon Schools Abuja",
      text: "The lesson plan generator alone saved our teachers 3 hours per week. Nigerian curriculum context built right in.",
      stars: 5,
    },
    {
      name: "Mrs. Folake Adewumi",
      role: "School Proprietor, Bright Futures Ibadan",
      text: "I was skeptical about a free tool. SMART-ED proved me wrong. We upgraded the same month.",
      stars: 5,
    },
  ];

  const plans = [
    {
      name: "FREE",
      price: "₦0",
      period: "forever",
      badge: "Current Plan",
      badgeColor: "bg-teal-50 text-teal-600 border-teal-200",
      borderColor: "border-teal-200",
      features: [
        "5 core AI tools",
        "Limited monthly generations",
        "PDF export (watermarked)",
        "Nigerian + British curriculum",
        "Community support",
      ],
      cta: "Get Started Free",
      ctaStyle: "bg-teal-600 hover:bg-teal-700 text-white",
      popular: false,
    },
    {
      name: "STARTER",
      price: "₦18,000",
      period: "per term",
      badge: "Most Popular",
      badgeColor: "bg-amber-50 text-amber-600 border-amber-200",
      borderColor: "border-amber-300",
      features: [
        "Everything in Free",
        "Unlimited generations",
        "First + Second Term",
        "Clean PDF (no watermark)",
        "DOCX export",
        "Priority support",
      ],
      cta: "Upgrade to Starter",
      ctaStyle: "bg-amber-500 hover:bg-amber-600 text-gray-900",
      popular: true,
    },
    {
      name: "PROFESSIONAL",
      price: "₦45,000",
      period: "per term",
      badge: "Best Value",
      badgeColor: "bg-indigo-50 text-indigo-600 border-indigo-200",
      borderColor: "border-gray-200",
      features: [
        "Everything in Starter",
        "Full-year scheme of work",
        "All lesson plan methods",
        "WAEC/NECO style exams",
        "School branding",
        "Teacher management",
      ],
      cta: "Go Professional",
      ctaStyle: "bg-gray-900 hover:bg-gray-800 text-white",
      popular: false,
    },
  ];

  const navLinks = [
    { label: "Features", href: "#features" },
    { label: "Pricing",  href: "#pricing"  },
    { label: "FAQ",      href: "#faq"      },
  ];

  const stats = [
    { value: "3,000+",   label: "Educators Using SMART-ED"    },
    { value: "38 States", label: "Across Nigeria"             },
    { value: "< 20 mins", label: "To Generate Full Curriculum" },
    { value: "5 Tools",   label: "Completely Free"            },
  ];

  const badges = [
    { label: "Free Forever Plan",  color: "bg-teal-50 text-teal-700 border-teal-200"     },
    { label: "No Credit Card",     color: "bg-gray-100 text-gray-600 border-gray-200"    },
    { label: "NERDC Aligned",      color: "bg-amber-50 text-amber-700 border-amber-200"  },
    { label: "British Curriculum", color: "bg-indigo-50 text-indigo-700 border-indigo-200" },
  ];

  const steps = [
    {
      n: "01",
      t: "Create Free Account",
      d: "Sign up with email or Google. No card needed. School setup takes 60 seconds.",
    },
    {
      n: "02",
      t: "Select Class and Subject",
      d: "Choose your class level from Nursery 1 to SS3, subject and curriculum type.",
    },
    {
      n: "03",
      t: "AI Generates Content",
      d: "Our engine produces NERDC-aligned documents tailored to Nigerian school context.",
    },
    {
      n: "04",
      t: "Export and Teach",
      d: "Download watermarked PDF instantly. Upgrade anytime for clean professional exports.",
    },
  ];

  const faqs = [
    {
      q: "Is SMART-ED really free?",
      a: "Yes, completely free with no credit card required. You get 5 core features with generous monthly limits.",
    },
    {
      q: "What curriculum types are supported?",
      a: "Nigerian Curriculum (NERDC), British Curriculum (National Curriculum), and a Combined Nigerian + British option.",
    },
    {
      q: "Can I export my documents?",
      a: "Free plan includes PDF exports with a SMART-ED watermark. Upgrade to Pro for clean DOCX and watermark-free PDFs.",
    },
    {
      q: "What happens when I hit the free limits?",
      a: "You will be prompted to upgrade. Your existing documents are always saved and accessible.",
    },
    {
      q: "Is my school data secure?",
      a: "Yes. We use enterprise-grade encryption via Supabase. Your data belongs to you and is never shared.",
    },
    {
      q: "How do I upgrade?",
      a: "Click Upgrade to Pro from any dashboard page. Plans start at 18,000 naira per term.",
    },
  ];

  const footerCols = [
    {
      title: "Platform",
      links: ["Features", "Pricing", "Upgrade to Pro"],
    },
    {
      title: "Support",
      links: ["Help Center", "Privacy Policy", "Terms"],
    },
    {
      title: "Curriculum",
      links: ["Nigerian (NERDC)", "British Curriculum", "Combined Option"],
    },
  ];

  return (
    <div className="min-h-screen bg-white">

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
          <Logo />
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((item) => {
  return (
   <a key={item.label}
    href={item.href}
    className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
  >
    {item.label}
  </a>);
})}
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors"
            >
              Log In
            </Link>
            <Link
              href="/signup"
              className="bg-teal-600 hover:bg-teal-700 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors"
            >
              Start Free
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="min-h-screen flex items-center justify-center px-6 pt-24 pb-16 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(13,122,107,0.07),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(13,122,107,0.06)_1px,transparent_1px)] bg-[size:40px_40px] opacity-60" />
        <div className="max-w-4xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 bg-teal-50 border border-teal-200 rounded-full px-4 py-2 mb-8">
            <div className="w-2 h-2 bg-teal-500 rounded-full" />
            <span className="text-xs font-bold text-teal-700 uppercase tracking-widest">
              Built for Nigerian Schools · NERDC + British Curriculum
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 leading-tight tracking-tight mb-6">
            Smart School Planning{" "}
            <span className="text-teal-600 italic font-bold">
              Starts Here.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-500 leading-relaxed max-w-2xl mx-auto mb-4">
            AI-Powered Curriculum and Lesson Planning for Nigerian Schools.
          </p>
          <p className="text-lg font-semibold text-gray-900 mb-10">
            Start Free. Upgrade When Ready.
          </p>
          <div className="flex items-center justify-center flex-wrap gap-3 mb-10">
            {badges.map((b) => (
              <span
                key={b.label}
                className={`text-xs font-bold px-3 py-1.5 rounded-full border ${b.color}`}
              >
                {b.label}
              </span>
            ))}
          </div>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link
              href="/signup"
              className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-8 py-4 rounded-xl text-base transition-colors"
            >
              Create Free Account
            </Link>
            <Link
              href="/login"
              className="bg-white border-2 border-gray-200 hover:border-gray-300 text-gray-700 font-semibold px-8 py-4 rounded-xl text-base transition-colors"
            >
              View Dashboard
            </Link>
          </div>
          <p className="mt-4 text-sm text-gray-400">
            Join 3,000+ Nigerian educators already using SMART-ED
          </p>
        </div>
      </section>

      {/* STATS */}
      <div className="bg-gray-900 py-8">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-2xl font-bold text-teal-400">{s.value}</p>
              <p className="text-xs text-white/40 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* FEATURES */}
      <section id="features" className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="bg-teal-50 text-teal-600 border border-teal-200 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-widest">
              What is Free
            </span>
            <h2 className="text-4xl font-bold text-gray-900 mt-5 mb-4 tracking-tight">
              5 Powerful Tools. Completely Free.
            </h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              Not a watered-down demo. Real tools that deliver real value for your school.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <div
                  key={f.title}
                  className="bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-md transition-all"
                >
                  <div className={`w-11 h-11 rounded-xl border flex items-center justify-center mb-4 ${f.color}`}>
                    <Icon size={20} />
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-bold text-gray-900">{f.title}</h3>
                    <span className="bg-teal-50 text-teal-600 text-xs font-bold px-2 py-0.5 rounded-full border border-teal-100">
                      {f.limit}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
                </div>
              );
            })}
          </div>

          {/* Locked features */}
          <div className="bg-gradient-to-br from-white to-amber-50 border border-amber-200 rounded-2xl p-8">
            <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
              <div>
                <h3 className="font-bold text-gray-900 text-lg">
                  Unlock Premium Features
                </h3>
                <p className="text-gray-500 text-sm mt-1">
                  Upgrade to SMART-ED Pro for the complete platform
                </p>
              </div>
              <Link
                href="/signup"
                className="bg-amber-500 hover:bg-amber-600 text-gray-900 font-bold text-sm px-5 py-2.5 rounded-xl transition-colors"
              >
                View Plans
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
              {lockedFeatures.map((f) => (
                <div
                  key={f}
                  className="flex items-center gap-2 bg-white/70 border border-gray-200 rounded-xl px-3 py-2.5"
                >
                  <Lock size={11} className="text-gray-400 flex-shrink-0" />
                  <span className="text-xs text-gray-500 leading-tight">{f}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="bg-indigo-50 text-indigo-600 border border-indigo-200 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-widest">
              Simple Workflow
            </span>
            <h2 className="text-4xl font-bold text-gray-900 mt-5 tracking-tight">
              From Signup to First Document in 5 Minutes
            </h2>
          </div>
          <div className="grid md:grid-cols-4 gap-0">
            {steps.map((s, i) => (
              <div
                key={s.n}
                className={`p-8 text-center relative ${
                  i < 3 ? "border-r border-dashed border-gray-300" : ""
                }`}
              >
                <div className="w-10 h-10 rounded-full bg-teal-50 border-2 border-teal-200 flex items-center justify-center mx-auto mb-4 font-mono text-sm font-semibold text-teal-600">
                  {s.n}
                </div>
                <h4 className="font-bold text-gray-900 mb-2">{s.t}</h4>
                <p className="text-sm text-gray-500 leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="bg-amber-50 text-amber-600 border border-amber-200 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-widest">
              Schools Love SMART-ED
            </span>
            <h2 className="text-4xl font-bold text-gray-900 mt-5 tracking-tight">
              Trusted by Nigerian Educators
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="bg-white border border-gray-100 rounded-2xl p-7 hover:shadow-md transition-all"
              >
                <div className="flex gap-1 mb-5">
                  {Array(t.stars).fill(0).map((_, i) => (
                    <Star key={i} size={14} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-gray-600 leading-relaxed italic mb-6">
                  {t.text}
                </p>
                <div className="border-t border-gray-100 pt-5">
                  <p className="font-bold text-gray-900 text-sm">{t.name}</p>
                  <p className="text-xs text-gray-400 mt-1">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-24 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="bg-teal-50 text-teal-600 border border-teal-200 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-widest">
              Pricing
            </span>
            <h2 className="text-4xl font-bold text-gray-900 mt-5 mb-3 tracking-tight">
              Free to Start. Easy to Upgrade.
            </h2>
            <p className="text-gray-500 text-lg">No hidden fees. Cancel anytime.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 items-start">
            {plans.map((p) => (
              <div key={p.name} className="relative">
                {p.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-amber-500 text-gray-900 text-xs font-bold px-4 py-1 rounded-full whitespace-nowrap z-10">
                    Most Popular
                  </div>
                )}
                <div className={`bg-white rounded-2xl border-2 p-7 ${p.borderColor}`}>
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${p.badgeColor}`}>
                    {p.badge}
                  </span>
                  <h3 className="text-xl font-bold text-gray-900 mt-4 mb-1">
                    {p.name}
                  </h3>
                  <div className="flex items-baseline gap-1.5 mb-6">
                    <span className="text-3xl font-bold text-gray-900">{p.price}</span>
                    <span className="text-sm text-gray-400">/ {p.period}</span>
                  </div>
                  <div className="space-y-3 mb-7 border-t border-gray-100 pt-6">
                    {p.features.map((f) => (
                      <div key={f} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-teal-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check size={10} className="text-teal-600" strokeWidth={3} />
                        </div>
                        <span className="text-sm text-gray-600">{f}</span>
                      </div>
                    ))}
                  </div>
                  <Link
                    href="/signup"
                    className={`block w-full text-center font-semibold py-3 rounded-xl text-sm transition-colors ${p.ctaStyle}`}
                  >
                    {p.cta}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 px-6 bg-white">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-16">
            <span className="bg-gray-100 text-gray-600 border border-gray-200 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-widest">
              FAQ
            </span>
            <h2 className="text-4xl font-bold text-gray-900 mt-5 tracking-tight">
              Common Questions
            </h2>
          </div>
          <div className="space-y-4">
            {faqs.map((item) => (
              <details
                key={item.q}
                className="bg-white border border-gray-100 rounded-2xl overflow-hidden group"
              >
                <summary className="flex items-center justify-between px-6 py-5 cursor-pointer font-semibold text-gray-900 text-sm list-none">
                  {item.q}
                  <span className="text-gray-400 group-open:rotate-180 transition-transform">
                    ↓
                  </span>
                </summary>
                <div className="px-6 pb-5 text-sm text-gray-500 leading-relaxed border-t border-gray-50 pt-4">
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 px-6 bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(13,122,107,0.12)_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="max-w-2xl mx-auto text-center relative">
          <h2 className="text-4xl font-bold text-white mb-4 tracking-tight">
            Start Planning Smarter Today
          </h2>
          <p className="text-white/50 text-lg mb-10">
            Free account. No credit card. Set up in 2 minutes.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link
              href="/signup"
              className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-8 py-4 rounded-xl text-base transition-colors"
            >
              Create Free Account
            </Link>
            <Link
              href="/login"
              className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold px-8 py-4 rounded-xl text-base transition-colors"
            >
              Log In
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-950 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap justify-between gap-10 mb-10">
            <div className="flex-1 min-w-[200px]">
              <Logo />
              <p className="text-sm text-white/30 mt-4 leading-relaxed max-w-xs">
                AI-powered curriculum and planning tools for Nigerian
                primary and secondary schools.
              </p>
            </div>
            {footerCols.map((col) => (
              <div key={col.title} className="flex-1 min-w-[120px]">
                <p className="text-xs font-bold text-white/20 uppercase tracking-widest mb-4">
                  {col.title}
                </p>
                {col.links.map((l) => (
                  <p
                    key={l}
                    className="text-sm text-white/40 mb-3 cursor-pointer hover:text-white/60 transition-colors"
                  >
                    {l}
                  </p>
                ))}
              </div>
            ))}
          </div>
          <div className="border-t border-white/5 pt-8 flex flex-wrap justify-between gap-4">
            <p className="text-xs text-white/20">
              © 2025 SMART-ED Technologies Ltd. All rights reserved.
            </p>
            <p className="text-xs text-white/20">
              Made for Nigerian Schools
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
}