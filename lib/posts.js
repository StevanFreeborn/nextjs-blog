import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import { remark } from 'remark';
import html from 'remark-html';

/**
 * @function getFileId - Removes the extension from the file name.
 * @param {string} fileName
 * @returns {string} The file name without the extension.
 */
function getFileId(fileName) {
  return fileName.replace(/\.md$/, '');
}

/**
 * @function loadPost - Loads a post from the file system.
 * @param {string} postsDirectory - The path to the posts directory.
 * @param {string} fileName - The name of the file to load.
 * @returns {Promise<object>} A post object.
 */
export async function loadPost(postsDirectory, fileName) {
  const id = getFileId(fileName);
  const fullPath = path.join(postsDirectory, fileName);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);
  const parsedContent = await remark().use(html).process(matterResult.content);
  const contentHtml = parsedContent.toString();

  return {
    id,
    contentHtml,
    ...matterResult.data,
  };
}

/**
 * @function loadPosts - Loads all posts from the file system and sorts them by date in descending order.
 * @param {string} postsDirectory - The path to the posts directory.
 * @returns {Promise<Array<object>>} An array of post objects.
 */
export async function loadPosts(postsDirectory) {
  const fileNames = fs.readdirSync(postsDirectory);
  const posts = await Promise.all(
    fileNames.map(async fileName => await loadPost(postsDirectory, fileName))
  );
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

/**
 * @function getPostIds - Gets the file names from the posts directory and returns an array of objects with the file name as the id without the extension.
 * @param {string} postsDirectory - The path to the posts directory.
 * @returns {Array<string>} An array of strings that are the file names without the extension.
 */
export function getPostIds(postsDirectory) {
  return fs.readdirSync(postsDirectory).map(fileName => {
    return {
      params: {
        id: getFileId(fileName),
      },
    };
  });
}
