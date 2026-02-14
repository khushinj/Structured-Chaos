"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const HomeIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="h-5 w-5 text-zinc-700"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
  >
    <path d="M4 11.5L12 5l8 6.5" />
    <path d="M6.5 10.5V19h11V10.5" />
  </svg>
);

const PlusIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="h-4 w-4"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M12 5v14" />
    <path d="M5 12h14" />
  </svg>
);

const fadeContainer = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.25, staggerChildren: 0.08 },
  },
};

const fadeItem = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.22 } },
};

const pages = [
  {
    title: "craftx",
    handle: "craftx",
    description: "Will help you\nin learning\n\"How to sell\"",
    accent: "#163d22",
    logoText: "craftx",
  },
  {
    title: "investing your time",
    handle: "invest",
    description: "Always moving\npeople love\ninteresting things",
    accent: "#2e4a39",
    logoText: "invest",
  },
  {
    title: "khushidevops",
    handle: "khushi",
    description: "Sharing life,\nworking vibe,\nfeeling alive",
    accent: "#1f3b45",
    logoText: "dev",
  },
];

const fontCards = [
  { name: "Averia Serif Libre" },
  { name: "Cabin" },
  { name: "" },
];

const books = [
  {
    title: "Deep Focus",
    image:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "Goal Setting",
    image:
      "https://images.unsplash.com/photo-1457694587812-e8bf29a43845?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "Focus on goals",
    image:
      "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "Build Systems",
    image:
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=600&q=80",
  },
];

const hobbies = [
  {
    title: "Guitar",
    image:
      "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Rest",
    image:
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=900&q=80",
  },
];

const grooming = [
  {
    title: "Skincare",
    image:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "Hair",
    image:
      "https://images.unsplash.com/photo-1519415943484-9fa1873496d4?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "Nails",
    image:
      "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "Smile",
    image:
      "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=600&q=80",
  },
];

const fitness = [
  {
    title: "Yoga",
    image:
      "https://images.unsplash.com/photo-1549576490-b0b4831ef60a?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "Stretch",
    image:
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "Strength",
    image:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "Balance",
    image:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80",
  },
];

const explore = [
  {
    title: "Starbucks",
    image:
      "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Juhu + Flower Shop",
    image:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=900&q=80",
  },
];

