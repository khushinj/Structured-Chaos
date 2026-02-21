"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

type SectionKey = "pages" | "fonts" | "books" | "hobbies" | "grooming" | "fitness" | "explore";

type PageCard = {
  id?: string;
  handle: string;
  description: string;
  image: string;
};

type FontCard = {
  id?: string;
  name: string;
};

type BasicCard = {
  id?: string;
  title: string;
  image: string;
};

type FormState = {
  title: string;
  image: string;
  description: string;
  handle: string;
  name: string;
};

type ApiEntry = {
  id?: string;
  title?: string;
  image?: string;
  description?: string;
  handle?: string;
  name?: string;
};

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

const emptyForm: FormState = {
  title: "",
  image: "",
  description: "",
  handle: "",
  name: "",
};


const HomeIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="h-5 w-5 "
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
    className="h-6 w-6"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M12 5v14" />
    <path d="M5 12h14" />
  </svg>
);

const MenuArrowIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="h-7 w-7"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M10 8l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
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

const navMenuItems: { label: string; sectionId: string; sectionKey: SectionKey }[] = [
  { label: "Pages", sectionId: "pages-section", sectionKey: "pages" },
  { label: "Fonts I Love", sectionId: "fonts-section", sectionKey: "fonts" },
  { label: "Books worth investing...", sectionId: "books-section", sectionKey: "books" },
  { label: "Hobbies", sectionId: "hobbies-section", sectionKey: "hobbies" },
  { label: "Grooming", sectionId: "grooming-section", sectionKey: "grooming" },
  { label: "Fitness", sectionId: "fitness-section", sectionKey: "fitness" },
  { label: "Go out & explore", sectionId: "explore-section", sectionKey: "explore" },
];

const defaultPages: PageCard[] = [
  {
    handle: "craftx",
    description: "Will help you\nin learning\n\"How to sell\"",
    image: "/craftxImg.png",
  },
  {
    handle: "storiesbyaradhana",
    description: "Always moving\npeople love\ninteresting things",
    image: "/CardImg2.png",
  },
  {
    handle: "chaiaurvadapav",
    description: "Sharing life,\nworking vibe,\nfeeling alive",
    image: "/CardImg3.png",
  },
];

const defaultFontCards: FontCard[] = [
  { name: "Averia Serif Libre" },
  { name: "Cabin" },
  { name: "" },
];

const defaultBooks: BasicCard[] = [
  {
    title: "Deep Focus",
    image: "/book1.jpg",
  },
  {
    title: "Goal Setting",
    image: "/book2.jpg",
  },
  {
    title: "Focus on goals",
    image: "/book3.jpg",
  },
  {
    title: "Build Systems",
    image: "/book4.jpg",
  },
  {
    title: "Mindfulness",
    image: "/book5.jpg",
  },
];

const defaultHobbies: BasicCard[] = [
  {
    title: "Guitar",
    image: "/guitar.png",
  },
  {
    title: "Rest",
    image: "/crochet.png",
  },
];

const defaultGrooming: BasicCard[] = [
  {
    title: "Skincare",
    image: "/groom1.jpg",
  },
  {
    title: "Hair",
    image: "/groom2.jpg",
  },
  {
    title: "Nails",
    image: "/groom3.jpg",
  },
  {
    title: "Smile",
    image: "/groom4.jpg",
  },
  {
    title: "Makeup",
    image: "/groom5.jpg",
  },
];

const defaultFitness: BasicCard[] = [
  {
    title: "Yoga",
    image: "/fitness1.jpg",
  },
  {
    title: "Stretch",
    image: "/fitness2.jpg",
  },
  {
    title: "Pilates",
    image: "/fitness3.jpg",
  },
  {
    title: "Cardio",
    image: "/fitness4.jpg",
  },
];

const defaultExplore: BasicCard[] = [
  {
    title: "Starbucks",
    image: "/starbucks.jpg",
  },
  {
    title: "Juhu + Flower Shop",
    image: "/flower-explore.jpg",
  },
];

