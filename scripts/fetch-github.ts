/**
 * Build-time GitHub repos fetcher.
 *
 * Runs as a `prebuild` step (and via `npm run fetch:github`). Fetches the
 * public repos for the configured user and writes them to a static JSON file
 * that the projects page imports directly. This keeps the GitHub token out of
 * the client bundle and sidesteps browser CORS / per-IP rate limits.
 *
 * Failure policy: if the fetch fails and a previous JSON exists, we keep it
 * (stale data beats no data). If no previous data exists, we write an empty
 * array so the build never breaks. The script always exits 0 — it must not
 * block `next build`.
 */
import fs from "node:fs";
import path from "node:path";

const USERNAME = "Dosaka-Lin";
const OUT_FILE = path.join(
  process.cwd(),
  "src",
  "data",
  "github-repos.generated.json"
);

interface RawRepo {
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
  archived?: boolean;
}

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

function writeEmpty(): void {
  fs.writeFileSync(OUT_FILE, "[]\n", "utf-8");
  console.warn("[fetch-github] No previous data — wrote empty array.");
}

async function main(): Promise<void> {
  const token = process.env.GITHUB_TOKEN;
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "Dosaka-Blog",
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
    console.log("[fetch-github] Using GITHUB_TOKEN (authenticated).");
  } else {
    console.warn(
      "[fetch-github] No GITHUB_TOKEN — using unauthenticated mode (60 req/h/IP)."
    );
  }

  try {
    const res = await fetch(
      `https://api.github.com/users/${USERNAME}/repos?sort=updated&per_page=30`,
      { headers }
    );

    if (!res.ok) {
      throw new Error(`GitHub API responded ${res.status} ${res.statusText}`);
    }

    const repos = (await res.json()) as RawRepo[];

    const projects: GithubProject[] = repos
      .filter((r) => !r.fork && !r.archived)
      .map((r) => ({
        id: r.id,
        title: r.name,
        description: r.description || "暂无描述",
        url: r.html_url,
        demo: r.homepage || null,
        language: r.language,
        stars: r.stargazers_count,
        fork: r.fork,
        topics: r.topics || [],
        updatedAt: r.updated_at,
      }));

    fs.writeFileSync(OUT_FILE, JSON.stringify(projects, null, 2) + "\n", "utf-8");
    console.log(
      `[fetch-github] Wrote ${projects.length} repos to ${path.relative(
        process.cwd(),
        OUT_FILE
      )}.`
    );
  } catch (err) {
    console.error("[fetch-github] Fetch failed:", (err as Error).message);
    if (fs.existsSync(OUT_FILE)) {
      console.warn("[fetch-github] Keeping existing JSON (stale data retained).");
    } else {
      writeEmpty();
    }
    // Always exit 0 — never block the build.
  }
}

main();
