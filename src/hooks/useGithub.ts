"use client";

import useSWR from "swr";

interface GithubProject {
  id: number;
  title: string;
  description: string;
  url: string;
  demo: string | null;
  language: string | null;
  stars: number;
  fork: boolean;
  topics: string[];
  updatedAt: string;
}

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function useGithub(username: string) {
  const { data, error } = useSWR<{ projects: GithubProject[] }>(
    `/api/github?username=${username}`,
    fetcher,
    { revalidateOnFocus: false, refreshInterval: 600000 } // 10min
  );

  return {
    projects: data?.projects?.filter((p) => !p.fork) || [],
    loading: !data && !error,
    error,
  };
}
