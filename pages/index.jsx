import Head from 'next/head';
import Layout, { siteTitle } from '../components/Layout';
import utilStyles from '../styles/utils.module.css';

export default function Home() {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>
          Hi I’m Stevan! I’m a husband, father, creator, and coach. I like to
          write about things I'm interested in.
        </p>
      </section>
    </Layout>
  );
}
