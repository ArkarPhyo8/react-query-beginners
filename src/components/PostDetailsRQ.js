import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";

const fetchPosts =(postId)=>{
    return axios.get(`http://localhost:4000/posts/${postId}`)
}

const PostDetailsRQ = () => {
  //get id from userParams()
  const { postId } = useParams();

  // use react query
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["posts", postId],
    queryFn: ()=>fetchPosts(postId),
  });

  if (isLoading) {
    return <div className="mt-5 mx-20 text-2xl text-center text-white font-semibold">Loading ....</div>;
  }
  if (isError) {
    return <div className="mt-5 mx-20 text-red-500">{error}</div>;
  }
  
  const {title , views } = data?.data || {};
  return (
    <div className="mt-5 mx-20">
        <div
          className="bg-slate-500 flex flex-col gap-2 text-white px-10 py-4 rounded-md hover:bg-slate-400 cursor-pointer transition-all duration-400"
        >
          <h3>Title : {title}</h3>
          <p>Views:{views}</p>
        </div>
    </div>
  );
};

export default PostDetailsRQ;
