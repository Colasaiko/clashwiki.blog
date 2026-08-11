import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    pubDate: z.any().optional(),
    category: z.string().optional(),
    tags: z.array(z.string()).optional(),
    image: z.string().optional(),
  }).catchall(z.any())
});

const brands = defineCollection({
  schema: z.object({}).catchall(z.any())
});

const topics = defineCollection({
  schema: z.object({}).catchall(z.any())
});

export const collections = {
  blog,
  brands,
  topics
};
