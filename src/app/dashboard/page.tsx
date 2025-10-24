import { PageComponent } from "./page-component";
import { DashboardData, GitHubRepo, GitHubUser } from "./types";

async function fetchGitHubData(): Promise<DashboardData> {
  const username = "iAskShahram";

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

export default async function Dashboard() {
  let data: DashboardData;

  try {
    data = await fetchGitHubData();
  } catch (error: unknown) {
    console.error("Error fetching GitHub data:", error);
    if (error instanceof Error) {
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
    }
    if (error instanceof Error && error.message.includes("GitHub API error")) {
      console.error("GitHub API error details:", error.message);
    }
    if (
      error instanceof Error &&
      error.message.includes("Failed to fetch GitHub data")
    ) {
      console.error("Failed to fetch GitHub data:", error.message);
    }
    if (error instanceof Error && error.message.includes("GitHub API error")) {
      console.error("GitHub API error details:", error.message);
    }
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Error Loading Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Failed to fetch GitHub data. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <PageComponent
      data={data}
    />
  );
}
