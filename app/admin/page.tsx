"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaBlog, FaPlus, FaEdit, FaTrash, FaSave, FaTimes, FaImage, FaUser, FaCalendar, FaTag, FaFileAlt, FaCog, FaSignOutAlt } from 'react-icons/fa';
import styles from '../styless/Admin.module.css';

interface BlogPost {
  _id?: string;
  title: string;
  content: string;
  summary: string;
  author: string;
  date: string;
  image?: string;
  tags: string[];
  status: 'draft' | 'published';
}

interface Location {
  _id?: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  hours: string;
  description: string;
  image?: string;
  status: 'active' | 'inactive';
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'blogs' | 'locations' | 'settings'>('blogs');
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showBlogForm, setShowBlogForm] = useState(false);
  const [showLocationForm, setShowLocationForm] = useState(false);
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const [editingLocation, setEditingLocation] = useState<Location | null>(null);

  // Authentication state
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });

  // Blog form state - FIXED: Added null check for date
  const [blogForm, setBlogForm] = useState<BlogPost>({
    title: '',
    content: '',
    summary: '',
    author: 'MEL Laundry Team',
    date: new Date().toISOString().split('T')[0] || '',
    tags: [],
    status: 'draft'
  });

  // Location form state
  const [locationForm, setLocationForm] = useState<Location>({
    name: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
    hours: '',
    description: '',
    status: 'active'
  });

  useEffect(() => {
    // Check if already authenticated
    const token = localStorage.getItem('adminToken');
    if (token) {
      setIsAuthenticated(true);
      fetchData();
    }
  }, []);

  const fetchData = async () => {
    try {
      const [blogsRes, locationsRes] = await Promise.all([
        fetch('http://localhost:5001/api/blogs'),
        fetch('http://localhost:5001/api/locations')
      ]);

      if (blogsRes.ok && locationsRes.ok) {
        const blogsData = await blogsRes.json();
        const locationsData = await locationsRes.json();
        setBlogs(blogsData);
        setLocations(locationsData);
      }
    } catch (err) {
      setError('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5001/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginForm)
      });

      if (response.ok) {
        const { token } = await response.json();
        localStorage.setItem('adminToken', token);
        setIsAuthenticated(true);
        fetchData();
      } else {
        setError('Invalid credentials');
      }
    } catch (err) {
      setError('Login failed');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsAuthenticated(false);
  };

  const handleSaveBlog = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const url = editingBlog ? 
        `http://localhost:5001/api/blogs/${editingBlog._id}` : 
        'http://localhost:5001/api/blogs';
      
      const method = editingBlog ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(blogForm)
      });

      if (response.ok) {
        setShowBlogForm(false);
        setEditingBlog(null);
        resetBlogForm();
        fetchData();
      } else {
        setError('Failed to save blog');
      }
    } catch (err) {
      setError('Failed to save blog');
    }
  };

  const handleDeleteBlog = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog?')) return;

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`http://localhost:5001/api/blogs/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        fetchData();
      } else {
        setError('Failed to delete blog');
      }
    } catch (err) {
      setError('Failed to delete blog');
    }
  };

  const handleEditBlog = (blog: BlogPost) => {
    setEditingBlog(blog);
    setBlogForm(blog);
    setShowBlogForm(true);
  };

  const resetBlogForm = () => {
    setBlogForm({
      title: '',
      content: '',
      summary: '',
      author: 'MEL Laundry Team',
      date: new Date().toISOString().split('T')[0] || '',
      tags: [],
      status: 'draft'
    });
  };

  const handleEditLocation = (location: Location) => {
    setEditingLocation(location);
    setLocationForm(location);
    setShowLocationForm(true);
  };

  const handleDeleteLocation = async (id: string) => {
    if (!confirm('Are you sure you want to delete this location?')) return;

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`http://localhost:5001/api/locations/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        fetchData();
      } else {
        setError('Failed to delete location');
      }
    } catch (err) {
      setError('Failed to delete location');
    }
  };

  const handleSaveLocation = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const url = editingLocation ? 
        `http://localhost:5001/api/locations/${editingLocation._id}` : 
        'http://localhost:5001/api/locations';
      
      const method = editingLocation ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(locationForm)
      });

      if (response.ok) {
        setShowLocationForm(false);
        setEditingLocation(null);
        fetchData();
      } else {
        setError('Failed to save location');
      }
    } catch (err) {
      setError('Failed to save location');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className={styles.adminContainer}>
        <div className={styles.loginContainer}>
          <motion.div
            className={styles.loginCard}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1>MEL Laundry Admin</h1>
            <p>Sign in to manage your content</p>
            
            <form onSubmit={handleLogin} className={styles.loginForm}>
              <div className={styles.formGroup}>
                <label>Username</label>
                <input
                  type="text"
                  value={loginForm.username}
                  onChange={(e) => setLoginForm({...loginForm, username: e.target.value})}
                  required
                />
              </div>
              
              <div className={styles.formGroup}>
                <label>Password</label>
                <input
                  type="password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                  required
                />
              </div>
              
              {error && <div className={styles.error}>{error}</div>}
              
              <button type="submit" className={styles.loginButton}>
                Sign In
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.adminContainer}>
      {/* Header */}
      <header className={styles.adminHeader}>
        <div className={styles.headerContent}>
          <h1>MEL Laundry Admin Dashboard</h1>
          <button onClick={handleLogout} className={styles.logoutButton}>
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </header>

      {/* Navigation */}
      <nav className={styles.adminNav}>
        <button
          className={`${styles.navButton} ${activeTab === 'blogs' ? styles.active : ''}`}
          onClick={() => setActiveTab('blogs')}
        >
          <FaBlog /> Blog Management
        </button>
        <button
          className={`${styles.navButton} ${activeTab === 'locations' ? styles.active : ''}`}
          onClick={() => setActiveTab('locations')}
        >
          <FaFileAlt /> Locations
        </button>
        <button
          className={`${styles.navButton} ${activeTab === 'settings' ? styles.active : ''}`}
          onClick={() => setActiveTab('settings')}
        >
          <FaCog /> Settings
        </button>
      </nav>

      {/* Content */}
      <main className={styles.adminContent}>
        {error && (
          <div className={styles.errorBanner}>
            {error}
            <button onClick={() => setError(null)}>×</button>
          </div>
        )}

        {activeTab === 'blogs' && (
          <div className={styles.blogSection}>
            <div className={styles.sectionHeader}>
              <h2>Blog Posts</h2>
              <button
                onClick={() => {
                  setShowBlogForm(true);
                  setEditingBlog(null);
                  resetBlogForm();
                }}
                className={styles.addButton}
              >
                <FaPlus /> New Blog Post
              </button>
            </div>

            {loading ? (
              <div className={styles.loading}>Loading...</div>
            ) : (
              <div className={styles.blogGrid}>
                {blogs.map((blog) => (
                  <motion.div
                    key={blog._id}
                    className={styles.blogCard}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div className={styles.blogHeader}>
                      <h3>{blog.title}</h3>
                      <span className={`${styles.status} ${styles[blog.status]}`}>
                        {blog.status}
                      </span>
                    </div>
                    
                    <p className={styles.blogSummary}>{blog.summary}</p>
                    
                    <div className={styles.blogMeta}>
                      <span><FaUser /> {blog.author}</span>
                      <span><FaCalendar /> {blog.date}</span>
                    </div>
                    
                    <div className={styles.blogActions}>
                      <button
                        onClick={() => handleEditBlog(blog)}
                        className={styles.editButton}
                      >
                        <FaEdit /> Edit
                      </button>
                      <button
                        onClick={() => handleDeleteBlog(blog._id!)}
                        className={styles.deleteButton}
                      >
                        <FaTrash /> Delete
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'locations' && (
          <div className={styles.locationSection}>
            <div className={styles.sectionHeader}>
              <h2>Location Management</h2>
              <button
                onClick={() => {
                  setShowLocationForm(true);
                  setEditingLocation(null);
                  setLocationForm({
                    name: '',
                    address: '',
                    city: '',
                    state: '',
                    zipCode: '',
                    phone: '',
                    hours: '',
                    description: '',
                    status: 'active'
                  });
                }}
                className={styles.addButton}
              >
                <FaPlus /> Add Location
              </button>
            </div>

            {loading ? (
              <div className={styles.loading}>Loading...</div>
            ) : (
              <div className={styles.locationGrid}>
                {locations.map((location) => (
                  <motion.div
                    key={location._id}
                    className={styles.locationCard}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <h3>{location.name}</h3>
                    <p>{location.address}</p>
                    <p>{location.city}, {location.state} {location.zipCode}</p>
                    <div className={styles.locationActions}>
                      <button 
                        onClick={() => handleEditLocation(location)}
                        className={styles.editButton}
                      >
                        <FaEdit /> Edit
                      </button>
                      <button 
                        onClick={() => handleDeleteLocation(location._id!)}
                        className={styles.deleteButton}
                      >
                        <FaTrash /> Delete
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'settings' && (
          <div className={styles.settingsSection}>
            <h2>Settings</h2>
            <div className={styles.settingsCard}>
              <h3>General Settings</h3>
              <p>Configure your application settings here.</p>
            </div>
          </div>
        )}
      </main>

      {/* Blog Form Modal */}
      {showBlogForm && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h3>{editingBlog ? 'Edit Blog Post' : 'New Blog Post'}</h3>
              <button
                onClick={() => {
                  setShowBlogForm(false);
                  setEditingBlog(null);
                  resetBlogForm();
                }}
                className={styles.closeButton}
              >
                <FaTimes />
              </button>
            </div>

            <div className={styles.modalBody}>
              <div className={styles.formGroup}>
                <label>Title</label>
                <input
                  type="text"
                  value={blogForm.title}
                  onChange={(e) => setBlogForm({...blogForm, title: e.target.value})}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label>Summary</label>
                <textarea
                  value={blogForm.summary}
                  onChange={(e) => setBlogForm({...blogForm, summary: e.target.value})}
                  rows={3}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label>Content</label>
                <textarea
                  value={blogForm.content}
                  onChange={(e) => setBlogForm({...blogForm, content: e.target.value})}
                  rows={10}
                  required
                />
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Author</label>
                  <input
                    type="text"
                    value={blogForm.author}
                    onChange={(e) => setBlogForm({...blogForm, author: e.target.value})}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Date</label>
                  <input
                    type="date"
                    value={blogForm.date}
                    onChange={(e) => setBlogForm({...blogForm, date: e.target.value})}
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label>Tags (comma separated)</label>
                <input
                  type="text"
                  value={blogForm.tags.join(', ')}
                  onChange={(e) => setBlogForm({...blogForm, tags: e.target.value.split(',').map(tag => tag.trim())})}
                  placeholder="laundry, tips, cleaning"
                />
              </div>

              <div className={styles.formGroup}>
                <label>Status</label>
                <select
                  value={blogForm.status}
                  onChange={(e) => setBlogForm({...blogForm, status: e.target.value as 'draft' | 'published'})}
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
            </div>

            <div className={styles.modalFooter}>
              <button
                onClick={handleSaveBlog}
                className={styles.saveButton}
              >
                <FaSave /> {editingBlog ? 'Update' : 'Publish'} Blog Post
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Location Form Modal */}
      {showLocationForm && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h3>{editingLocation ? 'Edit Location' : 'Add New Location'}</h3>
              <button
                onClick={() => {
                  setShowLocationForm(false);
                  setEditingLocation(null);
                }}
                className={styles.closeButton}
              >
                <FaTimes />
              </button>
            </div>

            <div className={styles.modalBody}>
              <div className={styles.formGroup}>
                <label>Location Name</label>
                <input
                  type="text"
                  value={locationForm.name}
                  onChange={(e) => setLocationForm({...locationForm, name: e.target.value})}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label>Address</label>
                <input
                  type="text"
                  value={locationForm.address}
                  onChange={(e) => setLocationForm({...locationForm, address: e.target.value})}
                  required
                />
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>City</label>
                  <input
                    type="text"
                    value={locationForm.city}
                    onChange={(e) => setLocationForm({...locationForm, city: e.target.value})}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>State</label>
                  <input
                    type="text"
                    value={locationForm.state}
                    onChange={(e) => setLocationForm({...locationForm, state: e.target.value})}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Zip Code</label>
                  <input
                    type="text"
                    value={locationForm.zipCode}
                    onChange={(e) => setLocationForm({...locationForm, zipCode: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Phone</label>
                  <input
                    type="tel"
                    value={locationForm.phone}
                    onChange={(e) => setLocationForm({...locationForm, phone: e.target.value})}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Hours</label>
                  <input
                    type="text"
                    value={locationForm.hours}
                    onChange={(e) => setLocationForm({...locationForm, hours: e.target.value})}
                    placeholder="Mon-Fri: 8AM-8PM, Sat-Sun: 9AM-6PM"
                    required
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label>Description</label>
                <textarea
                  value={locationForm.description}
                  onChange={(e) => setLocationForm({...locationForm, description: e.target.value})}
                  rows={3}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label>Status</label>
                <select
                  value={locationForm.status}
                  onChange={(e) => setLocationForm({...locationForm, status: e.target.value as 'active' | 'inactive'})}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>

            <div className={styles.modalFooter}>
              <button
                onClick={handleSaveLocation}
                className={styles.saveButton}
              >
                <FaSave /> {editingLocation ? 'Update' : 'Add'} Location
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}