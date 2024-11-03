'use client';

import React, { useEffect, useState } from 'react';
import styles from '../styless/Blog.module.css';
import { FaCalendarAlt, FaArrowRight, FaSearch, FaTags } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface Post {
  id: string;
  title: string;
  summary: string;
  image: string;
  date: string;
  tags: string[];
}

const BlogPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/posts');
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch posts');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const allTags = Array.from(new Set(posts.flatMap(post => post.tags)));

  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedTag === '' || post.tags.includes(selectedTag))
  );

  if (loading) return (
    <div className={styles.loadingContainer}>
      <p>Loading blog posts...</p>
    </div>
  );
  
  if (error) return (
    <div className={styles.errorContainer}>
      <p>Error: {error}</p>
      <button onClick={() => window.location.reload()}>Try Again</button>
    </div>
  );

  return (
    <div className={styles.blogContainer}>
      <div className={styles.searchAndFilter}>
        <div className={styles.searchBar}>
          <FaSearch className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search posts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
        </div>
        <div className={styles.tagFilter}>
          <FaTags className={styles.tagIcon} />
          <select
            value={selectedTag}
            onChange={(e) => setSelectedTag(e.target.value)}
            className={styles.tagSelect}
          >
            <option value="">All Tags</option>
            {allTags.map(tag => (
              <option key={tag} value={tag}>{tag}</option>
            ))}
          </select>
        </div>
      </div>

      <section className={styles.blogPosts}>
        <h2 className={styles.sectionTitle}>Latest Blog Posts</h2>
        {filteredPosts.length === 0 ? (
          <div className={styles.noPosts}>
            <p>No blog posts found matching your criteria.</p>
          </div>
        ) : (
          <div className={styles.postsGrid}>
            {filteredPosts.map((post, index) => (
              <motion.article 
                key={post.id} 
                className={styles.blogPost}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className={styles.blogPostImageContainer}>
                  <Image 
                    src={post.image} 
                    alt={post.title} 
                    className={styles.blogPostImage} 
                    layout="responsive" 
                    width={500}
                    height={300}
                    quality={100}
                  />
                </div>
                <div className={styles.blogPostContent}>
                  <h3 className={styles.blogPostTitle}>{post.title}</h3>
                  <p className={styles.blogPostSummary}>{post.summary}</p>
                  <div className={styles.blogPostTags}>
                    {post.tags.map((tag: string) => (
                      <span key={tag} className={styles.tag}>{tag}</span>
                    ))}
                  </div>
                  <div className={styles.blogPostMeta}>
                    <span className={styles.blogPostDate}>
                      <FaCalendarAlt className={styles.icon} /> {post.date}
                    </span>
                    <a href={`/blog/${post.id}`} className={styles.readMoreButton}>
                      Read More <FaArrowRight className={styles.icon} />
                    </a>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default BlogPage;