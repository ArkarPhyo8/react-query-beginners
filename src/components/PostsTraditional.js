import { useEffect, useState } from "react";
import axios from "axios";
const PostsTraditional = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchPosts = async () => {
    try {
      const res = await axios.get("http://localhost:4000/posts");
      setPosts(res.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchPosts();
  }, []);

  if (loading) {
    return <div className="mt-5 mx-20 text-2xl text-center text-white font-semibold">Loading ....</div>;
  }
  if (error) {
    return <div className="mt-5 mx-20 text-red-500">Something wrong ....</div>;
  }
  return (
    <div className="mt-5 flex gap-5 flex-col mx-20">
      {posts?.map((post, index) => (
          <div
            key={index}
            className="bg-slate-500 flex flex-col gap-2 text-white px-10 py-4 rounded-md hover:bg-slate-400 cursor-pointer transition-all duration-400"
          >
            <h3>Title : {post.title}</h3>
            <p>Views:{post.views}</p>
          </div>
      ))}
    </div>
  );
};

export default PostsTraditional;
