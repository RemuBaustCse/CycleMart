import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type Blog = {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  author: string;
};

const BlogList = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    fetch("/blogs.json")
      .then((res) => res.json())
      .then((data) => setBlogs(data.slice(0, 4))) // only show 4
      .catch((err) => console.error("Failed to load blogs:", err));
  }, []);

  return (
    <section className="bg-white mx-auto py-6 px-4 md:px-12">
      <div className="mx-auto">
        <h2 className="text-4xl font-bold w-full text-gray-800 text-center mb-10 border-yellow-300 inline-block pb-2">
          Latest <span className="text-yellow-400">Blog</span> Posts
        </h2>

        <div className="grid grid-cols-1 w-11/12  mx-auto md:grid-cols-2 lg:grid-cols-4 gap-4">
          {blogs.map((post) => (
            <div key={post.id} className="bg-white rounded-lg shadow-md border hover:shadow-xl transition">
              <img src={post.image} alt={post.title} className="w-full h-48 object-cover rounded-t-lg" />
              <div className="p-6 space-y-2">
                <h3 className="text-lg font-semibold text-gray-800 hover:text-yellow-500 transition">{post.title}</h3>
                <p className="text-sm text-gray-500">{post.date} • by {post.author}</p>
                <p className="text-gray-700 text-sm">{post.excerpt}</p>
                <Link to={`/blog/${post.id}`} className="inline-block text-yellow-500 font-medium hover:underline mt-2">
                  Read More →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogList;