const getFontClass = (fontName: string) => {
  switch (fontName.toLowerCase()) {
    case 'averia serif libre':
      return 'averia-serif-libre-regular';
    case 'haha':
      return 'happy-monkey-regular';
    default:
      return 'inter-regular';
  }
};

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeFormSection, setActiveFormSection] = useState<SectionKey | null>(null);
  const [formData, setFormData] = useState<FormState>(emptyForm);
  const [isSaving, setIsSaving] = useState(false);
  const [formError, setFormError] = useState("");
  const [pages, setPages] = useState<PageCard[]>(defaultPages);
  const [fontCards, setFontCards] = useState<FontCard[]>(defaultFontCards);
  const [books, setBooks] = useState<BasicCard[]>(defaultBooks);
  const [hobbies, setHobbies] = useState<BasicCard[]>(defaultHobbies);
  const [grooming, setGrooming] = useState<BasicCard[]>(defaultGrooming);
  const [fitness, setFitness] = useState<BasicCard[]>(defaultFitness);
  const [explore, setExplore] = useState<BasicCard[]>(defaultExplore);

  useEffect(() => {
    const loadEntries = async () => {
      try {
        const response = await fetch(`${API_BASE}/api/entries`);
        if (!response.ok) {
          return;
        }

        const data: Partial<Record<SectionKey, ApiEntry[]>> = await response.json();

        setPages([
          ...defaultPages,
          ...(data.pages ?? []).map((entry) => ({
            id: entry.id,
            handle: entry.handle ?? "",
            description: entry.description ?? "",
            image: entry.image ?? "",
          })),
        ]);
        setFontCards([
          ...defaultFontCards,
          ...(data.fonts ?? []).map((entry) => ({
            id: entry.id,
            name: entry.name ?? "",
          })),
        ]);
        setBooks([
          ...defaultBooks,
          ...(data.books ?? []).map((entry) => ({
            id: entry.id,
            title: entry.title ?? "",
            image: entry.image ?? "",
          })),
        ]);
        setHobbies([
          ...defaultHobbies,
          ...(data.hobbies ?? []).map((entry) => ({
            id: entry.id,
            title: entry.title ?? "",
            image: entry.image ?? "",
          })),
        ]);
        setGrooming([
          ...defaultGrooming,
          ...(data.grooming ?? []).map((entry) => ({
            id: entry.id,
            title: entry.title ?? "",
            image: entry.image ?? "",
          })),
        ]);
        setFitness([
          ...defaultFitness,
          ...(data.fitness ?? []).map((entry) => ({
            id: entry.id,
            title: entry.title ?? "",
            image: entry.image ?? "",
          })),
        ]);
        setExplore([
          ...defaultExplore,
          ...(data.explore ?? []).map((entry) => ({
            id: entry.id,
            title: entry.title ?? "",
            image: entry.image ?? "",
          })),
        ]);
      } catch {
      }
    };

    loadEntries();
  }, []);

  const openMenu = () => {
    setIsMenuOpen(true);
    setActiveFormSection(null);
    setFormData(emptyForm);
    setFormError("");
  };

  const handleMenuSelect = (sectionKey: SectionKey) => {
    setActiveFormSection(sectionKey);
    setFormData(emptyForm);
    setFormError("");
  };

  const getSectionId = (sectionKey: SectionKey) => {
    const section = navMenuItems.find((item) => item.sectionKey === sectionKey);
    return section?.sectionId;
  };

  const submitEntry = async () => {
    if (!activeFormSection) {
      return;
    }

    const payload: ApiEntry = {};

    if (activeFormSection === "pages") {
      payload.image = formData.image.trim();
      payload.handle = formData.handle.trim();
      payload.description = formData.description.trim();
      if (!payload.image || !payload.handle || !payload.description) {
        setFormError("Image, handle and description are required.");
        return;
      }
    }

    if (activeFormSection === "fonts") {
      payload.name = formData.name.trim();
      if (!payload.name) {
        setFormError("Font name is required.");
        return;
      }
    }

    if (["books", "hobbies", "grooming", "fitness", "explore"].includes(activeFormSection)) {
      payload.title = formData.title.trim();
      payload.image = formData.image.trim();
      if (!payload.title || !payload.image) {
        setFormError("Title and image are required.");
        return;
      }
    }

    setIsSaving(true);
    setFormError("");

    try {
      const response = await fetch(`${API_BASE}/api/entries/${activeFormSection}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const createdEntry: ApiEntry & { error?: string } = await response.json();
      if (!response.ok) {
        setFormError(createdEntry.error || "Failed to save entry.");
        setIsSaving(false);
        return;
      }

      if (activeFormSection === "pages") {
        setPages((prev) => [
          ...prev,
          {
            id: createdEntry.id,
            handle: createdEntry.handle ?? "",
            description: createdEntry.description ?? "",
            image: createdEntry.image ?? "",
          },
        ]);
      }

      if (activeFormSection === "fonts") {
        setFontCards((prev) => [
          ...prev,
          {
            id: createdEntry.id,
            name: createdEntry.name ?? "",
          },
        ]);
      }

      if (activeFormSection === "books") {
        setBooks((prev) => [...prev, { id: createdEntry.id, title: createdEntry.title ?? "", image: createdEntry.image ?? "" }]);
      }
      if (activeFormSection === "hobbies") {
        setHobbies((prev) => [...prev, { id: createdEntry.id, title: createdEntry.title ?? "", image: createdEntry.image ?? "" }]);
      }
      if (activeFormSection === "grooming") {
        setGrooming((prev) => [...prev, { id: createdEntry.id, title: createdEntry.title ?? "", image: createdEntry.image ?? "" }]);
      }
      if (activeFormSection === "fitness") {
        setFitness((prev) => [...prev, { id: createdEntry.id, title: createdEntry.title ?? "", image: createdEntry.image ?? "" }]);
      }
      if (activeFormSection === "explore") {
        setExplore((prev) => [...prev, { id: createdEntry.id, title: createdEntry.title ?? "", image: createdEntry.image ?? "" }]);
      }

      const sectionId = getSectionId(activeFormSection);
      setIsMenuOpen(false);
      setActiveFormSection(null);
      setFormData(emptyForm);
      if (sectionId) {
        setTimeout(() => {
          document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 120);
      }
    } catch {
      setFormError("Failed to connect to backend.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-[100svh] w-screen overflow-x-hidden overflow-y-auto bg-black px-2 sm:px-4">

      <motion.div
        className="relative mx-auto w-full bg-[#fbfbfb] px-3 sm:px-4 pb-10 pt-5 sm:max-w-[440px] max-w-full overflow-hidden"
        variants={fadeContainer}
        initial="hidden"
        animate="show"
      >
        <div className="flex flex-col gap-5">
          <motion.header
            className="flex items-center justify-between gap-2"
            variants={fadeItem}
          >
            <button
              type="button"
              className="rounded-full bg-[#FBFBFB] p-2 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.10)] flex-shrink-0"
              aria-label="Home"
            >
              <HomeIcon />
            </button>
            <button
              type="button"
              className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-900 text-white shadow-[0_6px_16px_rgba(0,0,0,0.18)] flex-shrink-0"
              aria-label="Add"
              onClick={openMenu}
            >
              <PlusIcon />
            </button>
          </motion.header>

          <motion.div className="relative" variants={fadeItem}>
            <input
              placeholder="Search your Interests..."
              className="w-full rounded-full border border-zinc-200/70 bg-white px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm shadow-[0_8px_18px_rgba(0,0,0,0.08)] focus:outline-none"
            />
          </motion.div>

          <motion.section
            className="rounded-[49px] min-h-[320px] bg-[#FFFDFD] pb-3 px-2 mt-7 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.10)] overflow-hidden"
            variants={fadeItem}
          >
            <div className="relative w-full">
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
            <div className="mt-8 px-2 overflow-hidden">
              <h1 className="text-lg sm:text-xl oxygen-bold truncate">
                Khushi Joshi
              </h1>
              <p className="text-sm inter-regular text-[#787878]">Digital Architect</p>
              <p className="mt-3 text-sm karla-regular line-clamp-2">
                Designing my own operating system for growth.
              </p>
            </div>
          </motion.section>

          <motion.section id="pages-section" className="flex flex-col gap-3 my-8 sm:my-10" variants={fadeItem}>
            <div className="flex items-center justify-between gap-2">
              <h2 className="happy-monkey-regular text-4xl flex-shrink-0">
                Pages
              </h2>
              <div className="relative rounded-full border flex-shrink-0">
                <select
                  className="appearance-none rounded-full border border-zinc-300 bg-white px-3 sm:px-4 py-2 pr-8 sm:pr-10 text-xs sm:text-sm font-medium shadow-[0_20px_60px_-15px_rgba(0,0,0,0.10)] focus:outline-none"
                  aria-label="Select platform"
                  defaultValue="Instagram"
                >
                  <option className="cabin-regular">Instagram</option>
                  <option className="cabin-regular">Threads</option>
                  <option className="cabin-regular">YouTube</option>
                  <option className="cabin-regular">Substack</option>
                </select>
                <svg
                  viewBox="0 0 24 24"
                  className="pointer-events-none absolute right-2 sm:right-3 top-1/2 h-3 sm:h-4 w-3 sm:w-4 -translate-y-1/2 text-zinc-600"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </div>
            </div>

            <div className="-mx-4 overflow-x-auto px-4 no-scrollbar scroll-smooth">
              <div className="flex snap-x snap-mandatory gap-4 pr-2 my-5">
                {pages.map((page, index) => (
                  <Link
                    key={page.id ?? `${page.handle}-${index}`}
                    href="#"
                    className="min-w-[calc(100vw-120px)] sm:min-w-[200px] snap-start rounded-[32px] bg-white px-3 py-6 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.10)] transition-transform duration-200 hover:scale-[1.01] active:scale-[0.98] flex-shrink-0 flex items-center gap-6"
                  >
                    <div className={`relative flex-shrink-0 overflow-hidden rounded-[24px] ${index === 0 || index === 2 ? 'h-42 w-36' : 'h-40 w-32'}`}>
                      <img src={page.image} alt={page.handle} className="h-full w-full object-cover" />
                    </div>
                    <div className="flex flex-1 items-center gap-4 min-w-0">
                      <img src="/arrow.png" alt="Arrow" className="h-16 w-16 flex-shrink-0" />
                      <div className="flex flex-col gap-3 min-w-0 overflow-hidden">
                        <div className="capriola-regular flex items-center text-sm gap-2 flex-shrink-0">
                          <svg
                            viewBox="0 0 24 24"
                            className="h-5 w-5 flex-shrink-0"
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
                          <span className="truncate">{page.handle}</span>
                        </div>
                        <div className="whitespace-pre-line caveat-brush-regular text-2xl font-bold leading-tight px-3">
                          {page.description}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </motion.section>

          <motion.section id="fonts-section" className="flex flex-col gap-4" variants={fadeItem}>
            <h2 className="happy-monkey-regular text-4xl">
              Fonts I love
            </h2>
            <div className="-mx-4 overflow-x-auto px-4 no-scrollbar scroll-smooth">
              <div className="flex snap-x snap-mandatory gap-3 pr-2 my-10">
                {fontCards.map((font, index) => (
                  <Link
                    key={`${font.name}-${index}`}
                    href="#"
                    className="min-w-[370px] h-50 aspect-square rounded-[24px] bg-white px-5 py-8 text-center font-semibold shadow-[0_20px_60px_-15px_rgba(0,0,0,0.10)] transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center snap-start flex-shrink-0"
                  >
                    <span className={`text-3xl ${getFontClass(font.name)}`}>{font.name || ""}</span>
                  </Link>
                ))}
              </div>
            </div>
          </motion.section>

          <motion.section id="books-section" className="flex flex-col gap-6 mt-6" variants={fadeItem}>
            <h2 className="happy-monkey-regular text-4xl leading-tight tracking-tight">
              Books worth investing Time
            </h2>
            <div className="-mx-4 overflow-x-auto px-4 no-scrollbar scroll-smooth">
              <div className="flex gap-6 pr-4 my-10">
                {books.map((book) => (
                  <Link
                    key={book.id ?? book.title}
                    href="#"
                    className="snap-start transition-transform duration-200 hover:scale-[1.01] active:scale-[0.98] flex-shrink-0"
                  >
                    <img
                      src={book.image}
                      alt={book.title}
                      className="h-[210px] w-[170px] rounded-[30px] object-cover shadow-[0_20px_60px_-15px_rgba(0,0,0,0.10)]"
                    />
                  </Link>
                ))}
              </div>
            </div>
          </motion.section>

          <motion.section id="hobbies-section" className="flex flex-col gap-3" variants={fadeItem}>
            <h2 className="happy-monkey-regular text-4xl">
              Hobbies
            </h2>
            <div className="-mx-4 overflow-x-auto px-5 no-scrollbar scroll-smooth">
              <div className="flex snap-x snap-mandatory gap-7 pr-2">
                {hobbies.map((hobby) => (
                  <Link
                    key={hobby.id ?? hobby.title}
                    href="#"
                    className="w-[400px] my-10 snap-start rounded-[30px] bg-white p-1.5 sm:p-2 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.10)]  transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98] flex-shrink-0"
                  >
                    <img
                      src={hobby.image}
                      alt={hobby.title}
                      className="h-60 w-full rounded-[27px] object-cover"
                    />
                  </Link>
                ))}
              </div>
            </div>
          </motion.section>

          <motion.section id="grooming-section" className="flex flex-col gap-3 mb-10" variants={fadeItem}>
            <h2 className="happy-monkey-regular text-4xl leading-tight mt-2">
              Grooming
            </h2>
            <div className="-mx-4 overflow-x-auto px-4 no-scrollbar scroll-smooth">
              <div className="flex snap-x snap-mandatory gap-4 pr-2 my-4">
                {grooming.map((item) => (
                  <Link
                    key={item.id ?? item.title}
                    href="#"
                    className="min-w-[98px] sm:min-w-[110px] snap-start rounded-[20px] bg-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.10)] transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98] flex-shrink-0"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-[130px] sm:h-[140px] w-full rounded-[18px] object-cover"
                    />
                  </Link>
                ))}
              </div>
            </div>
          </motion.section>

          <motion.section id="fitness-section" className="flex flex-col gap-3 mb-10" variants={fadeItem}>
            <h2 className="happy-monkey-regular text-4xl leading-tight mt-2">
              Fitness
            </h2>
            <div className="-mx-4 overflow-x-auto px-4 no-scrollbar scroll-smooth">
              <div className="flex snap-x snap-mandatory gap-4 pr-2 my-4">
                {fitness.map((item) => (
                  <Link
                    key={item.id ?? item.title}
                    href="#"
                    className="w-[120px] snap-start rounded-[20px] bg-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.10)] transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98] flex-shrink-0"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-[160px] w-full rounded-[18px] object-cover"
                    />
                  </Link>
                ))}
              </div>
            </div>
          </motion.section>

          <motion.section id="explore-section" className="flex flex-col gap-3" variants={fadeItem}>
            <h2 className="happy-monkey-regular text-4xl leading-tight mt-4">
              Go out and explore..
            </h2>
            <div className="-mx-4 overflow-x-auto px-4 no-scrollbar scroll-smooth">
              <div className="flex snap-x snap-mandatory gap-6 pr-4 my-4">
                {explore.map((spot) => (
                  <Link
                    key={spot.id ?? spot.title}
                    href="#"
                    className="min-w-[300px] sm:min-w-[360px] snap-start rounded-[38px] bg-white p-2.5 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.10)] transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98] flex-shrink-0"
                  >
                    <img
                      src={spot.image}
                      alt={spot.title}
                      className="h-[210px] w-full rounded-[32px] object-cover"
                    />
                    <div className="mt-3 px-3 pb-3 text-2xl  mooli-regular line-clamp-1">
                      {spot.title}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </motion.section>
        </div>

        {isMenuOpen && (
          <div className="absolute inset-0 z-50 bg-black/20" onClick={() => setIsMenuOpen(false)}>
            <div
              className="absolute right-3 top-3 w-[min(88vw,360px)] rounded-[14px] bg-white px-5 py-4 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.30)] sm:right-4 sm:top-4"
              onClick={(event) => event.stopPropagation()}
            >
              {!activeFormSection ? (
                <>
                  {navMenuItems.map((item, index) => (
                    <button
                      key={item.sectionId}
                      type="button"
                      className={`flex w-full items-center justify-between py-4 text-left text-xl leading-[0.95] mooli-regular text-zinc-900 ${
                        index < navMenuItems.length - 1 ? "border-b border-zinc-300" : ""
                      }`}
                      onClick={() => handleMenuSelect(item.sectionKey)}
                    >
                      <span>{item.label}</span>
                      <span className="ml-6 flex-shrink-0 ">
                        <MenuArrowIcon />
                      </span>
                    </button>
                  ))}
                </>
              ) : (
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      className="rounded-full border border-zinc-300 px-3 py-1 text-sm mooli-regular"
                      onClick={() => setActiveFormSection(null)}
                    >
                      Back
                    </button>
                    <h3 className="mooli-regular text-lg text-zinc-900">Add in {navMenuItems.find((item) => item.sectionKey === activeFormSection)?.label}</h3>
                  </div>

                  {activeFormSection === "pages" && (
                    <>
                      <input
                        value={formData.image}
                        onChange={(event) => setFormData((prev) => ({ ...prev, image: event.target.value }))}
                        placeholder="Image URL"
                        className="w-full rounded-xl border border-zinc-300 px-3 py-2 text-sm"
                      />
                      <input
                        value={formData.handle}
                        onChange={(event) => setFormData((prev) => ({ ...prev, handle: event.target.value }))}
                        placeholder="Handle"
                        className="w-full rounded-xl border border-zinc-300 px-3 py-2 text-sm"
                      />
                      <textarea
                        value={formData.description}
                        onChange={(event) => setFormData((prev) => ({ ...prev, description: event.target.value }))}
                        placeholder="Description"
                        rows={3}
                        className="w-full rounded-xl border border-zinc-300 px-3 py-2 text-sm"
                      />
                    </>
                  )}

                  {activeFormSection === "fonts" && (
                    <input
                      value={formData.name}
                      onChange={(event) => setFormData((prev) => ({ ...prev, name: event.target.value }))}
                      placeholder="Font Name"
                      className="w-full rounded-xl border border-zinc-300 px-3 py-2 text-sm"
                    />
                  )}

                  {["books", "hobbies", "grooming", "fitness", "explore"].includes(activeFormSection) && (
                    <>
                      <input
                        value={formData.title}
                        onChange={(event) => setFormData((prev) => ({ ...prev, title: event.target.value }))}
                        placeholder="Title"
                        className="w-full rounded-xl border border-zinc-300 px-3 py-2 text-sm"
                      />
                      <input
                        value={formData.image}
                        onChange={(event) => setFormData((prev) => ({ ...prev, image: event.target.value }))}
                        placeholder="Image URL"
                        className="w-full rounded-xl border border-zinc-300 px-3 py-2 text-sm"
                      />
                    </>
                  )}

                  <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-3">
                    <p className="mb-2 text-xs uppercase tracking-wide text-zinc-500">Preview</p>

                    {activeFormSection === "pages" && (
                      <div className="rounded-2xl bg-white p-3 shadow-[0_10px_24px_rgba(0,0,0,0.08)]">
                        <img src={formData.image || "/craftxImg.png"} alt="Preview" className="h-28 w-full rounded-xl object-cover" />
                        <p className="mt-2 text-sm capriola-regular">@{formData.handle || "yourhandle"}</p>
                        <p className="mt-1 whitespace-pre-line text-xs text-zinc-600">{formData.description || "Your description preview"}</p>
                      </div>
                    )}

                    {activeFormSection === "fonts" && (
                      <div className="flex h-24 items-center justify-center rounded-2xl bg-white text-2xl shadow-[0_10px_24px_rgba(0,0,0,0.08)]">
                        <span className={getFontClass(formData.name || "")}>{formData.name || "Font Preview"}</span>
                      </div>
                    )}

                    {["books", "hobbies", "grooming", "fitness", "explore"].includes(activeFormSection) && (
                      <div className="rounded-2xl bg-white p-2 shadow-[0_10px_24px_rgba(0,0,0,0.08)]">
                        <img src={formData.image || "/ProfileCardImg.jpg"} alt="Preview" className="h-36 w-full rounded-xl object-cover" />
                        <p className="mt-2 text-sm mooli-regular text-zinc-800">{formData.title || "Card title"}</p>
                      </div>
                    )}
                  </div>

                  {formError && <p className="text-sm text-red-600">{formError}</p>}

                  <button
                    type="button"
                    onClick={submitEntry}
                    disabled={isSaving}
                    className="w-full rounded-xl bg-zinc-900 py-2.5 text-sm text-white disabled:opacity-60"
                  >
                    {isSaving ? "Saving..." : "Submit"}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
