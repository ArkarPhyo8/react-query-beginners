import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";

//Get Method
const fetchPosts = () => {
  return axios.get("http://localhost:4000/posts");
};

//Post Method
const createPosts = async (posts) => {
  return await axios.post("http://localhost:4000/posts", posts);
};

//Delete Posts
const deletePosts = async (id) => {
  await axios.delete(`http://localhost:4000/posts/${id}`);
};

const MutationQuery = () => {
  const [title, setTitle] = useState("");
  const [view, setView] = useState("");

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["create-post"],
    queryFn: fetchPosts,
  });

  const queryClient = useQueryClient();

  //for delete mutation
  const deleteMutation = useMutation({
    mutationFn: deletePosts,
    onError: (error) => {
      console.log(error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["create-post"] });
    },
  });

  //for create mutation
  const createMutation = useMutation({
    mutationFn: createPosts,
    // onError: (error) => {
    //   console.log(error);
    // },
    // onSuccess: (newData) => {
    //     //queryClient.invalidateQueries({ queryKey: ["create-post"] });
    //     queryClient.setQueriesData(["create-post"],(oldData)=>{
    //       return {
    //         ...oldData,
    //         data:[...oldData.data , newData.data]
    //       }
    //      })
    // },

    onMutate: async (newPost) => {
      await queryClient.cancelQueries({
        queryKey: ["crate-post"]
      });
      const previousPostsData = queryClient.getQueriesData(["create-post"]);
      queryClient.setQueriesData(["create-post"], (oldData) => {
        return {
          ...oldData,
          data: [
            ...oldData.data,
            { ...newPost, id: String(oldData?.data?.length + 1) },
          ],
        };
      });

      return {
        previousPostsData,
      };
    },
    onError: (_error, _post, context) => {
      console.log(context);
      queryClient.setQueriesData(["create-post"], context.previousPostsData);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["create-post"])
    },
  });

  if (isLoading) {
    return <div className="mt-5 mx-20 text-2xl text-center text-white font-semibold">Loading ...</div>;
  }
  if (isError) {
    return <div>{error}</div>;
  }

  //Delete Posts
  const handleDelete = (id) => {
    deleteMutation.mutate(id);
  };

  //Create Posts
  const handleSubmit = (e) => {
    e.preventDefault();
    const posts = { title: title, views: view };
    createMutation.mutate(posts);
    setTitle("");
    setView("");
  };
  return (
    <div className="py-10 mx-20">
      <form onSubmit={handleSubmit}>
        <div className="flex justify-center items-center gap-5">
          <div>
            <label className="text-white text-xl font-semibold mr-2">Title -</label>
            <input
              className="px-4 py-2 rounded-md outline-slate-300"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Add Title..."
            />
          </div>
          <div>
            <label className="text-white text-xl font-semibold mr-2">Views -</label>
            <input
              className="px-4 py-2 rounded-md outline-slate-300"
              type="number"
              value={view}
              onChange={(e) => setView(e.target.value)}
              placeholder="Add view..."
            />
          </div>
          <button className="px-2 py-2 bg-cyan-900 hover:bg-cyan-950 text-white font-semibold rounded-md">
            Add Post
          </button>
        </div>
      </form>
      <button
        onClick={refetch}
        className="bg-slate-400 w-fit px-2 py-1 rounded-md"
      >
        refresh
      </button>

      <div className="mt-5 flex gap-5 flex-col">
        {data?.data.map((post, index) => (
          <div
            key={index}
            className="bg-slate-500 flex flex-col gap-2 text-white px-10 py-4 rounded-md hover:bg-slate-400 cursor-pointer transition-all duration-400"
          >
            <div className="flex justify-between">
              <div>
                <h3>Title : {post.title}</h3>
                <p>Views:{post.views}</p>
              </div>
              <div>
                <button
                  onClick={() => handleDelete(post.id)}
                  className=" bg-red-600 hover:bg-red-800 px-2 py-1 rounded-md"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MutationQuery;
