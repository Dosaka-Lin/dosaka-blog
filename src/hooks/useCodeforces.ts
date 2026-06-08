"use client";

import { useEffect, useState } from "react";
import useSWR from "swr";

interface CodeforcesData {
  handle: string;
  rating: number;
  maxRating: number;
  rank: string;
  contests: Array<{ name: string; rank: number; ratingChange: string }>;
  solvedCount: number;
}

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function useCodeforces(handle: string) {
  const { data, error } = useSWR<CodeforcesData>(
    `/api/codeforces?handle=${handle}`,
    fetcher,
    { revalidateOnFocus: false, refreshInterval: 300000 } // 5min cache
  );

  return {
    data: data || null,
    loading: !data && !error,
    error,
  };
}
