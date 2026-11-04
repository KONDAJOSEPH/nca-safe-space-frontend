export type Role = "Admin" | "Staff" | "Viewer";
export type Status = "Active" | "Resolved" | "Pending";
export type Region = "North" | "Central" | "East" | "West";
export type Lang = "en" | "ar";

export interface Case {
  id: string;
  title: string;
  region: Region;
  date: string; // YYYY-MM-DD
  status: Status;
  notes?: string;
  photo?: string; // data URL or remote URL
  x: number; // 0-100 position inside its region (map pin)
  y: number;
}
export interface User { email: string; role: Role }
export type NewCase = Pick<Case, "id" | "title" | "region" | "date" | "notes" | "photo">;

export const REGIONS: Region[] = ["North", "Central", "East", "West"];
export const STATUSES: Status[] = ["Active", "Resolved", "Pending"];
