import Image from "next/image";

// TypeScript interfaces for GitHub API responses
interface GitHubUser {
  login: string;
  id: number;
  avatar_url: string;
  name: string;
  bio: string;
  location: string;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
}

interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  updated_at: string;
  created_at: string;
}

interface DashboardData {
  user: GitHubUser;
  repos: GitHubRepo[];
  totalStars: number;
  topLanguages: { [key: string]: number };
}

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
    const sortedRepos = repos.sort((a, b) => b.stargazers_count - a.stargazers_count);

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

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function getLanguageColor(_language: string): string {
  // All languages use the same monochrome styling
  return "bg-[#1f1f1f] text-white";
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

  const { user, repos, totalStars, topLanguages } = data;

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-white mb-2">
            GitHub Dashboard
          </h1>
          <p className="text-white text-lg">
            Statistics for @{user.login}
          </p>
        </div>

        {/* Profile Card */}
        <div className="bg-[#1f1f1f] border border-white p-8 mb-10 hover:bg-[#212121] hover:scale-[1.01] hover:border-2 transition-all duration-300">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
            <div className="relative hover:scale-105 transition-all duration-300 cursor-pointer">
              <Image
                src={user.avatar_url}
                alt={`${user.name || user.login}'s avatar`}
                width={150}
                height={150}
                className="border-4 border-white"
              />
              <div className="absolute -left-2 top-0 w-2 h-full bg-white"></div>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-3xl font-bold text-white mb-2">
                {user.name || user.login}
              </h2>
              <p className="text-white text-lg mb-4">
                @{user.login}
              </p>
              {user.bio && (
                <p className="text-white mb-4 leading-relaxed">
                  {user.bio}
                </p>
              )}
              {user.location && (
                <p className="text-white mb-6 text-lg">
                  📍 {user.location}
                </p>
              )}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center p-4 border border-white hover:bg-white hover:text-black hover:-translate-y-1 transition-all duration-200 cursor-pointer">
                  <div className="text-3xl font-bold mb-1">
                    {user.public_repos}
                  </div>
                  <div className="text-sm">
                    Repositories
                  </div>
                </div>
                <div className="text-center p-4 border border-white hover:bg-white hover:text-black hover:-translate-y-1 transition-all duration-200 cursor-pointer">
                  <div className="text-3xl font-bold mb-1">
                    {user.followers}
                  </div>
                  <div className="text-sm">
                    Followers
                  </div>
                </div>
                <div className="text-center p-4 border border-white hover:bg-white hover:text-black hover:-translate-y-1 transition-all duration-200 cursor-pointer">
                  <div className="text-3xl font-bold mb-1">
                    {user.following}
                  </div>
                  <div className="text-sm">
                    Following
                  </div>
                </div>
                <div className="text-center p-4 border border-white hover:bg-white hover:text-black hover:-translate-y-1 transition-all duration-200 cursor-pointer">
                  <div className="text-3xl font-bold mb-1">
                    {totalStars}
                  </div>
                  <div className="text-sm">
                    Total Stars
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          {/* Top Languages */}
          <div className="bg-[#1f1f1f] border border-white p-8 hover:bg-[#212121] hover:scale-[1.01] hover:border-2 transition-all duration-300">
            <h3 className="text-2xl font-bold text-white mb-6 border-b border-white pb-2">
              Top Languages
            </h3>
            <div className="space-y-4">
              {Object.entries(topLanguages).map(([language, count]) => (
                <div
                  key={language}
                  className="group flex items-center justify-between p-3 border border-white hover:bg-white hover:text-black hover:scale-[1.05] hover:-translate-y-1 transition-all duration-200 cursor-pointer"
                >
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-4 h-4 border border-white hover:rotate-45 transition-all duration-300 ${getLanguageColor(
                        language
                      )}`}
                    ></div>
                    <span className="text-white group-hover:text-black font-semibold text-lg">
                      {language}
                    </span>
                  </div>
                  <span className="text-white group-hover:text-black font-bold text-lg">
                    {count} repo{count !== 1 ? "s" : ""}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Account Info */}
          <div className="bg-[#1f1f1f] border border-white p-8 hover:bg-[#212121] hover:scale-[1.01] hover:border-2 transition-all duration-300">
            <h3 className="text-2xl font-bold text-white mb-6 border-b border-white pb-2">
              Account Information
            </h3>
            <div className="space-y-4">
                <div className="flex justify-between items-center p-3 border border-white hover:bg-white hover:text-black hover:scale-[1.03] hover:-translate-y-1 transition-all duration-200 cursor-pointer">
                  <span className="font-semibold">
                    Member since
                  </span>
                  <span className="font-bold">
                    {formatDate(user.created_at)}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 border border-white hover:bg-white hover:text-black hover:scale-[1.03] hover:-translate-y-1 transition-all duration-200 cursor-pointer">
                  <span className="font-semibold">
                    Last updated
                  </span>
                  <span className="font-bold">
                    {formatDate(user.updated_at)}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 border border-white hover:bg-white hover:text-black hover:scale-[1.03] hover:-translate-y-1 transition-all duration-200 cursor-pointer">
                  <span className="font-semibold">
                    User ID
                  </span>
                  <span className="font-mono font-bold">
                    {user.id}
                  </span>
                </div>
            </div>
          </div>
        </div>

        {/* Top Repositories */}
        <div className="bg-[#1f1f1f] border border-white p-8 hover:border-2 transition-all duration-300">
          <h3 className="text-2xl font-bold text-white mb-8 border-b border-white pb-2">
            Top Repositories
          </h3>
          <div className="space-y-0">
            {repos.slice(0, 5).map((repo, index) => (
              <div
                key={repo.id}
                className={`group border border-white p-6 hover:bg-white hover:text-black hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300 cursor-pointer ${
                  index % 2 === 0 ? 'bg-[#1f1f1f]' : 'bg-[#212121]'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <h4 className="text-xl font-bold text-white group-hover:text-black">
                        {repo.name}
                      </h4>
                      {repo.language && (
                        <span
                          className={`px-3 py-1 text-sm font-semibold text-white border border-white ${getLanguageColor(
                            repo.language
                          )}`}
                        >
                          {repo.language}
                        </span>
                      )}
                    </div>
                    {repo.description && (
                      <p className="text-white group-hover:text-black mb-4 leading-relaxed text-lg">
                        {repo.description}
                      </p>
                    )}
                    <div className="flex items-center space-x-6 text-lg text-white group-hover:text-black">
                      <span className="font-bold">⭐ {repo.stargazers_count}</span>
                      <span className="font-bold">🍴 {repo.forks_count}</span>
                      <span className="font-semibold">Updated {formatDate(repo.updated_at)}</span>
                    </div>
                  </div>
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-6 px-6 py-3 bg-white text-black group-hover:bg-black group-hover:text-white hover:scale-110 transition-all duration-200 font-bold text-lg border border-white hover:border-2"
                  >
                    View
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
