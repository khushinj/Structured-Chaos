export type SectionKey = "pages" | "fonts" | "books" | "hobbies" | "grooming" | "fitness" | "explore";

export type InsightData = {
  rating?: string;
  keyLesson?: string;
  favoriteQuote?: string;
  thinkingShift?: string;

  startedDate?: string;
  whyEnjoy?: string;
  skillLevel?: string;
  skillProgress?: number;
  goal?: string;

  routineType?: "Morning" | "Night" | "Morning + Night" | "Custom";
  routineSteps?: string[];
  productsUsed?: string;
  result?: string;

  workoutFocus?: string;
  currentStreak?: string;
  workoutRoutine?: string;
  energyLevel?: number;

  placeWhy?: string;
  bestMemory?: string;
  bestOrder?: string;
  vibe?: string;

  socialHandle?: string;
  contentTheme?: string;
  whatIShare?: string;
  platformLink?: string;

  previewText?: string;
  personality?: string;
  usage?: string;
};

export type InsightCard = {
  id?: string;
  title?: string;
  image?: string;
  description?: string;
  handle?: string;
  name?: string;
  insight?: InsightData;
};

const SECTION_INSIGHT_DEFAULTS: Record<SectionKey, InsightData> = {
  books: {
    rating: "",
    keyLesson: "",
    favoriteQuote: "",
    thinkingShift: "",
  },
  hobbies: {
    startedDate: "",
    whyEnjoy: "",
    skillLevel: "",
    skillProgress: 20,
    goal: "",
  },
  grooming: {
    routineType: "Morning",
    routineSteps: [""],
    productsUsed: "",
    result: "",
  },
  fitness: {
    workoutFocus: "",
    currentStreak: "",
    workoutRoutine: "",
    energyLevel: 3,
  },
  explore: {
    placeWhy: "",
    bestMemory: "",
    bestOrder: "",
    vibe: "",
  },
  pages: {
    socialHandle: "",
    contentTheme: "",
    whatIShare: "",
    platformLink: "",
  },
  fonts: {
    previewText: "The quick brown fox jumps over the lazy dog",
    personality: "",
    usage: "",
  },
};

export const sectionLabel: Record<SectionKey, string> = {
  books: "Books",
  hobbies: "Hobbies",
  grooming: "Grooming",
  fitness: "Fitness",
  explore: "Explore",
  pages: "Pages",
  fonts: "Fonts",
};

export const getDefaultInsight = (section: SectionKey): InsightData => {
  const base = SECTION_INSIGHT_DEFAULTS[section];
  return {
    ...base,
    routineSteps: [...(base.routineSteps ?? [])],
  };
};

export const normalizeInsight = (section: SectionKey, insight?: InsightData): InsightData => {
  const defaults = getDefaultInsight(section);
  return {
    ...defaults,
    ...(insight ?? {}),
    routineSteps: Array.isArray(insight?.routineSteps)
      ? insight?.routineSteps.filter((item) => typeof item === "string")
      : defaults.routineSteps,
  };
};

const hasText = (value?: string) => Boolean(value && value.trim());

export const validateInsightBySection = (section: SectionKey, insight: InsightData): string => {
  if (section === "books") {
    if (!hasText(insight.rating) || !hasText(insight.keyLesson) || !hasText(insight.favoriteQuote) || !hasText(insight.thinkingShift)) {
      return "Fill rating, key lesson, favorite quote, and how it changed your thinking.";
    }
  }

  if (section === "hobbies") {
    if (!hasText(insight.startedDate) || !hasText(insight.whyEnjoy) || !hasText(insight.skillLevel) || !hasText(insight.goal)) {
      return "Fill started date, why you enjoy it, skill level, and goal.";
    }
  }

  if (section === "grooming") {
    const steps = insight.routineSteps?.map((step) => step.trim()).filter(Boolean) ?? [];
    if (!hasText(insight.routineType) || steps.length === 0 || !hasText(insight.productsUsed) || !hasText(insight.result)) {
      return "Fill routine type, at least one routine step, products used, and result.";
    }
  }

  if (section === "fitness") {
    if (!hasText(insight.workoutFocus) || !hasText(insight.currentStreak) || !hasText(insight.workoutRoutine)) {
      return "Fill workout focus, streak, and routine.";
    }
  }

  if (section === "explore") {
    if (!hasText(insight.placeWhy) || !hasText(insight.bestMemory) || !hasText(insight.vibe)) {
      return "Fill why you like this place, best memory, and vibe.";
    }
  }

  if (section === "pages") {
    if (!hasText(insight.socialHandle) || !hasText(insight.contentTheme) || !hasText(insight.whatIShare) || !hasText(insight.platformLink)) {
      return "Fill social handle, content theme, what you share, and platform link.";
    }
  }

  if (section === "fonts") {
    if (!hasText(insight.previewText) || !hasText(insight.personality) || !hasText(insight.usage)) {
      return "Fill preview text, font personality, and where you use this font.";
    }
  }

  return "";
};
