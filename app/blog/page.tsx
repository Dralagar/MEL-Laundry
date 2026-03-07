'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { FaCalendarAlt, FaArrowRight, FaSearch, FaTags } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../styless/Blog.module.css';

interface Post {
  id: string;
  title: string;
  summary: string;
  image?: string;
  date?: string;
  tags?: string[];
}

const fallbackPosts: Post[] = [
  {
    id: '1',
    title: 'Welcome to MEL Laundry',
    summary:
      'Discover our premium laundry services and how we make your life easier.',
    image: '/images/blog/welcome.jpg',
    date: '2024-01-15',
    tags: ['Welcome', 'Services']
  },
  {
    id: '2',
    title: 'Laundry Care Tips',
    summary:
      'Learn how to properly care for your clothes and extend their lifespan.',
    image: '/images/blog/care-tips.jpg',
    date: '2024-01-10',
    tags: ['Tips', 'Care']
  },
  {
    id: '3',
    title: 'Eco-Friendly Laundry Practices',
    summary:
      'Discover sustainable laundry methods that are good for your clothes and the environment.',
    image: '/images/blog/eco.jpg',
    date: '2024-01-05',
    tags: ['Eco-Friendly', 'Sustainability', 'Environment']
  }
];

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch('http://localhost:5001/api/blogs');

        if (!res.ok) throw new Error('Failed to fetch posts');

        const data = await res.json();

        setPosts(data?.length ? data : fallbackPosts);
      } catch (err) {
        console.warn('Fallback posts used:', err);
        setPosts(fallbackPosts);
        setError('API unavailable. Showing sample posts.');
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  const allTags = useMemo(() => {
    return Array.from(new Set(posts.flatMap((post) => post.tags ?? [])));
  }, [posts]);

  const formatReadingTime = (summary: string) => {
    const wordsPerMinute = 200;
    const words = summary.split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      timeZone: 'UTC'
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const titleMatch = post.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const tagMatch =
        !selectedTag || (post.tags ?? []).includes(selectedTag);

      return titleMatch && tagMatch;
    });
  }, [posts, searchTerm, selectedTag]);

  if (loading) {
    return (
      <div className={styles.blogContainer}>
        <p>Loading posts...</p>
      </div>
    );
  }

  return (
    <main className={styles.blogContainer}>
      {/* HERO */}
      <section className={styles.blogHero}>
        <div className={styles.heroImageWrapper}>
          <Image
            src="/images/About.jpg"
            alt="MEL Laundry Blog - Tips and insights for better laundry care"
            fill
            className={styles.heroImage}
            quality={90}
            priority
            sizes="100vw"
          />
        </div>
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <h1>MEL Laundry Blog</h1>
          <p>
            Laundry tips, service updates, and insights to help you care for your
            clothes better.
          </p>
        </div>
      </section>

      {/* SEARCH + FILTER */}
      <section className={styles.blogPosts}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Latest Articles</h2>
          <Link href="/admin" className={styles.postBlogButton}>
            Post Blog
          </Link>
        </div>

        <div style={{ marginBottom: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          
          <div style={{ position: 'relative', flex: 2 }}>
            <FaSearch className={styles.icon} />

            <input
              type="text"
              placeholder="Search posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '0.7rem 1rem 0.7rem 2rem',
                borderRadius: '6px',
                border: '1px solid #ddd'
              }}
            />
          </div>

          <div style={{ flex: 1 }}>
            <select
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
              style={{
                width: '100%',
                padding: '0.7rem',
                borderRadius: '6px',
                border: '1px solid #ddd'
              }}
            >
              <option value="">All Tags</option>

              {allTags.map((tag) => (
                <option key={tag}>{tag}</option>
              ))}
            </select>
          </div>
        </div>

        {/* POSTS GRID */}
        <div className={styles.postsGrid}>
          {filteredPosts.map((post, index) => (
            <motion.article
              key={post.id}
              className={styles.blogPost}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -4 }}
            >
              <div className={styles.blogPostImageContainer}>
                <Image
                  src={post.image ?? '/images/blog/placeholder.jpg'}
                  alt={post.title}
                  width={400}
                  height={200}
                  className={styles.blogPostImage}
                />
              </div>

              <div className={styles.blogPostContent}>
                <h3 className={styles.blogPostTitle}>{post.title}</h3>

                <p className={styles.blogPostSummary}>
                  {post.summary}
                </p>

                <div className={styles.blogPostMeta}>
                  <span className={styles.blogPostDate}>
                    <FaCalendarAlt className={styles.icon} />
                    {post.date ? formatDate(post.date) : 'No date'}
                  </span>
                  <span className={styles.readingTime}>
                    {formatReadingTime(post.summary)}
                  </span>

                  <Link
                    href={`/blog/${post.id}`}
                    className={styles.readMoreButton}
                  >
                    Read
                    <FaArrowRight className={styles.icon} />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {error && (
          <p style={{ marginTop: '2rem', color: '#cc8800' }}>
            ⚠ {error}
          </p>
        )}
      </section>
    </main>
  );
}
