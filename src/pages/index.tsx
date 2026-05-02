import type { ReactNode } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

const Logo = require('@site/static/img/logo.svg').default;

type CategoryItem = {
  title: string;
  to: string;
  description: ReactNode;
};

const CategoryList: CategoryItem[] = [
  {
    title: 'Binary Exploitation',
    to: '/docs/binary-exploitation/intro',
    description: (
      <>
        Learn how memory corruption bugs work and how to turn them into a
        controlled execution flow.
      </>
    ),
  },
  {
    title: 'Reverse Engineering',
    to: '/docs/reverse-engineering/intro',
    description: (
      <>
        Understand binaries and programs by analyzing behavior, assembly, and
        tooling.
      </>
    ),
  },
  {
    title: 'Cryptography',
    to: '/docs/cryptography/intro',
    description: (
      <>
        Build solid intuition on common crypto primitives and typical CTF-style
        attacks.
      </>
    ),
  },
  {
    title: 'Web Exploitation',
    to: '/docs/web-exploitation/intro',
    description: (
      <>
        Learn the most common web vulnerabilities and how to identify and
        exploit them safely.
      </>
    ),
  },
  {
    title: 'Miscellaneous',
    to: '/docs/miscellaneous/intro',
    description: (
      <>
        Grab-bag topics, tooling notes, and useful concepts that show up
        frequently in CTFs.
      </>
    ),
  },
];

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Logo className={styles.heroLogo} role="img" />
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
      </div>
    </header>
  );
}

function HomepageCategories() {
  return (
    <section className={styles.categoriesSection}>
      <div className="container">
        <Heading as="h2" className={styles.categoriesTitle}>
          Categories
        </Heading>
        <p className={styles.categoriesSubtitle}>
          Pick a track and start from the intro.
        </p>

        <div className={styles.categoryGrid}>
          {CategoryList.map((category) => (
            <div key={category.to} className={styles.categoryCardWrapper}>
              <div className={clsx('card', styles.categoryCard)}>
                <div className="card__body">
                  <Heading as="h3" className={styles.categoryTitle}>
                    {category.title}
                  </Heading>
                  <p className={styles.categoryDescription}>
                    {category.description}
                  </p>
                </div>
                <div className="card__footer">
                  <Link
                    className={clsx("button button--secondary button--block", styles.categoryButton)}
                    to={category.to}>
                    Open intro
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      <main>
        <HomepageCategories />
      </main>
    </Layout>
  );
}
