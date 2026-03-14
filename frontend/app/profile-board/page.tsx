"use client";

import Image from "next/image";
import Link from "next/link";

type ImageCardData = {
  type: "image";
  title: string;
  image: string;
  alt: string;
  imageHeightClass?: string;
  imageFitClass?: string;
  titleClassName?: string;
};

type StickyNoteCardData = {
  type: "sticky";
  title: string;
  image: string;
  imageHeightClass?: string;
};

type TextIdeaCardData = {
  type: "textIdea";
  heading: string;
  description: string;
  headingClassName?: string;
  descriptionClassName?: string;
};

type SideBySideCardData = {
  type: "split";
  title: string;
  image: string;
  alt: string;
  titleClassName?: string;
};

type IconTextCardData = {
  type: "iconText";
  title: string;
  image: string;
  alt: string;
  cardMinHeightClass?: string;
  imageHeightClass?: string;
  titleClassName?: string;
};

type PosterCardData = {
  type: "poster";
  image: string;
  alt: string;
  imageHeightClass?: string;
  imageClassName?: string;
  useNativeImg?: boolean;
};

type CardData =
  | ImageCardData
  | StickyNoteCardData
  | TextIdeaCardData
  | SideBySideCardData
  | IconTextCardData
  | PosterCardData;

const leftColumnCards: CardData[] = [
  {
    type: "image",
    title: "Create Outfits",
    image: "/createOutfits.png",
    alt: "Create Outfits",
    imageHeightClass: "h-[200px]",
    imageFitClass: "block object-contain bg-white",
    titleClassName: "karla-regular !text-[18px] !leading-tight !font-normal",
  },
  {
    type: "image",
    title: "Create a carousel post - Month Dump",
    image: "/CarouselDump.jpg",
    alt: "Create a carousel post - Month Dump",
    imageHeightClass: "h-[184px]",
    titleClassName: "candal-regular",
  },
  {
    type: "image",
    title: "Shoot One Profile Pic Image",
    image: "/ShootImg.jpg",
    alt: "Shoot One Profile Pic Image",
    imageHeightClass: "h-[200px]",
    titleClassName: "instrument-sans-regular",
  },
  {
    type: "image",
    title: "Use/Create Automations",
    image: "/Automations.jpg",
    alt: "Use/Create Automations",
    imageHeightClass: "h-[184px]",
    titleClassName: "days-one-regular",
  },
  {
    type: "poster",
    image: "/Chess.png",
    alt: "Learn Chess",
    imageHeightClass: "h-[278px] sm:h-[306px]",
    useNativeImg: true,
    imageClassName: "block rounded-[30px] drop-shadow-[0_10px_12px_rgba(0,0,0,0.24)]",
  },
];

const rightColumnCards: CardData[] = [
  {
    type: "sticky",
    title: "Onboarding Clients",
    image: "/OnboardingClients.png",
    imageHeightClass: "h-[118px]",
  },
  {
    type: "textIdea",
    heading: "SCROLL-STOPPING HOOKS",
    description: "Create 10 Hooks for your upcoming Content",
    headingClassName: "judson-regular",
  },
  {
    type: "image",
    title: "",
    image: "/Duolingo.png",
    alt: "Learn Only 10 New Words",
    imageHeightClass: "h-[92px]",
  },
  {
    type: "split",
    title: "Create a Idea Bucket",
    image: "/IdeaBucket.jpg",
    alt: "Create a Idea Bucket",
    titleClassName: "merienda-bold !text-[21px] sm:!text-[22px]",
  },
  {
    type: "iconText",
    title: "Beyond Basic.\nTop Tier. Elite.\nExceptionally Good.",
    image: "/Substack.jpg",
    alt: "Beyond Basic. Top Tier. Elite. Exceptionally Good.",
    cardMinHeightClass: "min-h-[234px]",
    imageHeightClass: "h-[136px]",
    titleClassName: "kanit-regular",
  },
  {
    type: "image",
    title: "Spend 10 mins on Threads",
    image: "/Threads.jpg",
    alt: "Spend 10 mins on Threads",
    imageHeightClass: "h-[92px]",
  },
  {
    type: "poster",
    image: "/Tools.png",
    alt: "Try New Tools",
    imageHeightClass: "h-[278px] sm:h-[316px]",
    useNativeImg: true,
    imageClassName: "block rounded-[30px] drop-shadow-[0_10px_12px_rgba(0,0,0,0.24)]",
  },
];

