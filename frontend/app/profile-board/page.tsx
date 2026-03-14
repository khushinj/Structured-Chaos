"use client";

import Image from "next/image";
import Link from "next/link";

type ImageCardData = {
  type: "image";
  title: string;
  image: string;
  alt: string;
};

type StickyNoteCardData = {
  type: "sticky";
  title: string;
  image: string;
};

type TextIdeaCardData = {
  type: "textIdea";
  heading: string;
  description: string;
};

type CardData = ImageCardData | StickyNoteCardData | TextIdeaCardData;

const leftColumnCards: CardData[] = [
  {
    type: "image",
    title: "Create Outfits",
    image: "/createOutfits.png",
    alt: "Create Outfits",
  },
  {
    type: "image",
    title: "Create a carousel post - Month Dump",
    image: "/CarouselDump.jpg",
    alt: "Create a carousel post - Month Dump",
  },
  {
    type: "image",
    title: "Shoot One Profile Pic Image",
    image: "/ShootImg.jpg",
    alt: "Shoot One Profile Pic Image",
  },
  {
    type: "image",
    title: "Use/Create Automations",
    image: "/Automations.jpg",
    alt: "Use/Create Automations",
  },
];

const rightColumnCards: CardData[] = [
  {
    type: "sticky",
    title: "Onboarding Clients",
    image: "/OnboardingClients.png",
  },
  {
    type: "textIdea",
    heading: "SCROLL-STOPPING HOOKS",
    description: "Create 10 Hooks for your upcoming Content",
  },
  {
    type: "image",
    title: "Learn Only 10 New Words",
    image: "/Duolingo.png",
    alt: "Learn Only 10 New Words",
  },
  {
    type: "image",
    title: "Create a Idea Bucket",
    image: "/IdeaBucket.jpg",
    alt: "Create a Idea Bucket",
  },
  {
    type: "image",
    title: "Beyond Basic. Top Tier. Elite. Exceptionally Good.",
    image: "/Substack.jpg",
    alt: "Beyond Basic. Top Tier. Elite. Exceptionally Good.",
  },
  {
    type: "image",
    title: "Spend 10 mins on Threads",
    image: "/Threads.jpg",
    alt: "Spend 10 mins on Threads",
  },
];

const baseCardClass =
  "rounded-[28px] bg-white shadow-[0_14px_30px_-20px_rgba(0,0,0,0.45),0_8px_16px_-14px_rgba(0,0,0,0.22)] transition-transform duration-200 hover:scale-[1.02]";

function ImageCard({ title, image, alt }: ImageCardData) {
  return (
    <article className={`${baseCardClass} p-3`}>
      <Image
        src={image}
        alt={alt}
        width={420}
        height={620}
        sizes="(max-width: 640px) 44vw, 190px"
        className="h-auto w-full rounded-[20px] object-cover"
      />
      <p className="pt-3 text-center text-[15px] leading-snug text-zinc-900 oxygen-bold">{title}</p>
    </article>
  );
}

function StickyNoteCard({ title, image }: StickyNoteCardData) {
  return (
    <article className={`${baseCardClass} p-3`}>
      <Image
        src={image}
        alt={title}
        width={317}
        height={253}
        sizes="(max-width: 640px) 44vw, 190px"
        className="h-auto w-full rounded-[20px] object-cover"
      />
    </article>
  );
}

function TextIdeaCard({ heading, description }: TextIdeaCardData) {
  return (
    <article className={`${baseCardClass} flex min-h-[300px] flex-col items-center justify-center px-7 py-10`}>
      <h3 className="text-center text-[14px] leading-tight tracking-wide text-zinc-900 oxygen-bold">{heading}</h3>
      <p className="mt-14 text-center text-[18px] leading-snug text-zinc-900 inter-regular">{description}</p>
    </article>
  );
}

function CardColumn({ cards }: { cards: CardData[] }) {
  return (
    <div className="flex min-w-0 flex-1 flex-col gap-4 sm:gap-5">
      {cards.map((card, index) => {
        if (card.type === "image") {
          return <ImageCard key={`${card.title}-${index}`} {...card} />;
        }

        if (card.type === "sticky") {
          return <StickyNoteCard key={`${card.title}-${index}`} {...card} />;
        }

        if (card.type === "textIdea") {
          return <TextIdeaCard key={`${card.heading}-${index}`} {...card} />;
        }

        return null;
      })}
    </div>
  );
}

export default function ProfileBoardPage() {
  return (
    <main className="no-scrollbar min-h-[100svh] w-screen overflow-x-hidden overflow-y-auto bg-black">
      <div className="relative mx-auto w-full max-w-full overflow-hidden bg-[#fbfbfb] px-3 pb-10 pt-5 sm:max-w-[440px] sm:px-4">
        <header className="mb-5 flex items-center justify-between gap-2">
          <Link
            href="/"
            className="rounded-full bg-[#FBFBFB] p-2 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.10)] flex-shrink-0"
            aria-label="Home"
          >
            <Image src="/home.png" alt="Home" width={30} height={30} />
          </Link>
          <button
            type="button"
            className="flex h-12 w-12 items-center justify-center text-white flex-shrink-0"
            aria-label="Add"
          >
            <Image src="/plusIcon.png" alt="Add" width={50} height={50} />
          </button>
        </header>

        <div className="relative mb-7">
          <input
            placeholder="Search your Interests..."
            className="w-full rounded-full border border-zinc-200/70 bg-white px-3 py-2 text-xs shadow-[0_8px_18px_rgba(0,0,0,0.08)] focus:outline-none sm:px-4 sm:py-3 sm:text-sm"
          />
        </div>

        <div className="mx-auto flex w-full justify-center gap-3 sm:gap-4">
          <CardColumn cards={leftColumnCards} />
          <CardColumn cards={rightColumnCards} />
        </div>
      </div>
    </main>
  );
}
