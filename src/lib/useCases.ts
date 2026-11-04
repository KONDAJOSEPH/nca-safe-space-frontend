"use client";
import { useQuery } from "@tanstack/react-query";
import { fetchCases } from "./api";

export function useCases() {
  return useQuery({ queryKey: ["cases"], queryFn: fetchCases });
}
