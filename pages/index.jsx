import Head from 'next/head';
import Link from 'next/link';
import Date from '../components/Date';
import Layout, { siteTitle } from '../components/Layout';
import { postsDirectory } from '../lib/constants';
import { loadPosts } from '../lib/posts';
import utilStyles from '../styles/utils.module.css';

export async function getStaticProps() {
  return {
    props: {
      posts: await loadPosts(postsDirectory),
    },
  };
}

export default function Home({ posts }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <section className={utilStyles.headingMd}>
        <p>
          Hi I'm Stevan! I'm a husband, father, creator, and coach. I like to
          write about things I'm interested in.
        </p>
      </section>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>

        <ul className={utilStyles.list}>
          {posts.map(({ id, date, title }) => (
            <li
              className={utilStyles.listItem}
              key={id}
            >
              <Link href={`/posts/${id}`}>{title}</Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
