export type LeadStatus = "New" | "In Progress" | "Converted";

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: LeadStatus;
  source: string;
  createdAt: string; // ISO date
}