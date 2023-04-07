import Layout from '../../components/Layout';
import { postsDirectory } from '../../lib/constants.js';
import { getPostIds, loadPost } from '../../lib/posts';

export async function getStaticPaths() {
  return {
    paths: getPostIds(postsDirectory),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  return {
    props: {
      post: loadPost(postsDirectory, `${params.id}.md`),
    },
  };
}

export default function Post({ post }) {
  return (
    <Layout>
      {post.title}
      <br />
      {post.id}
      <br />
      {post.date}
    </Layout>
  );
}
