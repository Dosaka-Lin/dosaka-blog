import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const username = request.nextUrl.searchParams.get("username") || "Dosaka";

  try {
    const res = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=20`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
          "User-Agent": "Dosaka-Blog",
        },
        next: { revalidate: 3600 }, // 缓存 1 小时
      }
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch GitHub repos" },
        { status: 502 }
      );
    }

    const repos = await res.json();

    const projects = repos.map((repo: {
      id: number;
      name: string;
      description: string | null;
      html_url: string;
      homepage: string | null;
      language: string | null;
      stargazers_count: number;
      fork: boolean;
      topics: string[];
      updated_at: string;
    }) => ({
      id: repo.id,
      title: repo.name,
      description: repo.description || "暂无描述",
      url: repo.html_url,
      demo: repo.homepage || null,
      language: repo.language,
      stars: repo.stargazers_count,
      fork: repo.fork,
      topics: repo.topics || [],
      updatedAt: repo.updated_at,
    }));

    return NextResponse.json({ projects });
  } catch {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
