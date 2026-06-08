"use client";

import useSWR from "swr";

interface NowcoderData {
  handle: string;
  practiceCount: number;
  contestCount: number;
  rating: number;
}

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function useNowcoder(handle: string) {
  const { data, error } = useSWR<NowcoderData>(
    `/api/nowcoder?handle=${handle}`,
    fetcher,
    { revalidateOnFocus: false, refreshInterval: 300000 }
  );

  return { data: data || null, loading: !data && !error, error };
}
