import dbConnect from '../../lib/dbConnect';
import BlogPost from '../../models/BlogPost';

export default async function handler(req, res) {
  await dbConnect();  // Ensures the database is connected before proceeding

  switch (req.method) {
    case 'GET':
      try {
        const blogs = await BlogPost.find();
        res.status(200).json(blogs);
      } catch (error) {
        res.status(500).json({ message: 'Failed to fetch blog posts' });
      }
      break;
    case 'POST':
      try {
        const blog = new BlogPost(req.body);
        await blog.save();
        res.status(201).json(blog);
      } catch (error) {
        res.status(500).json({ message: 'Failed to create blog post' });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
