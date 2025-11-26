import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

type BlogPost = {
  id: number;
  title: string;
  excerpt: string;
  description: string;
  image: string;
  date: string;
  author: string;
  readingTime: string;
  tags: string[];
};

const BlogDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [blog, setBlog] = useState<BlogPost | null>(null);

  useEffect(() => {
    fetch("/blogs.json")
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((b: BlogPost) => b.id === Number(id));
        setBlog(found);
      });
  }, [id]);

  if (!blog) return <p className="text-center mt-20">Loading...</p>;

  return (
    <div className="w-11/12 mx-auto px-4 py-12">
      <img
        src={blog.image}
        alt={blog.title}
        className="w-full h-64 object-cover rounded-lg shadow mb-6"
      />
      <div className="space-y-4">
        <h1 className="text-4xl font-bold text-gray-800">{blog.title}</h1>
        <p className="text-sm text-gray-500">
          {blog.date} • {blog.readingTime} • by {blog.author}
        </p>
        <div className="flex flex-wrap gap-2">
          {blog.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded"
            >
              #{tag}
            </span>
          ))}
        </div>
        <p className="text-gray-700 text-lg leading-relaxed">{blog.description}</p>
        <Link
          to="/"
          className="inline-block mt-6 text-yellow-600 hover:underline"
        >
          ← Back to Blog
        </Link>
      </div>
    </div>
  );
};

export default BlogDetail;
