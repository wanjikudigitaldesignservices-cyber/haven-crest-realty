import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { mockDb } from '../lib/supabaseClient';
import { BlogPost } from '../types/database';

export function useBlogPosts() {
  return useQuery({
    queryKey: ['blog_posts'],
    queryFn: async () => {
      return mockDb.getBlogs();
    },
  });
}

export function useBlogPost(slug: string | undefined) {
  return useQuery({
    queryKey: ['blog_post', slug],
    enabled: Boolean(slug),
    queryFn: async () => {
      const posts = await mockDb.getBlogs();
      return posts.find(p => p.slug === slug) || null;
    },
  });
}

export function useSaveBlogPostMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (post: BlogPost) => {
      const existingPosts = await mockDb.getBlogs();
      const existing = existingPosts.find(p => p.id === post.id);
      if (existing) {
        return mockDb.updateBlogPost(post.id, post);
      }
      return mockDb.addBlogPost(post);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blog_posts'] });
    },
  });
}
