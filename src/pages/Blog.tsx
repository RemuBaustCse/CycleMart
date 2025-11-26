import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type Blog = {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  author: string;
};

const Blogs = () => {

  useEffect(() => {
      document.title = "Blogs | Bi-Cycle Store";
    }, []);

  const [blogs, setBlogs] = useState<Blog[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/blogs.json")
      .then((res) => res.json())
      .then((data) => {
        setBlogs(data); // Only show 4 blogs
      })
      .catch((err) => console.error("Failed to fetch blogs:", err));
  }, []);

  return (
    <section className="bg-white py-12 px-4 md:px-12">
      <div className="w-11/12 mx-auto">
        <h2 className="text-4xl w-full text-center font-bold text-gray-800 mb-10 border-yellow-300 inline-block pb-2">
          All <span className="text-yellow-400">Blog</span> Posts
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="cursor-pointer bg-white rounded-lg shadow-md border border-yellow-400 hover:shadow-xl transition duration-300"
              onClick={() => navigate(`/blog/${blog.id}`)}
            >
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="p-4 space-y-2">
                <h3 className="text-lg font-semibold text-gray-800 hover:text-yellow-500 transition">
                  {blog.title}
                </h3>
                <p className="text-sm text-gray-500">
                  {blog.date} • by {blog.author}
                </p>
                <p className="text-gray-700 text-sm">{blog.excerpt}</p>
                <span className="inline-block mt-2 text-yellow-500 font-medium hover:underline">
                  Read More →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blogs;
