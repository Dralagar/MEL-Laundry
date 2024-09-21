'use client';

import React, { useEffect, useState } from 'react';
import styles from '../styles/Blog.module.css'; // Fixed typo: 'styless' to 'styles'
import { FaCalendarAlt, FaArrowRight, FaSearch, FaTags } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Image from 'next/image'; // Import Image component

const BlogPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/blogs'); // Adjust URL to your API endpoint
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        setError('Failed to fetch posts');
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className={styles.blogContainer}>
      <motion.div 
        className={styles.blogHero}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1>MEL Laundry Blog</h1>
        <p>Stay fresh with the latest news, tips, and insights from the world of laundry and technology</p>
      </motion.div>

      <div className={styles.searchAndFilter}>
        <div className={styles.searchBar}>
          <FaSearch className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search blog posts..."
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
        <div className={styles.postsGrid}>
          {filteredPosts.map((post, index) => (
            <motion.article 
              key={index} 
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
                  width={500} // Adjust these values as necessary
                  height={300} // Adjust these values as necessary
                  quality={100} // Optional: adjust for image quality
                />
              </div>
              <div className={styles.blogPostContent}>
                <h3 className={styles.blogPostTitle}>{post.title}</h3>
                <p className={styles.blogPostSummary}>{post.summary}</p>
                <div className={styles.blogPostTags}>
                  {post.tags.map(tag => (
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
      </section>
    </div>
  );
};

export default BlogPage;
