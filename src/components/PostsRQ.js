import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";

const PostsRQ=()=>{

    //link                      queryKey
    // /posts                   ["posts"]
    // /posts/1                 ["posts",1]
    // /posts/1/comment         ["posts" , 1 , "comment"]

   const {data , isError  , isLoading , error ,refetch} = useQuery({
        queryKey: ["posts"],
        queryFn:()=>{
          return  axios.get("http://localhost:4000/posts")
        },
        //staleTime: 20000,
        //refetchInterval: 1000,
        //refetchIntervalInBackground: true,
        //enabled: false,
    })
    

    if(isLoading){
        return <div className="mt-5 mx-20 text-2xl text-center text-white font-semibold">Loading ....</div>
      }
      if(isError){
        return <div className="mt-5 mx-20 text-red-500">{error}</div>
      }
    
    return (
        <div className="mt-5 flex gap-5 flex-col mx-20">
            <button onClick={refetch} className="bg-slate-400 w-fit px-2 py-1 rounded-md">refresh</button>
        {
            data?.data.map((post,index) => (
                <Link key={index} to={`/rq-posts/${post.id}`}>
                <div key={index} className="bg-slate-500 flex flex-col gap-2 text-white px-10 py-4 rounded-md hover:bg-slate-400 cursor-pointer transition-all duration-400">
                    <h3>Title : {post.title}</h3>
                    <p>Views:{post.views}</p>
                </div>
                </Link>
            ))
        }
    </div>
    )
}

export default PostsRQ;