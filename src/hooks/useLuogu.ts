"use client";

import useSWR from "swr";

interface LuoguData {
  handle: string;
  uid: number;
  level: string;
  solvedCount: number;
}

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function useLuogu(handle: string) {
  const { data, error } = useSWR<LuoguData>(
    `/api/luogu?handle=${encodeURIComponent(handle)}`,
    fetcher,
    { revalidateOnFocus: false, refreshInterval: 300000 }
  );

  return { data: data || null, loading: !data && !error, error };
}
