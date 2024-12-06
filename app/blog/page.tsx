'use client';

import React, { useEffect, useState } from 'react';
import Head from 'next/head';
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
          throw new Error(`Failed to fetch posts: ${response.status}`);
        }
        const data = await response.json();
        setPosts(data);
      } catch (error: unknown) {
        const errorMessage = error instanceof Error 
          ? error.message 
          : 'An unexpected error occurred while fetching posts';
        setError(errorMessage);
        if (error instanceof Error) {
          console.error('Fetch error:', error.message);
        } else {
          console.error('Fetch error:', errorMessage);
        }
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
    <>
      <Head>
        <title>MEL Laundry Blog - Latest Updates and Tips</title>
        <meta name="description" content="Stay updated with the latest news, tips, and insights from MEL Laundry. Explore our blog for helpful articles and updates." />
        <meta name="keywords" content="MEL Laundry, blog, laundry tips, updates, news" />
        <meta name="robots" content="index, follow" />
      </Head>
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
              aria-label="Search blog posts"
            />
          </div>
          <div className={styles.tagFilter}>
            <FaTags className={styles.tagIcon} />
            <select
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
              className={styles.tagSelect}
              aria-label="Filter posts by tag"
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
                      alt={`Image for ${post.title}`} 
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
                      <a href={`/blog/${post.id}`} className={styles.readMoreButton} aria-label={`Read more about ${post.title}`}>
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
    </>
  );
};

export default BlogPage;