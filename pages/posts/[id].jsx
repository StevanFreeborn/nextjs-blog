import Head from 'next/head';
import Date from '../../components/Date';
import Layout from '../../components/Layout';
import { postsDirectory } from '../../lib/constants.js';
import { getPostIds, loadPost } from '../../lib/posts';
import utilStyles from '../../styles/utils.module.css';

export async function getStaticPaths() {
  return {
    paths: getPostIds(postsDirectory),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  return {
    props: {
      post: await loadPost(postsDirectory, `${params.id}.md`),
    },
  };
}

export default function Post({ post }) {
  return (
    <Layout>
      <Head>
        <title>{post.title}</title>
      </Head>

      <article>
        <h1 className={utilStyles.headingXl}>{post.title}</h1>

        <div className={utilStyles.lightText}>
          <Date dateString={post.date} />
        </div>

        <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
      </article>
    </Layout>
  );
}
