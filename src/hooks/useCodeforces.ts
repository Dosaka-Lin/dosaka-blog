"use client";

import useSWR from "swr";

interface CodeforcesData {
  handle: string;
  rating: number;
  maxRating: number;
  rank: string;
  contests: Array<{ name: string; rank: number; ratingChange: string }>;
  solvedCount: number;
}

const fetcher = async (): Promise<CodeforcesData> => {
  const handle = "Dosaka";
  const [userRes, ratingRes] = await Promise.all([
    fetch(`https://codeforces.com/api/user.info?handles=${handle}`),
    fetch(`https://codeforces.com/api/user.rating?handle=${handle}`),
  ]);

  if (!userRes.ok) throw new Error("Failed to fetch Codeforces data");

  const userData = await userRes.json();
  const ratingData = await ratingRes.json();

  if (userData.status !== "OK") throw new Error("User not found");

  const user = userData.result[0];
  const contests =
    ratingData.status === "OK"
      ? ratingData.result.slice(-10).map((c: { contestName: string; rank: number; newRating: number; oldRating: number }) => ({
          name: c.contestName,
          rank: c.rank,
          ratingChange: `${c.newRating > c.oldRating ? "+" : ""}${c.newRating - c.oldRating}`,
        }))
      : [];

  return {
    handle: user.handle,
    rating: user.rating || 0,
    maxRating: user.maxRating || 0,
    rank: user.rank || "unrated",
    contests,
    solvedCount: 0,
  };
};

export default function useCodeforces(handle: string) {
  const { data, error } = useSWR<CodeforcesData>(
    "codeforces-data",
    fetcher,
    { revalidateOnFocus: false, refreshInterval: 300000 }
  );

  return {
    data: data || null,
    loading: !data && !error,
    error,
  };
}
