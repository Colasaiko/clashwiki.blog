import { getCollection } from 'astro:content';

export async function GET({ request }) {
  const posts = await getCollection('blog');
  
  const searchIndex = posts.map(post => ({
    title: post.data.title,
    description: post.data.description,
    slug: post.slug || post.id.replace(/\.md$/, ''),
    category: post.data.category,
    tags: post.data.tags || [],
  }));

  return new Response(JSON.stringify(searchIndex), {
    headers: {
      'content-type': 'application/json',
    }
  });
}
