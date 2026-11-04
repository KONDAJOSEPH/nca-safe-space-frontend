import { Case, REGIONS, STATUSES } from "./types";

const TITLES = ["Welfare check", "Housing support", "Legal referral", "Counselling request", "Medical escort", "Follow-up visit", "Document help"];

export function seedCases(): Case[] {
  return Array.from({ length: 23 }, (_, i) => ({
    id: `NCA-${1040 + i}`,
    title: TITLES[i % 7],
    region: REGIONS[(i * 3) % 4],
    date: `2026-${String(1 + ((i * 5) % 10)).padStart(2, "0")}-${String(1 + ((i * 7) % 27)).padStart(2, "0")}`,
    status: STATUSES[(i * 5 + (i % 4)) % 3],
    x: (i * 37) % 100,
    y: (i * 53) % 100,
  }));
}

export const DEMO_ACCOUNTS = {
  Admin: ["kondajoseph019@gmail.com", "Admin#2026"],
  Staff: ["staff@nca.org", "Staff#2026"],
  Viewer: ["viewer@nca.org", "View#2026"],
} as const;