const baseCardClass =
  "origin-top scale-[0.93] sm:scale-100 rounded-[28px] bg-white shadow-[0_14px_30px_-20px_rgba(0,0,0,0.45),0_8px_16px_-14px_rgba(0,0,0,0.22)] transition-transform duration-200 hover:scale-[0.96] sm:hover:scale-[1.02]";

function ImageCard({ title, image, alt, imageHeightClass, imageFitClass, titleClassName }: ImageCardData) {
  return (
    <article className={`${baseCardClass} overflow-hidden p-3`}>
      <Image
        src={image}
        alt={alt}
        width={420}
        height={620}
        sizes="(max-width: 640px) 44vw, 190px"
        className={`${imageHeightClass ?? "h-[184px]"} w-full rounded-[20px] ${imageFitClass ?? "object-cover"}`}
      />
      {title.trim() && (
        <p
          className={`flex min-h-[56px] items-center justify-center px-1 pt-3 text-center text-[14px] leading-snug break-words text-zinc-900 oxygen-bold ${titleClassName ?? ""}`}
        >
          {title}
        </p>
      )}
    </article>
  );
}

function StickyNoteCard({ title, image, imageHeightClass }: StickyNoteCardData) {
  return (
    <article className={`${baseCardClass} overflow-hidden p-3`}>
      <Image
        src={image}
        alt={title}
        width={317}
        height={253}
        sizes="(max-width: 640px) 44vw, 190px"
        className={`${imageHeightClass ?? "h-[118px]"} w-full rounded-[20px] object-cover`}
      />
    </article>
  );
}

function TextIdeaCard({ heading, description, headingClassName, descriptionClassName }: TextIdeaCardData) {
  return (
    <article className={`${baseCardClass} flex min-h-[276px] flex-col items-center justify-center px-7 py-8`}>
      <h3 className={`text-center text-[14px] leading-tight tracking-wide text-zinc-900 oxygen-bold ${headingClassName ?? ""}`}>{heading}</h3>
      <p className={`mt-14 text-center text-[18px] leading-snug text-zinc-900 inter-regular ${descriptionClassName ?? ""}`}>{description}</p>
    </article>
  );
}

function SideBySideCard({ title, image, alt, titleClassName }: SideBySideCardData) {
  return (
    <article className={`${baseCardClass} min-h-[178px] overflow-hidden p-3`}>
      <div className="flex h-full items-center gap-3">
        <Image
          src={image}
          alt={alt}
          width={190}
          height={190}
          sizes="(max-width: 640px) 22vw, 98px"
          className="h-[146px] w-[52%] rounded-[16px] object-cover"
        />
        <p className={`caveat-brush-regular w-[46%] text-center text-[24px] leading-[1.02] break-words text-zinc-900 [word-spacing:1px] ${titleClassName ?? ""}`}>
          {title}
        </p>
      </div>
    </article>
  );
}

function IconTextCard({ title, image, alt, cardMinHeightClass, imageHeightClass, titleClassName }: IconTextCardData) {
  return (
    <article className={`${baseCardClass} overflow-hidden p-3`}>
      <div className={`flex ${cardMinHeightClass ?? "min-h-[296px]"} flex-col items-center justify-start rounded-[20px]`}>
        <Image
          src={image}
          alt={alt}
          width={290}
          height={260}
          sizes="(max-width: 640px) 40vw, 170px"
          className={`${imageHeightClass ?? "h-[154px]"} w-full rounded-[16px] object-contain`}
        />
        <p className={`mt-4 whitespace-pre-line px-2 text-center text-[14px] leading-[1.35] break-words text-zinc-900 oxygen-bold ${titleClassName ?? ""}`}>
          {title}
        </p>
      </div>
    </article>
  );
}

function PosterCard({ image, alt, imageHeightClass, imageClassName, useNativeImg }: PosterCardData) {
  if (useNativeImg) {
    return (
      <article className="origin-top scale-[0.93] sm:scale-100 overflow-visible p-0 transition-transform duration-200 hover:scale-[0.96] sm:hover:scale-[1.02]">
        <img
          src={image}
          alt={alt}
          loading="lazy"
          className={`${imageHeightClass ?? "h-[306px]"} w-full object-cover ${imageClassName ?? ""}`}
        />
      </article>
    );
  }

  return (
    <article className={`${baseCardClass} overflow-hidden rounded-[30px] p-0`}>
      <div className={`relative ${imageHeightClass ?? "h-[306px]"} w-full`}>
        <Image
          src={image}
          alt={alt}
          fill
          sizes="(max-width: 640px) 44vw, 190px"
          className={`object-cover ${imageClassName ?? ""}`}
        />
      </div>
    </article>
  );
}