export default function Home() {
  return (
    <div className="min-h-[100svh] overflow-x-hidden overflow-y-auto bg-black px-2 font-[Cabin,sans-serif] sm:px-4">
    
      <motion.div
        className="mx-auto w-full bg-[#fbfbfb] px-4 pb-10 pt-5 shadow-[0_18px_40px_rgba(0,0,0,0.08)] sm:max-w-[440px]"
        variants={fadeContainer}
        initial="hidden"
        animate="show"
      >
        <div className="flex flex-col gap-5">
          <motion.header
            className="flex items-center justify-between"
            variants={fadeItem}
          >
            <button
              type="button"
              className="rounded-full bg-[#FBFBFB] p-2 shadow-[0_6px_16px_rgba(0,0,0,0.12)]"
              aria-label="Home"
            >
              <HomeIcon />
            </button>
            <button
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-900 text-white shadow-[0_6px_16px_rgba(0,0,0,0.18)]"
              aria-label="Add"
            >
              <PlusIcon />
            </button>
          </motion.header>

          <motion.div className="relative" variants={fadeItem}>
            <input
              placeholder="Search your Interests..."
              className="w-full rounded-full border border-zinc-200/70 bg-white px-4 py-3 text-sm text-zinc-700 shadow-[0_8px_18px_rgba(0,0,0,0.08)] focus:outline-none"
            />
          </motion.div>

          <motion.section
            className="rounded-[49px] min-h-[320px] bg-[#FFFDFD] pb-3 px-2 mt-7 shadow-[0_12px_26px_rgba(0,0,0,0.1)]"
            variants={fadeItem}
          >
            <div className="relative">
              <img
                src="/ProfileCardImg.jpg"
                alt="Cover"
                className="h-40 w-full rounded-[39px] mt-2 object-cover"
              />
              <img
                src="/ProfileCardImg.jpg"
                alt="Khushi Joshi"
                className="absolute -bottom-6 left-4 h-12 w-12 rounded-full border-2 border-white object-cover"
              />
            </div>
            <div className="mt-8 px-4">
              <h1 className="text-xl font-semibold text-zinc-900">
                Khushi Joshi
              </h1>
              <p className="text-sm text-zinc-500">Digital Architect</p>
              <p className="mt-3 text-sm leading-6 text-zinc-600">
                Designing my own operating system for growth.
              </p>
            </div>
          </motion.section>

          <motion.section className="flex flex-col gap-3 my-10" variants={fadeItem}>
            <div className="flex items-center justify-between">
              <h2 className="happy-monkey-regular text-2xl">
                Pages
              </h2>
              <div className="relative rounded-full border mt-1">
                <select
                  className="appearance-none rounded-full border border-zinc-300 bg-white px-4 py-2 pr-10 text-sm font-medium shadow-[0_8px_16px_rgba(0,0,0,0.08)] focus:outline-none"
                  aria-label="Select platform"
                  defaultValue="Instagram"
                >
                  <option>Instagram</option>
                  <option>Threads</option>
                  <option>YouTube</option>
                  <option>Substack</option>
                </select>
                <svg
                  viewBox="0 0 24 24"
                  className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-600"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </div>
            </div>
            
            <div className="-mx-4 overflow-x-auto px-4 no-scrollbar scroll-smooth">
              <div className="flex snap-x snap-mandatory gap-4 pr-2 my-10">
                {pages.map((page) => (
                  <Link
                    key={page.title}
                    href="#"
                    className="min-w-[360px] min-h-[210px] snap-start rounded-[32px] bg-white p-5 shadow-[0_16px_34px_rgba(0,0,0,0.12)] transition-transform duration-200 hover:scale-[1.01] active:scale-[0.98]"
                  >
                    <div className="flex items-center gap-4 pt-1">
                      <div
                        className="flex h-40 w-30 items-center justify-center rounded-[22px] text-2xl font-semibold text-white shadow-[0_12px_24px_rgba(0,0,0,0.2)]"
                        style={{ backgroundColor: page.accent }}
                      >
                        {page.logoText}
                      </div>
                      <div className="flex flex-1 items-start gap-3">
                        <div className="pt-2 text-xl">→</div>
                        <div className="flex flex-col gap-2">
                          <div className="capriola-regular flex items-center gap-2 text-xs">
                            <svg
                              viewBox="0 0 24 24"
                              className="h-4 w-4"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.6"
                            >
                              <rect
                                x="4"
                                y="4"
                                width="16"
                                height="16"
                                rx="4"
                              />
                              <circle cx="12" cy="12" r="3" />
                              <circle cx="17" cy="7" r="1" />
                            </svg>
                            {page.handle}
                          </div>
                          <div className="whitespace-pre-line caveat-brush-regular text-2xl font-bold">
                            {page.description}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </motion.section>

          <motion.section className="flex flex-col gap-3" variants={fadeItem}>
            <h2 className="happy-monkey-regular text-sm text-zinc-700">
              Fonts I love
            </h2>
            <div className="flex gap-3">
              {fontCards.map((font, index) => (
                <Link
                  key={`${font.name}-${index}`}
                  href="#"
                  className="flex-1 rounded-[22px] bg-white px-3 py-4 text-center text-sm font-semibold text-zinc-800 shadow-[0_10px_22px_rgba(0,0,0,0.08)] transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
                >
                  {font.name || ""}
                </Link>
              ))}
            </div>
          </motion.section>

          <motion.section className="flex flex-col gap-3" variants={fadeItem}>
            <div className="flex items-center justify-between">
              <h2 className="happy-monkey-regular text-sm text-zinc-700">
                Books worth investing time
              </h2>
            </div>
            <div className="-mx-4 overflow-x-auto px-4 no-scrollbar scroll-smooth">
              <div className="flex snap-x snap-mandatory gap-4 pr-2">
                {books.map((book) => (
                  <Link
                    key={book.title}
                    href="#"
                    className="min-w-[140px] snap-start rounded-[24px] bg-white p-3 shadow-[0_10px_22px_rgba(0,0,0,0.1)] transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <img
                      src={book.image}
                      alt={book.title}
                      className="h-28 w-full rounded-[18px] object-cover"
                    />
                  </Link>
                ))}
              </div>
            </div>
          </motion.section>

          <motion.section className="flex flex-col gap-3" variants={fadeItem}>
            <h2 className="happy-monkey-regular text-sm text-zinc-700">
              Hobbies
            </h2>
            <div className="flex gap-4">
              {hobbies.map((hobby) => (
                <Link
                  key={hobby.title}
                  href="#"
                  className="flex-1 rounded-[24px] bg-white p-2 shadow-[0_10px_22px_rgba(0,0,0,0.1)] transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <img
                    src={hobby.image}
                    alt={hobby.title}
                    className="h-28 w-full rounded-[20px] object-cover"
                  />
                </Link>
              ))}
            </div>
          </motion.section>

          <motion.section className="flex flex-col gap-3" variants={fadeItem}>
            <h2 className="happy-monkey-regular text-sm text-zinc-700">
              Grooming
            </h2>
            <div className="flex gap-3">
              {grooming.map((item) => (
                <Link
                  key={item.title}
                  href="#"
                  className="flex-1 rounded-[20px] bg-white p-2 shadow-[0_8px_18px_rgba(0,0,0,0.08)] transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-16 w-full rounded-[16px] object-cover"
                  />
                </Link>
              ))}
            </div>
          </motion.section>

          <motion.section className="flex flex-col gap-3" variants={fadeItem}>
            <h2 className="happy-monkey-regular text-sm text-zinc-700">
              Fitness
            </h2>
            <div className="flex gap-3">
              {fitness.map((item) => (
                <Link
                  key={item.title}
                  href="#"
                  className="flex-1 rounded-[20px] bg-white p-2 shadow-[0_8px_18px_rgba(0,0,0,0.08)] transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-16 w-full rounded-[16px] object-cover"
                  />
                </Link>
              ))}
            </div>
          </motion.section>

          <motion.section className="flex flex-col gap-3" variants={fadeItem}>
            <h2 className="happy-monkey-regular text-sm text-zinc-700">
              Go out and explore..
            </h2>
            <div className="-mx-4 overflow-x-auto px-4 no-scrollbar scroll-smooth">
              <div className="flex snap-x snap-mandatory gap-4 pr-2">
                {explore.map((spot) => (
                  <Link
                    key={spot.title}
                    href="#"
                    className="min-w-[170px] snap-start rounded-[24px] bg-white p-2 shadow-[0_10px_22px_rgba(0,0,0,0.1)] transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <img
                      src={spot.image}
                      alt={spot.title}
                      className="h-24 w-full rounded-[18px] object-cover"
                    />
                    <div className="mt-2 text-xs font-semibold text-zinc-800">
                      {spot.title}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </motion.section>
        </div>
      </motion.div>
    </div>
  );
}
