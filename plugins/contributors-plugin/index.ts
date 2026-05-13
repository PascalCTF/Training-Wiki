import type {LoadContext, Plugin} from '@docusaurus/types';

export type Contributor = {
  login: string;
  avatar_url: string;
  html_url: string;
  contributions: number;
};

type Content = {contributors: Contributor[]};

type GitHubContributor = {
  login?: string;
  avatar_url?: string;
  html_url?: string;
  contributions?: number;
  type?: string;
};

const DEFAULT_REPO = 'PascalCTF/Training-Wiki';

export default function contributorsPlugin(
  _context: LoadContext,
): Plugin<unknown> {
  return {
    name: 'contributors-plugin',

    async loadContent(): Promise<Content> {
      const repo = process.env.GITHUB_REPOSITORY || DEFAULT_REPO;
      const url = `https://api.github.com/repos/${repo}/contributors?per_page=100`;

      const headers: Record<string, string> = {
        Accept: 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
        'User-Agent': 'training-wiki-contributors-plugin',
      };
      if (process.env.GITHUB_TOKEN) {
        headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
      }

      try {
        const res = await fetch(url, {headers});
        if (!res.ok) {
          console.warn(
            `[contributors-plugin] GitHub API ${res.status} ${res.statusText} for ${url}`,
          );
          return {contributors: []};
        }
        const raw = (await res.json()) as GitHubContributor[];
        const contributors: Contributor[] = raw
          .filter(
            (c) =>
              c.type !== 'Bot' &&
              typeof c.login === 'string' &&
              !c.login.endsWith('[bot]'),
          )
          .map((c) => ({
            login: c.login as string,
            avatar_url: c.avatar_url ?? '',
            html_url: c.html_url ?? `https://github.com/${c.login}`,
            contributions: c.contributions ?? 0,
          }));
        return {contributors};
      } catch (err) {
        console.warn(
          `[contributors-plugin] fetch failed: ${(err as Error).message}`,
        );
        return {contributors: []};
      }
    },

    async contentLoaded({content, actions}) {
      actions.setGlobalData(content as Content);
    },
  };
}
