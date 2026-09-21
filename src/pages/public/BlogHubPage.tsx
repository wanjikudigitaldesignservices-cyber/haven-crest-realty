import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useBlogPosts } from '../../hooks/useBlogPosts';
import { SEOHead } from '../../components/shared/SEOHead';
import { formatDate } from '../../lib/utils';
import { ArrowRight, Calendar, User, BookOpen } from 'lucide-react';

export const BlogHubPage: React.FC = () => {
  const { data: posts = [], isLoading } = useBlogPosts();
  const [selectedTag, setSelectedTag] = useState<string>('all');

  const allTags = ['all', 'Market Reports', 'Wealth Advisory', 'Buyer Guide', 'Architecture', 'Investments'];

  const filteredPosts = selectedTag === 'all'
    ? posts.filter((p) => p.published)
    : posts.filter((p) => p.published && p.tags?.includes(selectedTag));

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <SEOHead
        title="Market Intelligence & Luxury Real Estate Reports"
        description="Exclusive real estate research, prime capital growth analysis, and legal acquisition guides for high-net-worth property investors in East Africa."
      />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold text-brand-gold uppercase tracking-widest">
          Market Intelligence & Research
        </span>
        <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-brand-dark">
          Prime Real Estate Insights
        </h1>
        <p className="text-sm sm:text-base text-brand-stone-600 leading-relaxed">
          In-depth market indices, legal due diligence advisories, and architecture trends authored by our senior managing brokers and economic analysts.
        </p>
      </div>

      {/* Tag Filter Pills */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto py-1 no-scrollbar">
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag)}
            className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              selectedTag === tag
                ? 'bg-brand-dark text-white shadow-sm'
                : 'bg-white border border-brand-stone-200 text-brand-stone-700 hover:bg-brand-stone-100'
            }`}
          >
            {tag === 'all' ? 'All Intelligence' : tag}
          </button>
        ))}
      </div>

      {/* Articles Grid */}
      {isLoading ? (
        <div className="py-20 text-center text-brand-stone-400">Loading research reports...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <Link
              key={post.id}
              to={`/blog/${post.slug}`}
              className="group bg-white rounded-2xl overflow-hidden border border-brand-stone-200 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-brand-stone-100">
                <img
                  src={
                    post.cover_image_url ||
                    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80'
                  }
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 flex gap-1 flex-wrap">
                  {post.tags?.slice(0, 2).map((t, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-brand-dark/80 backdrop-blur-md text-white"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[11px] text-brand-stone-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-brand-gold" />
                      {formatDate(post.published_at || post.created_at)}
                    </span>
                    <span>·</span>
                    <span>5 min read</span>
                  </div>

                  <h3 className="font-display font-bold text-lg text-brand-dark group-hover:text-brand-gold-dark transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-xs text-brand-stone-600 line-clamp-3 leading-relaxed">
                    {post.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-brand-stone-100 flex items-center justify-between text-xs">
                  <span className="font-semibold text-brand-dark">Read Analysis</span>
                  <ArrowRight className="w-3.5 h-3.5 text-brand-gold group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
