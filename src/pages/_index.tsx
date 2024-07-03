import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';
import useBaseUrl from '@docusaurus/useBaseUrl';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <div className="hero">
      <div className={styles.welcome_intro}>
        <h1 className={styles.hero_title}>
          <span
            style={{ color: 'var(--ifm-color-primary)' }}
          >Hi</span> ~ 被你找到了</h1>
        <p className="hero__subtitle">记录学习、留住生活，尝试坚持写一点东西，让每天过的慢一点。</p>
      </div>
      <div className={styles.welcome_svg}>
        <img src={useBaseUrl("/img/program.svg")} />
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <Layout>
      <HomepageHeader />
      <main>
        <br />
        {/* <HomepageFeatures /> */}
      </main>
    </Layout>
  );
}
