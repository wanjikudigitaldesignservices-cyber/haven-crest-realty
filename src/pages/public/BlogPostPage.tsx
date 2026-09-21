import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useBlogPost, useBlogPosts } from '../../hooks/useBlogPosts';
import { SEOHead } from '../../components/shared/SEOHead';
import { formatDate } from '../../lib/utils';
import { Button } from '../../components/ui/Button';
import { Calendar, User, Share2, ArrowLeft, ArrowRight, BookOpen } from 'lucide-react';

export const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: post, isLoading } = useBlogPost(slug);
  const { data: allPosts = [] } = useBlogPosts();
  const [copied, setCopied] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-brand-dark border-t-brand-gold rounded-full animate-spin" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen pt-32 pb-20 max-w-3xl mx-auto px-4 text-center space-y-4">
        <h1 className="font-display font-bold text-3xl text-brand-dark">Report Not Found</h1>
        <Link to="/blog">
          <Button variant="gold">Return to Insights Hub</Button>
        </Link>
      </div>
    );
  }

  const relatedPosts = allPosts.filter((p) => p.id !== post.id && p.published).slice(0, 2);

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <article className="pt-24 pb-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      <SEOHead
        title={post.title}
        description={post.summary || undefined}
        ogImage={post.cover_image_url || undefined}
      />

      {/* Back Button & Tags */}
      <div className="space-y-4">
        <Link
          to="/blog"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-stone-500 hover:text-brand-dark transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Reports</span>
        </Link>

        <div className="flex gap-2 flex-wrap">
          {post.tags?.map((tag, i) => (
            <span
              key={i}
              className="px-2.5 py-0.5 rounded-full bg-brand-gold/15 text-brand-gold-dark text-xs font-bold uppercase tracking-wider"
            >
              {tag}
            </span>
          ))}
        </div>

        <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-brand-dark leading-tight">
          {post.title}
        </h1>

        {/* Metadata Bar */}
        <div className="flex items-center justify-between border-y border-brand-stone-200 py-3 text-xs text-brand-stone-500">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-brand-gold" />
              {formatDate(post.published_at || post.created_at)}
            </span>
            <span>·</span>
            <span>6 min read</span>
          </div>

          <button
            onClick={handleCopyLink}
            className="flex items-center gap-1.5 hover:text-brand-dark font-medium"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{copied ? 'Link Copied!' : 'Share'}</span>
          </button>
        </div>
      </div>

      {/* Cover Image */}
      {post.cover_image_url && (
        <div className="aspect-[16/9] rounded-3xl overflow-hidden shadow-card bg-brand-stone-100">
          <img
            src={post.cover_image_url}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Article Body */}
      <div className="prose prose-lg prose-slate max-w-none space-y-6 text-sm sm:text-base text-brand-stone-800 leading-relaxed">
        {post.body.split('\n\n').map((paragraph, index) => {
          if (paragraph.startsWith('### ')) {
            return (
              <h2 key={index} className="font-display font-bold text-2xl text-brand-dark mt-8 mb-4">
                {paragraph.replace('### ', '')}
              </h2>
            );
          }
          if (paragraph.startsWith('#### ')) {
            return (
              <h3 key={index} className="font-display font-bold text-xl text-brand-dark mt-6 mb-3">
                {paragraph.replace('#### ', '')}
              </h3>
            );
          }
          return <p key={index}>{paragraph}</p>;
        })}
      </div>

      {/* Author Card */}
      <div className="p-6 rounded-2xl bg-brand-stone-100 border border-brand-stone-200 flex items-center gap-4">
        <img
          src={
            post.author?.avatar_url ||
            'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80'
          }
          alt={post.author?.full_name || 'Author'}
          className="w-14 h-14 rounded-full object-cover border border-brand-gold/40 shrink-0"
        />
        <div className="space-y-1">
          <p className="font-display font-bold text-sm text-brand-dark">
            Authored by {post.author?.full_name || 'Haven Crest Research Desk'}
          </p>
          <p className="text-xs text-brand-stone-600">
            Senior Investment & Real Estate Advisory Committee.
          </p>
        </div>
      </div>

      {/* Related Articles */}
      {relatedPosts.length > 0 && (
        <div className="pt-12 border-t border-brand-stone-200 space-y-6">
          <h3 className="font-display font-bold text-2xl text-brand-dark">Related Market Reports</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {relatedPosts.map((p) => (
              <Link
                key={p.id}
                to={`/blog/${p.slug}`}
                className="group p-5 rounded-2xl bg-white border border-brand-stone-200 shadow-sm hover:shadow-card transition-all space-y-2 block"
              >
                <h4 className="font-display font-bold text-base text-brand-dark group-hover:text-brand-gold-dark transition-colors line-clamp-2">
                  {p.title}
                </h4>
                <p className="text-xs text-brand-stone-500 line-clamp-2">{p.summary}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </article>
  );
};
