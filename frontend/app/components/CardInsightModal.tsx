"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { InsightCard, SectionKey } from "./insightUtils";
import { normalizeInsight, sectionLabel } from "./insightUtils";

type CardInsightModalProps = {
  isOpen: boolean;
  section: SectionKey | null;
  data: InsightCard | null;
  onClose: () => void;
  onEdit: () => void;
};

const meter = (value: number, max = 5) => {
  const clamped = Math.max(0, Math.min(max, value));
  return "▰".repeat(clamped) + "▱".repeat(max - clamped);
};

export default function CardInsightModal({ isOpen, section, data, onClose, onEdit }: CardInsightModalProps) {
  const insight = section ? normalizeInsight(section, data?.insight) : null;

  const renderContent = () => {
    if (!section || !insight) {
      return null;
    }

    if (section === "books") {
      return (
        <div className="space-y-3">
          <img
            src={data?.image || "/ProfileCardImg.jpg"}
            alt={data?.title || "Book cover"}
            className="h-52 w-full rounded-2xl object-cover"
          />
          <h3 className="text-2xl mooli-regular">{data?.title || "Untitled Book"}</h3>
          <p className="text-sm text-zinc-700">Rating: {insight.rating || "-"}/10</p>
          <p className="text-sm text-zinc-700">Key Lesson: {insight.keyLesson || "-"}</p>
          <p className="text-sm text-zinc-700">Favorite Quote: {insight.favoriteQuote || "-"}</p>
          <p className="text-sm text-zinc-700">Applied in life: {insight.thinkingShift || "-"}</p>
        </div>
      );
    }

    if (section === "hobbies") {
      return (
        <div className="space-y-3">
          <img
            src={data?.image || "/ProfileCardImg.jpg"}
            alt={data?.title || "Hobby image"}
            className="h-52 w-full rounded-2xl object-cover"
          />
          <h3 className="text-2xl mooli-regular">{data?.title || "Untitled Hobby"}</h3>
          <p className="text-sm text-zinc-700">Started: {insight.startedDate || "-"}</p>
          <p className="text-sm text-zinc-700">Why I love it: {insight.whyEnjoy || "-"}</p>
          <div>
            <p className="text-sm text-zinc-700">Skill Level: {insight.skillLevel || "-"}</p>
            <div className="mt-2 h-2 w-full rounded-full bg-zinc-200">
              <div className="h-2 rounded-full bg-zinc-800" style={{ width: `${insight.skillProgress ?? 0}%` }} />
            </div>
          </div>
          <p className="text-sm text-zinc-700">Goal: {insight.goal || "-"}</p>
        </div>
      );
    }

    if (section === "grooming") {
      return (
        <div className="space-y-3">
          <img
            src={data?.image || "/ProfileCardImg.jpg"}
            alt={data?.title || "Routine image"}
            className="h-52 w-full rounded-2xl object-cover"
          />
          <h3 className="text-2xl mooli-regular">{data?.title || "Routine"}</h3>
          <p className="text-sm text-zinc-700">{insight.routineType || "Routine"} Routine</p>
          <div className="rounded-xl bg-zinc-50 p-3">
            <p className="text-xs uppercase tracking-wide text-zinc-500">Routine Steps</p>
            <ol className="mt-2 space-y-1 text-sm text-zinc-700">
              {(insight.routineSteps ?? []).filter(Boolean).map((step, index) => (
                <li key={`${step}-${index}`}>{index + 1}. {step}</li>
              ))}
            </ol>
          </div>
          <p className="text-sm text-zinc-700">Products: {insight.productsUsed || "-"}</p>
          <p className="text-sm text-zinc-700">Result: {insight.result || "-"}</p>
        </div>
      );
    }

    if (section === "fitness") {
      return (
        <div className="space-y-3">
          <img
            src={data?.image || "/ProfileCardImg.jpg"}
            alt={data?.title || "Fitness image"}
            className="h-52 w-full rounded-2xl object-cover"
          />
          <h3 className="text-2xl mooli-regular">{data?.title || "Fitness"}</h3>
          <p className="text-sm text-zinc-700">Focus: {insight.workoutFocus || "-"}</p>
          <p className="text-sm text-zinc-700">Workout: {insight.workoutRoutine || "-"}</p>
          <p className="text-sm text-zinc-700">Streak: {insight.currentStreak || "-"}</p>
          <p className="text-sm text-zinc-700">Energy: {meter(insight.energyLevel ?? 0)}</p>
        </div>
      );
    }

    if (section === "explore") {
      return (
        <div className="space-y-3">
          <img
            src={data?.image || "/ProfileCardImg.jpg"}
            alt={data?.title || "Place image"}
            className="h-52 w-full rounded-2xl object-cover"
          />
          <h3 className="text-2xl mooli-regular">{data?.title || "Untitled Place"}</h3>
          <p className="text-sm text-zinc-700">Why I go here: {insight.placeWhy || "-"}</p>
          <p className="text-sm text-zinc-700">Best memory: {insight.bestMemory || "-"}</p>
          <p className="text-sm text-zinc-700">Best order: {insight.bestOrder || "-"}</p>
          <p className="text-sm text-zinc-700">Vibe: {insight.vibe || "-"}</p>
        </div>
      );
    }

    if (section === "pages") {
      return (
        <div className="space-y-3">
          <img
            src={data?.image || "/ProfileCardImg.jpg"}
            alt={data?.handle || "Page image"}
            className="h-52 w-full rounded-2xl object-cover"
          />
          <h3 className="text-2xl mooli-regular">{data?.handle || "Page"}</h3>
          <p className="text-sm text-zinc-700">Social Handle: {insight.socialHandle || data?.handle || "-"}</p>
          <p className="text-sm text-zinc-700">Content Theme: {insight.contentTheme || "-"}</p>
          <p className="text-sm text-zinc-700">What I share: {insight.whatIShare || data?.description || "-"}</p>
          <a
            href={insight.platformLink || "#"}
            target="_blank"
            rel="noreferrer"
            className="inline-block text-sm text-zinc-900 underline"
          >
            Visit platform
          </a>
        </div>
      );
    }

    return (
      <div className="space-y-3">
        <h3 className="text-2xl mooli-regular">{data?.name || "Font"}</h3>
        <div className="rounded-xl bg-zinc-50 p-4">
          <p className="text-2xl">{insight.previewText || data?.name || "Font preview"}</p>
        </div>
        <p className="text-sm text-zinc-700">Personality: {insight.personality || "-"}</p>
        <p className="text-sm text-zinc-700">Usage: {insight.usage || "-"}</p>
      </div>
    );
  };

  return (
    <AnimatePresence>
      {isOpen && section && data && (
        <motion.div
          className="fixed inset-0 z-[90] bg-black/35 backdrop-blur-sm"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="flex min-h-full items-center justify-center px-3 py-6">
            <motion.div
              className="w-full max-w-[560px] rounded-[28px] bg-white p-5 sm:p-6 shadow-[0_25px_90px_-30px_rgba(0,0,0,0.6)]"
              onClick={(event) => event.stopPropagation()}
              initial={{ opacity: 0, scale: 0.93, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.24, ease: "easeOut" }}
            >
              <div className="mb-4 flex items-center justify-between gap-3">
                <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">{sectionLabel[section]} insight</p>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={onEdit}
                    className="rounded-full border border-zinc-300 px-3 py-1 text-xs text-zinc-700"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="rounded-full border border-zinc-300 px-3 py-1 text-xs text-zinc-700"
                  >
                    Close
                  </button>
                </div>
              </div>

              <div className="max-h-[70vh] overflow-y-auto pr-1">{renderContent()}</div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
