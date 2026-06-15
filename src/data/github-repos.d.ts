declare module "@/data/github-repos.generated.json" {
  export interface GithubProject {
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

  const repos: GithubProject[];
  export default repos;
}