function CardColumn({ cards }: { cards: CardData[] }) {
  return (
    <div className="flex min-w-0 flex-1 flex-col gap-3 sm:gap-5">
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

        if (card.type === "split") {
          return <SideBySideCard key={`${card.title}-${index}`} {...card} />;
        }

        if (card.type === "iconText") {
          return <IconTextCard key={`${card.title}-${index}`} {...card} />;
        }

        if (card.type === "poster") {
          return <PosterCard key={`${card.alt}-${index}`} {...card} />;
        }

        return null;
      })}
    </div>
  );
}

export default function ProfileBoardPage() {
  return (
    <main className="no-scrollbar min-h-[100svh] w-full overflow-x-hidden overflow-y-auto bg-black">
      <div className="relative mx-auto w-full max-w-[430px] overflow-hidden bg-[#fbfbfb] px-2.5 pb-10 pt-5 sm:max-w-[440px] sm:px-4">
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

        <section className="mt-5 space-y-5">
          <article className={`${baseCardClass} mb-15 overflow-hidden rounded-[30px] px-4 pb-5 pt-4`}>
            <div className="rounded-[22px] border border-zinc-300/85 bg-white p-2">
              <Image
                src="/FunSites.png"
                alt="Explore Fun Sites"
                width={760}
                height={280}
                sizes="(max-width: 640px) 92vw, 390px"
                className="h-[164px] w-full rounded-[18px] object-cover  scale-110"
              />
            </div>
            <p className="pb-3 pt-8 text-center text-[clamp(30px,8vw,38px)] leading-[0.95] text-zinc-900 darumadrop-one-regular">
              Explore Fun Sites
            </p>
          </article>

          <div className="grid grid-cols-2 items-start gap-3 sm:gap-5">
            <article className={`${baseCardClass} overflow-hidden rounded-[30px] bg-white px-3 pb-5 pt-3`}>
              <div className="overflow-hidden rounded-[22px] bg-white p-2">
                <Image
                  src="/TechVault.jpg"
                  alt="Tech Vault"
                  width={420}
                  height={520}
                  sizes="(max-width: 640px) 44vw, 190px"
                    className="h-[185px] w-full scale-[1.12] rounded-[20px] object-contain bg-white"
                />
              </div>
              <p className="pt-3 text-center text-[18px] leading-tight text-zinc-950 genos-bold sm:text-[20px]">Tech Vault</p>
            </article>

            <article className={`${baseCardClass} overflow-hidden rounded-[30px] p-0`}>
              <div className="relative h-[266px] w-full">
                <Image
                  src="/PersonalBranding.jpg"
                  alt="Personal Branding"
                  fill
                  sizes="(max-width: 640px) 44vw, 190px"
                  className="object-cover "
                />
              </div>
            </article>
          </div>

          <article className={`${baseCardClass} overflow-hidden rounded-[30px] bg-white px-3 pb-5 pt-4`}>
            <div className="grid grid-cols-3 gap-3 rounded-[22px] bg-white">
              <Image
                src="/SubImg1.jpg"
                alt="Ideas collage one"
                width={210}
                height={300}
                sizes="(max-width: 640px) 28vw, 120px"
                className="h-[188px] w-full rounded-[18px] object-cover"
              />
              <Image
                src="/SubImg2.jpg"
                alt="Ideas collage two"
                width={210}
                height={300}
                sizes="(max-width: 640px) 28vw, 120px"
                className="h-[188px] w-full rounded-[18px] object-cover"
              />
              <Image
                src="/SubImg3.jpg"
                alt="Ideas collage three"
                width={210}
                height={300}
                sizes="(max-width: 640px) 28vw, 120px"
                className="h-[188px] w-full rounded-[18px] object-cover"
              />
            </div>
            <p className="px-3 pb-2 pt-4 text-center text-[22px] leading-[1.05] text-zinc-950 candal-regular sm:text-[24px]">
              Create your own pic version of ideas
            </p>
          </article>
        </section>
      </div>
    </main>
  );
}
