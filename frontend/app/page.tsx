"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import arrowImg from '../public/arrow.png';
import craftx from '../public/craftxImg.png';
import CardImg2 from '../public/CardImg2.png';
import CardImg3 from '../public/CardImg3.png';
import book1 from '../public/book1.jpg';
import book2 from '../public/book2.jpg';
import book3 from '../public/book3.jpg';
import book4 from '../public/book4.jpg';
import book5 from '../public/book5.jpg';
import guitar from '../public/guitar.png';
import crochet from '../public/crochet.png';
import groom1 from '../public/groom1.jpg';
import groom2 from '../public/groom2.jpg';
import groom3 from '../public/groom3.jpg';
import groom4 from '../public/groom4.jpg';
import groom5 from '../public/groom5.jpg';
import fitness1 from '../public/fitness1.jpg';
import fitness2 from '../public/fitness2.jpg';
import fitness3 from '../public/fitness3.jpg';
import fitness4 from '../public/fitness4.jpg';
import flowerExplore from '../public/flower-explore.jpg';
import starbucks from '../public/starbucks.jpg';


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
    // title: "craftx",
    handle: "craftx",
    description: "Will help you\nin learning\n\"How to sell\"",
    accent: "#163d22",
    logo: craftx,
  },
  {
    title: "investing your time",
    handle: "storiesbyaradhana",
    description: "Always moving\npeople love\ninteresting things",
    accent: "#2e4a39",
    logo: CardImg2,
  },
  {
    title: "khushidevops",
    handle: "chaiaurvadapav",
    description: "Sharing life,\nworking vibe,\nfeeling alive",
    accent: "#1f3b45",
    logo: CardImg3,
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
      book1
  },
  {
    title: "Goal Setting",
    image:
      book2
  },
  {
    title: "Focus on goals",
    image:
      book3
  },
  {
    title: "Build Systems",
    image:
      book4
  },
  {
    title: "Mindfulness",
    image:
      book5
  },
];

const hobbies = [
  {
    title: "Guitar",
    image:
      guitar
  },
  {
    title: "Rest",
    image:
      crochet,
  },
];

const grooming = [
  {
    title: "Skincare",
    image:
      groom1
  },
  {
    title: "Hair",
    image:
      groom2,
  },
  {
    title: "Nails",
    image:
      groom3,
  },
  {
    title: "Smile",
    image:
      groom4,
  },
  {
    title: "Makeup",
    image:
      groom5,
  },
];

const fitness = [
  {
    title: "Yoga",
    image:
      fitness1
  },
  {
    title: "Stretch",
    image:
      fitness2
  },
  {
    title: "Pilates",
    image:
      fitness3
  },
  {
    title: "Cardio",
    image:
      fitness4
  },
];

const explore = [
  {
    title: "Starbucks",
    image:
      starbucks
  },
  {
    title: "Juhu + Flower Shop",
    image:
      flowerExplore
  },
];

