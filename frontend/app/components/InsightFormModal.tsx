"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { InsightData, SectionKey } from "./insightUtils";
import { sectionLabel } from "./insightUtils";

type InsightFormModalProps = {
  isOpen: boolean;
  section: SectionKey | null;
  draft: InsightData;
  error?: string;
  onChange: (next: InsightData) => void;
  onClose: () => void;
  onSave: () => void;
};

const updateSteps = (draft: InsightData, index: number, value: string): InsightData => {
  const steps = [...(draft.routineSteps ?? [""])];
  steps[index] = value;
  return { ...draft, routineSteps: steps };
};

export default function InsightFormModal({
  isOpen,
  section,
  draft,
  error,
  onChange,
  onClose,
  onSave,
}: InsightFormModalProps) {
  const renderFields = () => {
    if (!section) {
      return null;
    }

    if (section === "books") {
      return (
        <>
          <input
            value={draft.rating ?? ""}
            onChange={(event) => onChange({ ...draft, rating: event.target.value })}
            placeholder="Rating (1-10)"
            className="w-full rounded-xl border border-zinc-300 px-3 py-2 text-sm"
          />
          <textarea
            value={draft.keyLesson ?? ""}
            onChange={(event) => onChange({ ...draft, keyLesson: event.target.value })}
            placeholder="Key lesson"
            rows={2}
            className="w-full rounded-xl border border-zinc-300 px-3 py-2 text-sm"
          />
          <textarea
            value={draft.favoriteQuote ?? ""}
            onChange={(event) => onChange({ ...draft, favoriteQuote: event.target.value })}
            placeholder="Favorite quote"
            rows={2}
            className="w-full rounded-xl border border-zinc-300 px-3 py-2 text-sm"
          />
          <textarea
            value={draft.thinkingShift ?? ""}
            onChange={(event) => onChange({ ...draft, thinkingShift: event.target.value })}
            placeholder="How it changed my thinking"
            rows={2}
            className="w-full rounded-xl border border-zinc-300 px-3 py-2 text-sm"
          />
        </>
      );
    }

    if (section === "hobbies") {
      return (
        <>
          <input
            value={draft.startedDate ?? ""}
            onChange={(event) => onChange({ ...draft, startedDate: event.target.value })}
            placeholder="Started date"
            className="w-full rounded-xl border border-zinc-300 px-3 py-2 text-sm"
          />
          <textarea
            value={draft.whyEnjoy ?? ""}
            onChange={(event) => onChange({ ...draft, whyEnjoy: event.target.value })}
            placeholder="Why I enjoy it"
            rows={2}
            className="w-full rounded-xl border border-zinc-300 px-3 py-2 text-sm"
          />
          <input
            value={draft.skillLevel ?? ""}
            onChange={(event) => onChange({ ...draft, skillLevel: event.target.value })}
            placeholder="Current skill level"
            className="w-full rounded-xl border border-zinc-300 px-3 py-2 text-sm"
          />
          <div className="rounded-xl border border-zinc-300 px-3 py-2">
            <label className="mb-1 block text-xs uppercase tracking-wide text-zinc-500">Skill progress: {draft.skillProgress ?? 0}%</label>
            <input
              type="range"
              min={0}
              max={100}
              value={draft.skillProgress ?? 0}
              onChange={(event) => onChange({ ...draft, skillProgress: Number(event.target.value) })}
              className="w-full"
            />
          </div>
          <textarea
            value={draft.goal ?? ""}
            onChange={(event) => onChange({ ...draft, goal: event.target.value })}
            placeholder="Goal"
            rows={2}
            className="w-full rounded-xl border border-zinc-300 px-3 py-2 text-sm"
          />
        </>
      );
    }

    if (section === "grooming") {
      return (
        <>
          <select
            value={draft.routineType ?? "Morning"}
            onChange={(event) => onChange({ ...draft, routineType: event.target.value as InsightData["routineType"] })}
            className="w-full rounded-xl border border-zinc-300 px-3 py-2 text-sm"
          >
            <option>Morning</option>
            <option>Night</option>
            <option>Morning + Night</option>
            <option>Custom</option>
          </select>

          <div className="rounded-xl border border-zinc-300 p-3">
            <p className="mb-2 text-xs uppercase tracking-wide text-zinc-500">Routine steps</p>
            {(draft.routineSteps ?? [""]).map((step, index) => (
              <input
                key={index}
                value={step}
                onChange={(event) => onChange(updateSteps(draft, index, event.target.value))}
                placeholder={`Step ${index + 1}`}
                className="mb-2 w-full rounded-xl border border-zinc-300 px-3 py-2 text-sm last:mb-0"
              />
            ))}
            <div className="mt-2 flex items-center gap-2">
              <button
                type="button"
                onClick={() => onChange({ ...draft, routineSteps: [...(draft.routineSteps ?? []), ""] })}
                className="rounded-full border border-zinc-300 px-3 py-1 text-xs"
              >
                Add step
              </button>
              {(draft.routineSteps?.length ?? 0) > 1 && (
                <button
                  type="button"
                  onClick={() => onChange({ ...draft, routineSteps: (draft.routineSteps ?? []).slice(0, -1) })}
                  className="rounded-full border border-zinc-300 px-3 py-1 text-xs"
                >
                  Remove last
                </button>
              )}
            </div>
          </div>

          <textarea
            value={draft.productsUsed ?? ""}
            onChange={(event) => onChange({ ...draft, productsUsed: event.target.value })}
            placeholder="Products used"
            rows={2}
            className="w-full rounded-xl border border-zinc-300 px-3 py-2 text-sm"
          />
          <textarea
            value={draft.result ?? ""}
            onChange={(event) => onChange({ ...draft, result: event.target.value })}
            placeholder="Result after routine"
            rows={2}
            className="w-full rounded-xl border border-zinc-300 px-3 py-2 text-sm"
          />
        </>
      );
    }

    if (section === "fitness") {
      return (
        <>
          <input
            value={draft.workoutFocus ?? ""}
            onChange={(event) => onChange({ ...draft, workoutFocus: event.target.value })}
            placeholder="Workout focus"
            className="w-full rounded-xl border border-zinc-300 px-3 py-2 text-sm"
          />
          <input
            value={draft.currentStreak ?? ""}
            onChange={(event) => onChange({ ...draft, currentStreak: event.target.value })}
            placeholder="Current streak"
            className="w-full rounded-xl border border-zinc-300 px-3 py-2 text-sm"
          />
          <textarea
            value={draft.workoutRoutine ?? ""}
            onChange={(event) => onChange({ ...draft, workoutRoutine: event.target.value })}
            placeholder="Workout routine"
            rows={2}
            className="w-full rounded-xl border border-zinc-300 px-3 py-2 text-sm"
          />
          <div className="rounded-xl border border-zinc-300 px-3 py-2">
            <label className="mb-1 block text-xs uppercase tracking-wide text-zinc-500">Energy level: {draft.energyLevel ?? 0}/5</label>
            <input
              type="range"
              min={0}
              max={5}
              value={draft.energyLevel ?? 0}
              onChange={(event) => onChange({ ...draft, energyLevel: Number(event.target.value) })}
              className="w-full"
            />
          </div>
        </>
      );
    }

    if (section === "explore") {
      return (
        <>
          <textarea
            value={draft.placeWhy ?? ""}
            onChange={(event) => onChange({ ...draft, placeWhy: event.target.value })}
            placeholder="Why I like this place"
            rows={2}
            className="w-full rounded-xl border border-zinc-300 px-3 py-2 text-sm"
          />
          <textarea
            value={draft.bestMemory ?? ""}
            onChange={(event) => onChange({ ...draft, bestMemory: event.target.value })}
            placeholder="Best memory here"
            rows={2}
            className="w-full rounded-xl border border-zinc-300 px-3 py-2 text-sm"
          />
          <input
            value={draft.bestOrder ?? ""}
            onChange={(event) => onChange({ ...draft, bestOrder: event.target.value })}
            placeholder="Best order"
            className="w-full rounded-xl border border-zinc-300 px-3 py-2 text-sm"
          />
          <input
            value={draft.vibe ?? ""}
            onChange={(event) => onChange({ ...draft, vibe: event.target.value })}
            placeholder="Vibe"
            className="w-full rounded-xl border border-zinc-300 px-3 py-2 text-sm"
          />
        </>
      );
    }

    if (section === "pages") {
      return (
        <>
          <input
            value={draft.socialHandle ?? ""}
            onChange={(event) => onChange({ ...draft, socialHandle: event.target.value })}
            placeholder="Social handle"
            className="w-full rounded-xl border border-zinc-300 px-3 py-2 text-sm"
          />
          <textarea
            value={draft.contentTheme ?? ""}
            onChange={(event) => onChange({ ...draft, contentTheme: event.target.value })}
            placeholder="Content theme"
            rows={2}
            className="w-full rounded-xl border border-zinc-300 px-3 py-2 text-sm"
          />
          <textarea
            value={draft.whatIShare ?? ""}
            onChange={(event) => onChange({ ...draft, whatIShare: event.target.value })}
            placeholder="What I share there"
            rows={2}
            className="w-full rounded-xl border border-zinc-300 px-3 py-2 text-sm"
          />
          <input
            value={draft.platformLink ?? ""}
            onChange={(event) => onChange({ ...draft, platformLink: event.target.value })}
            placeholder="Platform link"
            className="w-full rounded-xl border border-zinc-300 px-3 py-2 text-sm"
          />
        </>
      );
    }

    return (
      <>
        <textarea
          value={draft.previewText ?? ""}
          onChange={(event) => onChange({ ...draft, previewText: event.target.value })}
          placeholder="Font preview text"
          rows={2}
          className="w-full rounded-xl border border-zinc-300 px-3 py-2 text-sm"
        />
        <textarea
          value={draft.personality ?? ""}
          onChange={(event) => onChange({ ...draft, personality: event.target.value })}
          placeholder="Font personality description"
          rows={2}
          className="w-full rounded-xl border border-zinc-300 px-3 py-2 text-sm"
        />
        <textarea
          value={draft.usage ?? ""}
          onChange={(event) => onChange({ ...draft, usage: event.target.value })}
          placeholder="Where I use this font"
          rows={2}
          className="w-full rounded-xl border border-zinc-300 px-3 py-2 text-sm"
        />
      </>
    );
  };

  return (
    <AnimatePresence>
      {isOpen && section && (
        <motion.div
          className="fixed inset-0 z-[95] bg-black/35 backdrop-blur-sm"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="flex min-h-full items-center justify-center px-3 py-6">
            <motion.div
              className="w-full max-w-[620px] rounded-[28px] bg-white p-5 sm:p-6 shadow-[0_25px_90px_-30px_rgba(0,0,0,0.6)]"
              onClick={(event) => event.stopPropagation()}
              initial={{ opacity: 0, scale: 0.93, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.24, ease: "easeOut" }}
            >
              <div className="mb-4 flex items-center justify-between gap-2">
                <h3 className="text-xl mooli-regular">{sectionLabel[section]} Insight Details</h3>
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-full border border-zinc-300 px-3 py-1 text-xs"
                >
                  Close
                </button>
              </div>

              <div className="max-h-[66vh] space-y-3 overflow-y-auto pr-1">{renderFields()}</div>

              {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

              <button
                type="button"
                onClick={onSave}
                className="mt-4 w-full rounded-xl bg-zinc-900 py-2.5 text-sm text-white"
              >
                Save Insights
              </button>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
