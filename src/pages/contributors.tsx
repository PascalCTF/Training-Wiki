import type {ReactNode} from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import {useAllPluginInstancesData} from '@docusaurus/useGlobalData';

import styles from './contributors.module.css';

type Contributor = {
  login: string;
  avatar_url: string;
  html_url: string;
  contributions: number;
};

function ContributorsHeader(): ReactNode {
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          Contributors
        </Heading>
        <p className="hero__subtitle">
          The people who built and maintain this wiki.
        </p>
      </div>
    </header>
  );
}

function ContributorsGrid({list}: {list: Contributor[]}): ReactNode {
  if (list.length === 0) {
    return (
      <p className={styles.empty}>
        No contributors found. Check back after the next deploy.
      </p>
    );
  }

  return (
    <div className={styles.contributorGrid}>
      {list.map((c) => (
        <div key={c.login} className={styles.contributorCardWrapper}>
          <div className={clsx('card', styles.contributorCard)}>
            <div className="card__body">
              <img
                className={styles.avatar}
                src={`${c.avatar_url}${c.avatar_url.includes('?') ? '&' : '?'}s=192`}
                alt={`${c.login} avatar`}
                loading="lazy"
                width={96}
                height={96}
              />
              <Heading as="h3" className={styles.login}>
                {c.login}
              </Heading>
              <p className={styles.commits}>
                {c.contributions}{' '}
                {c.contributions === 1 ? 'commit' : 'commits'}
              </p>
            </div>
            <div className="card__footer">
              <a
                className={clsx(
                  'button button--secondary button--block',
                  styles.contributorButton,
                )}
                href={c.html_url}
                target="_blank"
                rel="noopener noreferrer">
                View profile
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Contributors(): ReactNode {
  const pluginData = useAllPluginInstancesData('contributors-plugin') as
    | {default?: {contributors?: Contributor[]}}
    | undefined;
  const list = pluginData?.default?.contributors ?? [];

  return (
    <Layout
      title="Contributors"
      description="GitHub contributors to the PascalCTF Training Wiki.">
      <ContributorsHeader />
      <main>
        <section className={styles.contributorsSection}>
          <div className="container">
            <Heading as="h2" className={styles.contributorsTitle}>
              Thanks to everyone who contributed
            </Heading>
            <p className={styles.contributorsSubtitle}>
              Sorted by number of commits to the repository.
            </p>
            <ContributorsGrid list={list} />
          </div>
        </section>
      </main>
    </Layout>
  );
}
