import Image from "next/image";
import Link from "next/link";
import HomeIcon from "../../public/home.png";
import PlusIcon from "../../public/plusIcon.png";

type BoardItem = {
  id: string;
  title: string;
  image?: string;
  variant: "image" | "sticky" | "text" | "bookmark" | "threads";
};

const boardItems: BoardItem[] = [
  { id: "1", title: "Create Outfits", image: "/createOutfits.png", variant: "image" },
  { id: "2", title: "Onboarding Clients", variant: "sticky" },
  { id: "3", title: "Shoot One Profile Pic Image", image: "/focuss.jpg", variant: "image" },
  { id: "4", title: "Create a Idea Bucket", image: "/book2.jpg", variant: "image" },
  { id: "5", title: "Create a carousel post - Month Dump", image: "/book3.jpg", variant: "image" },
  {
    id: "6",
    title: "SCROLL-STOPPING HOOKS\n\nCreate 10 Hooks for your upcoming Content",
    variant: "text",
  },
  { id: "7", title: "Use/Create Automations", image: "/craftxImg.png", variant: "image" },
  { id: "8", title: "Beyond Basic. Top Tier. Elite. Exceptionally Good.", variant: "bookmark" },
  { id: "9", title: "Learn Only 10 New Words", image: "/crochet.png", variant: "image" },
  { id: "10", title: "Spend 10 mins on Threads", variant: "threads" },
  { id: "11", title: "Deep Work Sprint", image: "/guitar.png", variant: "image" },
  { id: "12", title: "Plan Weekly Content", image: "/starbucks.jpg", variant: "image" },
];

function BoardCard({ item }: { item: BoardItem }) {
  if (item.variant === "sticky") {
    return (
      <article className="rounded-[26px] bg-white p-4 shadow-3d-card">
        <div className="mx-auto w-[130px] rotate-2 rounded-[12px] bg-[#f8d447] px-3 py-4 text-center text-[18px] leading-tight text-zinc-900 caveat-brush-regular shadow-[0_10px_18px_rgba(0,0,0,0.2)]">
          <p>Onboarding</p>
          <p>Clients</p>
        </div>
      </article>
    );
  }

  if (item.variant === "text") {
    return (
      <article className="rounded-[26px] bg-white px-4 py-8 text-center shadow-3d-card">
        <p className="whitespace-pre-line text-[20px] leading-tight text-zinc-900 mooli-regular">{item.title}</p>
      </article>
    );
  }

  if (item.variant === "bookmark") {
    return (
      <article className="rounded-[26px] bg-white px-4 py-6 text-center shadow-3d-card">
        <div className="mx-auto mb-4 h-20 w-16 bg-[#ea7a33] [clip-path:polygon(0_0,100%_0,100%_100%,50%_78%,0_100%)]" />
        <p className="text-[18px] leading-snug text-zinc-900 mooli-regular">{item.title}</p>
      </article>
    );
  }

  if (item.variant === "threads") {
    return (
      <article className="rounded-[26px] bg-white p-3 text-center shadow-3d-card">
        <div className="rounded-[18px] bg-black py-3 text-[72px] leading-none text-white">@</div>
        <p className="pt-3 text-[18px] leading-tight text-zinc-900 mooli-regular">{item.title}</p>
      </article>
    );
  }

  return (
    <article className="rounded-[26px] bg-white p-2 shadow-3d-card">
      <img
        src={item.image}
        alt={item.title}
        className="w-full rounded-[18px] object-cover shadow-3d-inner"
      />
      <p className="px-2 pb-2 pt-3 text-center text-[18px] leading-tight text-zinc-900 mooli-regular">
        {item.title}
      </p>
    </article>
  );
}

export default function ProfileBoardPage() {
  return (
    <main className="min-h-70 bg-[#cfcfcf] px-4 py-6">
      <section className="mx-auto w-full max-w-[430px] rounded-[38px] bg-[#f3f3f3] px-5 pb-8 pt-5">
        <header className="mb-5 flex items-center justify-between">
          <Link href="/" aria-label="Go home" className="rounded-full p-1">
            <Image src={HomeIcon} alt="Home" width={30} height={30} />
          </Link>
          <button type="button" aria-label="Add" className="h-9 w-9">
            <Image src={PlusIcon} alt="Add" width={36} height={36} />
          </button>
        </header>

        <input
          placeholder="Search your Interests..."
          className="mb-7 w-full rounded-[14px] border border-zinc-400/70 bg-transparent px-4 py-2.5 text-[14px] text-zinc-700 placeholder:text-zinc-600 mooli-regular focus:outline-none"
        />

        <div className="columns-2 gap-4">
          {boardItems.map((item) => (
            <div key={item.id} className="mb-4 break-inside-avoid">
              <BoardCard item={item} />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
