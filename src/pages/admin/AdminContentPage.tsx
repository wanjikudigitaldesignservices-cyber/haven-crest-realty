import React, { useState } from 'react';
import { useBlogPosts, useSaveBlogPostMutation } from '../../hooks/useBlogPosts';
import { useNeighborhoods } from '../../hooks/useNeighborhoods';
import { DashboardShell } from '../../components/layout/DashboardShell';
import { SEOHead } from '../../components/shared/SEOHead';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { Input, Textarea } from '../../components/ui/Input';
import { slugify, formatDate } from '../../lib/utils';
import { FileText, PlusCircle, Edit, Compass, CheckCircle2 } from 'lucide-react';
import { BlogPost } from '../../types/database';

export const AdminContentPage: React.FC = () => {
  const { data: posts = [], isLoading } = useBlogPosts();
  const { data: neighborhoods = [] } = useNeighborhoods();
  const savePostMutation = useSaveBlogPostMutation();

  const [activeTab, setActiveTab] = useState<'blogs' | 'neighborhoods'>('blogs');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);

  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [body, setBody] = useState('');
  const [coverImageUrl, setCoverImageUrl] = useState('');
  const [tags, setTags] = useState('Market Reports, Wealth Advisory');

  const handleOpenCreate = () => {
    setEditingPost(null);
    setTitle('');
    setSummary('');
    setBody('### Market Overview\n\nProvide the intelligence and analysis here...\n\n### Strategic Takeaways\n\n- Key trend 1\n- Key trend 2');
    setCoverImageUrl('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=80');
    setTags('Market Reports, Wealth Advisory');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (post: BlogPost) => {
    setEditingPost(post);
    setTitle(post.title);
    setSummary(post.summary || '');
    setBody(post.body);
    setCoverImageUrl(post.cover_image_url || '');
    setTags(post.tags?.join(', ') || '');
    setIsModalOpen(true);
  };

  const handleSavePost = async (e: React.FormEvent) => {
    e.preventDefault();
    const slug = editingPost ? editingPost.slug : slugify(title);

    await savePostMutation.mutateAsync({
      id: editingPost ? editingPost.id : `post-${Date.now()}`,
      author_id: 'usr-admin-1',
      slug,
      title,
      summary,
      body,
      cover_image_url: coverImageUrl,
      tags: tags.split(',').map((t) => t.trim()).filter(Boolean),
      published: true,
      published_at: new Date().toISOString(),
      created_at: editingPost ? editingPost.created_at : new Date().toISOString(),
    });

    setIsModalOpen(false);
  };

  return (
    <DashboardShell portal="admin">
      <SEOHead title="Content Management System | Admin" />

      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-brand-dark">
              Content & Editorial CMS
            </h1>
            <p className="text-xs text-brand-stone-500 mt-1">
              Publish market reports, wealth intelligence articles, and manage prime neighborhood guides.
            </p>
          </div>

          <Button
            variant="gold"
            size="sm"
            onClick={handleOpenCreate}
            leftIcon={<PlusCircle className="w-4 h-4" />}
          >
            Draft New Market Report
          </Button>
        </div>

        {/* Tab Toggle */}
        <div className="flex gap-2 border-b border-brand-stone-200 pb-2">
          <button
            onClick={() => setActiveTab('blogs')}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeTab === 'blogs'
                ? 'bg-brand-dark text-white'
                : 'text-brand-stone-600 hover:text-brand-dark'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Market Reports & Articles ({posts.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('neighborhoods')}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeTab === 'neighborhoods'
                ? 'bg-brand-dark text-white'
                : 'text-brand-stone-600 hover:text-brand-dark'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Neighborhood Enclave Guides ({neighborhoods.length})</span>
          </button>
        </div>

        {/* Blog Posts List */}
        {activeTab === 'blogs' && (
          <div className="bg-white rounded-2xl border border-brand-stone-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-brand-stone-50 border-b border-brand-stone-200 text-[10px] font-bold text-brand-stone-500 uppercase tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Title & Summary</th>
                    <th className="py-3 px-4">Tags</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Published Date</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-stone-100">
                  {posts.map((post) => (
                    <tr key={post.id} className="hover:bg-brand-stone-50/60">
                      <td className="py-3 px-4">
                        <span className="font-bold text-brand-dark block line-clamp-1">{post.title}</span>
                        <span className="text-[11px] text-brand-stone-500 line-clamp-1">{post.summary}</span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex flex-wrap gap-1">
                          {post.tags?.map((t, i) => (
                            <span key={i} className="px-2 py-0.5 rounded bg-brand-stone-100 text-[10px]">
                              {t}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-emerald-50 text-emerald-700 border border-emerald-200">
                          {post.published ? 'Published' : 'Draft'}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-brand-stone-500 text-[11px]">
                        {formatDate(post.published_at || post.created_at)}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleOpenEdit(post)}
                          className="h-7 text-xs px-2"
                          leftIcon={<Edit className="w-3 h-3" />}
                        >
                          Edit
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Neighborhood Guides List */}
        {activeTab === 'neighborhoods' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {neighborhoods.map((n) => (
              <div
                key={n.id}
                className="bg-white rounded-2xl border border-brand-stone-200 shadow-sm p-5 space-y-3"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={n.hero_image_url || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=120&q=80'}
                    alt={n.name}
                    className="w-16 h-12 rounded-lg object-cover"
                  />
                  <div>
                    <h4 className="font-display font-bold text-base text-brand-dark">{n.name}</h4>
                    <span className="text-[11px] text-brand-stone-500">Slug: /{n.slug}</span>
                  </div>
                </div>
                <p className="text-xs text-brand-stone-600 line-clamp-2 leading-relaxed">
                  {n.description}
                </p>
                <div className="pt-2 border-t border-brand-stone-100 flex items-center justify-between text-xs">
                  <span className="text-brand-stone-400">Lat: {n.lat}, Lng: {n.lng}</span>
                  <span className="text-emerald-700 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Live on Portal
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Editor Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingPost ? 'Edit Market Report' : 'Draft New Market Intelligence Report'}
        maxWidth="2xl"
      >
        <form onSubmit={handleSavePost} className="space-y-4">
          <Input
            label="Report Title *"
            required
            placeholder="e.g. Q3 2026 Prime Residential Index: Capital Growth"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <Input
            label="Executive Summary *"
            required
            placeholder="A concise 1-sentence synopsis for card previews..."
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input
              label="Tags (Comma separated)"
              placeholder="Market Reports, Wealth Advisory, Karen"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
            <Input
              label="Cover Image URL"
              placeholder="https://images.unsplash.com/..."
              value={coverImageUrl}
              onChange={(e) => setCoverImageUrl(e.target.value)}
            />
          </div>

          <Textarea
            label="Article Markdown Body *"
            required
            rows={8}
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />

          <div className="pt-2 flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="gold">
              Publish Market Report
            </Button>
          </div>
        </form>
      </Modal>
    </DashboardShell>
  );
};
