import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';

function getFileId(fileName) {
  return fileName.replace(/\.md$/, '');
}

export function loadPost(postsDirectory, fileName) {
  const id = getFileId(fileName);
  const fullPath = path.join(postsDirectory, fileName);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);

  return {
    id,
    ...matterResult.data,
  };
}

export function loadPosts(postsDirectory) {
  return fs
    .readdirSync(postsDirectory)
    .map(fileName => loadPost(postsDirectory, fileName))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostIds(postsDirectory) {
  return fs.readdirSync(postsDirectory).map(fileName => {
    return {
      params: {
        id: getFileId(fileName),
      },
    };
  });
}
