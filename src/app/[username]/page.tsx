import { Suspense } from "react";
import { PageComponent } from "./page-component";
import { DashboardData, GitHubRepo, GitHubUser } from "./types";
import { DashboardSkeleton } from "./skeleton";

async function fetchGitHubData({
  username,
}: {
  username: string;
}): Promise<DashboardData> {
  try {
    // Fetch user profile and repositories in parallel
    const [userResponse, reposResponse] = await Promise.all([
      fetch(`https://api.github.com/users/${username}`, {
        headers: {
          Accept: "application/vnd.github.v3+json",
          "User-Agent": "Next.js GitHub Dashboard",
        },
      }),
      fetch(
        `https://api.github.com/users/${username}/repos?sort=updated&per_page=10`,
        {
          headers: {
            Accept: "application/vnd.github.v3+json",
            "User-Agent": "Next.js GitHub Dashboard",
          },
        }
      ),
    ]);

    if (!userResponse.ok || !reposResponse.ok) {
      throw new Error(
        `GitHub API error: ${userResponse.status} ${reposResponse.status}`
      );
    }

    const user: GitHubUser = await userResponse.json();
    const repos: GitHubRepo[] = await reposResponse.json();

    // Sort repositories by star count (most stars first)
    const sortedRepos = repos.sort(
      (a, b) => b.stargazers_count - a.stargazers_count
    );

    // Calculate total stars
    const totalStars = sortedRepos.reduce(
      (sum, repo) => sum + repo.stargazers_count,
      0
    );

    // Calculate top languages
    const languageCount: { [key: string]: number } = {};
    sortedRepos.forEach((repo) => {
      if (repo.language) {
        languageCount[repo.language] = (languageCount[repo.language] || 0) + 1;
      }
    });

    const topLanguages = Object.fromEntries(
      Object.entries(languageCount)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 5)
    );

    return {
      user,
      repos: sortedRepos,
      totalStars,
      topLanguages,
    };
  } catch (error) {
    console.error("Error fetching GitHub data:", error);
    throw new Error("Failed to fetch GitHub data");
  }
}

export default async function Dashboard({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  
  // Create the promise but don't await it
  const dataPromise = fetchGitHubData({ username });

  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <PageComponent dataPromise={dataPromise} />
    </Suspense>
  );
}
