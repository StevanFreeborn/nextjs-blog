import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';

const postsDirectory = path.join(process.cwd(), 'posts');

function loadPost(fileName) {
  const id = fileName.replace(/\.md$/, '');
  const fullPath = path.join(postsDirectory, fileName);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);

  return {
    id,
    ...matterResult.data,
  };
}

export function loadPosts() {
  return fs
    .readdirSync(postsDirectory)
    .map(fileName => loadPost(fileName))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}