const getFontClass = (fontName) => {
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
  return (
    <div className="min-h-[100svh] w-full overflow-x-hidden overflow-y-auto bg-black px-2 sm:px-4">

      <motion.div
        className="mx-auto w-full bg-[#fbfbfb] px-3 sm:px-4 pb-10 pt-5 sm:max-w-[440px] max-w-full overflow-hidden"
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
              className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-900 text-white shadow-[0_6px_16px_rgba(0,0,0,0.18)] flex-shrink-0"
              aria-label="Add"
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
              <p className="mt-3 text-xs karla-regular line-clamp-2">
                Designing my own operating system for growth.
              </p>
            </div>
          </motion.section>

          <motion.section className="flex flex-col gap-3 my-8 sm:my-10" variants={fadeItem}>
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

            <div className="-mx-4 overflow-x-auto px-9 no-scrollbar scroll-smooth">
              <div className="flex snap-x snap-mandatory gap-4 pr-2 my-5">
                {pages.map((page, index) => (
                  <Link
                    key={page.handle}
                    href="#"
                    className="min-w-[calc(100vw-120px)] sm:min-w-[200px] snap-start rounded-[32px] bg-white px-3 py-6 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.10)] transition-transform duration-200 hover:scale-[1.01] active:scale-[0.98] flex-shrink-0 flex items-center gap-6"
                  >
                    <div className={`relative flex-shrink-0 overflow-hidden rounded-[24px] ${index === 0 || index === 2 ? 'h-42 w-36' : 'h-40 w-32'}`}>
                      <Image
                        src={page.logo}
                        alt={page.title ?? page.handle}
                        fill
                        className="object-cover"
                        sizes="128px"
                      />
                    </div>
                    <div className="flex flex-1 items-center gap-4 min-w-0">
                      <Image src={arrowImg} alt="Arrow" className="h-16 w-16 flex-shrink-0" />
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

          <motion.section className="flex flex-col gap-4" variants={fadeItem}>
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

          <motion.section className="flex flex-col gap-6 mt-6" variants={fadeItem}>
            <h2 className="happy-monkey-regular text-4xl leading-tight tracking-tight">
              Books worth investing Time
            </h2>
            <div className="-mx-4 overflow-x-auto px-4 no-scrollbar scroll-smooth">
              <div className="flex gap-6 pr-4 my-10">
                {books.map((book) => (
                  <Link
                    key={book.title}
                    href="#"
                    className="snap-start transition-transform duration-200 hover:scale-[1.01] active:scale-[0.98] flex-shrink-0"
                  >
                    <Image
                      src={book.image}
                      alt={book.title}
                      className="w-[170px] h-[210px] rounded-[30px] object-cover shadow-[0_20px_60px_-15px_rgba(0,0,0,0.10)] "
                      width={170}
                      height={210}
                    />
                  </Link>
                ))}
              </div>
            </div>
          </motion.section>

          <motion.section className="flex flex-col gap-3" variants={fadeItem}>
            <h2 className="happy-monkey-regular text-4xl">
              Hobbies
            </h2>
            <div className="-mx-4 overflow-x-auto px-5 no-scrollbar scroll-smooth">
              <div className="flex snap-x snap-mandatory gap-7 pr-2">
                {hobbies.map((hobby) => (
                  <Link
                    key={hobby.title}
                    href="#"
                    className="w-[400px] my-10 snap-start rounded-[30px] bg-white p-1.5 sm:p-2 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.10)]  transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98] flex-shrink-0"
                  >
                    <Image
                      src={hobby.image}
                      alt={hobby.title}
                      className="h-60 w-full rounded-[27px] object-cover"
                      width={360}
                      height={200}
                    />
                  </Link>
                ))}
              </div>
            </div>
          </motion.section>

          <motion.section className="flex flex-col gap-3 mb-10" variants={fadeItem}>
            <h2 className="happy-monkey-regular text-4xl leading-tight mt-2">
              Grooming
            </h2>
            <div className="-mx-4 overflow-x-auto px-4 no-scrollbar scroll-smooth">
              <div className="flex snap-x snap-mandatory gap-4 pr-2 my-4">
                {grooming.map((item) => (
                  <Link
                    key={item.title}
                    href="#"
                    className="min-w-[98px] sm:min-w-[110px] snap-start rounded-[20px] bg-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.10)] transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98] flex-shrink-0"
                  >
                    <Image
                      src={item.image}
                      alt={item.title}
                      className="h-[130px] sm:h-[140px] w-full rounded-[18px] object-cover"
                    />
                  </Link>
                ))}
              </div>
            </div>
          </motion.section>

          <motion.section className="flex flex-col gap-3 mb-10" variants={fadeItem}>
            <h2 className="happy-monkey-regular text-4xl leading-tight mt-2">
              Fitness
            </h2>
            <div className="-mx-4 overflow-x-auto px-4 no-scrollbar scroll-smooth">
              <div className="flex snap-x snap-mandatory gap-4 pr-2 my-4">
                {fitness.map((item) => (
                  <Link
                    key={item.title}
                    href="#"
                    className="w-[120px] snap-start rounded-[20px] bg-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.10)] transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98] flex-shrink-0"
                  >
                    <Image
                      src={item.image}
                      alt={item.title}
                      className="h-[160px] w-full rounded-[18px] object-cover"
                    />
                  </Link>
                ))}
              </div>
            </div>
          </motion.section>

          <motion.section className="flex flex-col gap-3" variants={fadeItem}>
            <h2 className="happy-monkey-regular text-4xl leading-tight mt-4">
              Go out and explore..
            </h2>
            <div className="-mx-4 overflow-x-auto px-4 no-scrollbar scroll-smooth">
              <div className="flex snap-x snap-mandatory gap-6 pr-4 my-4">
                {explore.map((spot) => (
                  <Link
                    key={spot.title}
                    href="#"
                    className="min-w-[300px] sm:min-w-[360px] snap-start rounded-[38px] bg-white p-2.5 shadow-[0_20px_60px_15px_rgba(0,0,0,0.10)] transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98] flex-shrink-0"
                  >
                    <Image
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
      </motion.div>
    </div>
  );
}
