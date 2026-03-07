'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { FaCalendarAlt, FaUser, FaArrowLeft, FaEdit, FaTrash, FaShare } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../../styless/BlogPost.module.css';

interface BlogPost {
  _id: string;
  id: string;
  title: string;
  summary: string;
  content: string;
  author: string;
  date: string;
  image?: string;
  tags?: string[];
  status?: string;
}

export default function BlogPostPage() {
  const params = useParams();
  const router = useRouter();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const postId = params.id as string;

  useEffect(() => {
    async function fetchPost() {
      try {
        const res = await fetch(`http://localhost:5001/api/blogs/${postId}`);

        if (!res.ok) {
          if (res.status === 404) {
            throw new Error('Blog post not found');
          }
          throw new Error('Failed to fetch blog post');
        }

        const data = await res.json();
        setPost(data);
      } catch (err) {
        console.error('Error fetching blog post:', err);
        setError(err instanceof Error ? err.message : 'Failed to load blog post');
        
        // Fallback to sample post if API fails
        if (postId === '1') {
          setPost({
            _id: '1',
            id: '1',
            title: 'Welcome to MEL Laundry Blog',
            summary: 'Discover professional laundry tips and tricks from our experts.',
            content: `
              <h2>Welcome to Our Official Blog</h2>
              <p>Welcome to our official blog where we share valuable insights about laundry care, fabric maintenance, and the latest trends in the industry. Our team of experts is dedicated to helping you achieve the best results for your clothing while extending their lifespan.</p>
              
              <h3>Our Commitment to Excellence</h3>
              <p>At MEL Laundry, we believe that proper garment care is both an art and a science. With years of experience serving the Nairobi community, we've mastered the techniques that keep your clothes looking fresh, clean, and well-maintained.</p>
              
              <h3>What You'll Find Here</h3>
              <p>Through this blog, we'll share:</p>
              <ul>
                <li>Professional laundry tips and tricks</li>
                <li>Fabric care guides for different materials</li>
                <li>Seasonal laundry advice</li>
                <li>Behind-the-scenes insights into our services</li>
                <li>Special promotions and customer stories</li>
              </ul>
              
              <h3>Join Our Community</h3>
              <p>We invite you to bookmark this page and check back regularly for new content. Whether you're a long-time customer or just learning about professional laundry services, you'll find valuable information to help you care for your garments better.</p>
              
              <p>Have questions or topics you'd like us to cover? Feel free to reach out to our team. We're always here to help!</p>
              
              <p><strong>Thank you for choosing MEL Laundry - Your trusted partner in garment care.</strong></p>
            `,
            author: 'MEL Laundry Team',
            date: '2024-01-15',
            image: '/images/blog/welcome.jpg',
            tags: ['Welcome', 'Laundry', 'Professional'],
            status: 'published'
          });
        } else if (postId === '2') {
          setPost({
            _id: '2',
            id: '2',
            title: 'Laundry Care Tips',
            summary: 'Learn how to properly care for your clothes and extend their lifespan.',
            content: `
              <h2>Essential Laundry Care Tips for Perfect Results</h2>
              <p>Proper laundry care is essential for maintaining the quality and longevity of your clothes. Follow these expert tips from MEL Laundry to achieve professional results at home.</p>
              
              <h3>1. Sort Clothes Properly</h3>
              <p>Always separate your laundry into distinct piles:</p>
              <ul>
                <li>Whites (white clothes, towels, sheets)</li>
                <li>Darks (black, navy, dark gray)</li>
                <li>Colors (red, blue, green, yellow)</li>
                <li>Delicates (silk, wool, lingerie)</li>
              </ul>
              
              <h3>2. Use the Right Water Temperature</h3>
              <p><strong>Cold Water (30°C or below):</strong> Best for delicates, dark colors, and energy savings.</p>
              <p><strong>Warm Water (30-40°C):</strong> Ideal for everyday clothes and moderately soiled items.</p>
              <p><strong>Hot Water (50°C or above):</strong> Perfect for whites, towels, and heavily soiled items.</p>
              
              <h3>3. Choose the Right Detergent</h3>
              <p>Use high-quality detergents that are suitable for your water type and fabric needs. Consider using:</p>
              <ul>
                <li>Liquid detergents for better stain removal</li>
                <li>Powder detergents for general washing</li>
                <li>Eco-friendly options for environmental care</li>
              </ul>
              
              <h3>4. Don't Overload the Machine</h3>
              <p>Leave enough space for clothes to move freely. A good rule of thumb is to fill the machine only 3/4 full.</p>
              
              <h3>5. Dry Clothes Properly</h3>
              <p>Always check care labels and dry clothes according to fabric type. Use low heat for delicates and medium heat for most everyday items.</p>
              
              <p><strong>Need professional help? Visit MEL Laundry for expert garment care services!</strong></p>
            `,
            author: 'MEL Laundry Team',
            date: '2024-01-10',
            image: '/images/blog/care-tips.jpg',
            tags: ['Tips', 'Care', 'Professional'],
            status: 'published'
          });
        } else if (postId === '3') {
          setPost({
            _id: '3',
            id: '3',
            title: 'Eco-Friendly Laundry Practices',
            summary: 'Discover sustainable laundry methods that are good for your clothes and the environment.',
            content: `
              <h2>Eco-Friendly Laundry: Sustainable Practices for Better Garment Care</h2>
              <p>At MEL Laundry, we're committed to environmental sustainability. Here's how you can make your laundry routine more eco-friendly while still getting excellent results.</p>
              
              <h3>1. Wash in Cold Water</h3>
              <p>Heating water accounts for about 90% of the energy used by washing machines. Cold water washing:</p>
              <ul>
                <li>Saves energy and reduces utility bills</li>
                <li>Prevents color fading and fabric shrinkage</li>
                <li>Works great for most everyday laundry</li>
              </ul>
              
              <h3>2. Use Eco-Friendly Detergents</h3>
              <p>Choose biodegradable, phosphate-free detergents that are:</p>
              <ul>
                <li>Gentle on the environment</li>
                <li>Safe for sensitive skin</li>
                <li>Effective in cold water</li>
              </ul>
              
              <h3>3. Wash Full Loads</h3>
              <p>Maximize efficiency by waiting until you have a full load. This saves water, energy, and reduces your environmental impact.</p>
              
              <h3>4. Line Dry When Possible</h3>
              <p>Air drying is the most eco-friendly option. Benefits include:</p>
              <ul>
                <li>Zero energy consumption</li>
                <li>Natural fabric softening</li>
                <li>Extended clothing lifespan</li>
                <li>Fresh, clean scent</li>
              </ul>
              
              <h3>5. Choose Sustainable Fabrics</h3>
              <p>When shopping for new clothes, consider:</p>
              <ul>
                <li>Organic cotton</li>
                <li>Bamboo</li>
                <li>Hemp</li>
                <li>Recycled materials</li>
              </ul>
              
              <h3>6. Proper Maintenance</h3>
              <p>Maintain your washing machine regularly to ensure it runs efficiently:</p>
              <ul>
                <li>Clean the filter monthly</li>
                <li>Run an empty hot cycle with vinegar</li>
                <li>Leave the door open between loads</li>
              </ul>
              
              <p><strong>Together, we can make a difference! Visit MEL Laundry for professional, eco-conscious garment care.</strong></p>
            `,
            author: 'Green Living Team',
            date: '2024-01-05',
            image: '/images/blog/eco.jpg',
            tags: ['Eco-Friendly', 'Sustainability', 'Environment'],
            status: 'published'
          });
        }
      } finally {
        setLoading(false);
      }
    }

    if (postId) {
      fetchPost();
    }
  }, [postId]);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post?.title,
          text: post?.summary,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: Copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      timeZone: 'UTC'
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const formatReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.replace(/<[^>]*>/g, '').split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  };

  if (loading) {
    return (
      <div className={styles.blogPostContainer}>
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>Loading blog post...</p>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className={styles.blogPostContainer}>
        <div className={styles.error}>
          <h2>Blog Post Not Found</h2>
          <p>{error || 'The blog post you are looking for does not exist.'}</p>
          <Link href="/blog" className={styles.backButton}>
            <FaArrowLeft /> Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.blogPostContainer}>
      {/* Navigation */}
      <nav className={styles.navigation}>
        <Link href="/blog" className={styles.backButton}>
          <FaArrowLeft /> Back to Blog
        </Link>
        <button onClick={handleShare} className={styles.shareButton}>
          <FaShare /> Share
        </button>
      </nav>

      {/* Blog Post Content */}
      <article className={styles.blogPost}>
        {/* Header */}
        <header className={styles.postHeader}>
          <motion.div
            className={styles.postImageContainer}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Image
              src={post.image || '/images/blog/placeholder.jpg'}
              alt={post.title}
              fill
              className={styles.postImage}
              priority
              sizes="(max-width: 1200px) 100vw, 1200px"
            />
            <div className={styles.imageOverlay}></div>
          </motion.div>

          <div className={styles.postMeta}>
            <motion.h1
              className={styles.postTitle}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {post.title}
            </motion.h1>

            <motion.div
              className={styles.postDetails}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className={styles.postAuthor}>
                <FaUser />
                <span>{post.author}</span>
              </div>
              <div className={styles.postDate}>
                <FaCalendarAlt />
                <span>{formatDate(post.date)}</span>
              </div>
              <div className={styles.readingTime}>
                <span>{formatReadingTime(post.content)}</span>
              </div>
            </motion.div>

            {post.tags && post.tags.length > 0 && (
              <motion.div
                className={styles.postTags}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                {post.tags.map((tag, index) => (
                  <span key={index} className={styles.tag}>
                    #{tag}
                  </span>
                ))}
              </motion.div>
            )}
          </div>
        </header>

        {/* Content */}
        <motion.div
          className={styles.postContent}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div 
            className={styles.content}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </motion.div>

        {/* Footer */}
        <footer className={styles.postFooter}>
          <div className={styles.footerActions}>
            <Link href="/blog" className={styles.backButton}>
              <FaArrowLeft /> Back to Blog
            </Link>
            <button onClick={handleShare} className={styles.shareButton}>
              <FaShare /> Share Article
            </button>
          </div>
        </footer>
      </article>

      {/* Related Posts */}
      <section className={styles.relatedPosts}>
        <h2>More Articles</h2>
        <div className={styles.relatedGrid}>
          {/* Related posts will be added later */}
          <p>More articles coming soon...</p>
        </div>
      </section>
    </div>
  );
}
