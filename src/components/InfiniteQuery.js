import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

const fetchStudent = ({ pageParam }) => {
  console.log(pageParam);

  return axios.get(
    `http://localhost:4000/students?_per_page=4&_page=${pageParam}`
  );
};
const InfiniteQuery = () => {
  const { data, isLoading, isError, error, fetchNextPage  , hasNextPage} = useInfiniteQuery({
    queryKey: ["infinity"],
    queryFn: fetchStudent,
    initialPageParam: 1,
    getNextPageParam: (_lastPage, page) => {
      if (page.length < 5) {
        return page.length + 1;
      } else {
        return undefined;
      }
    },
  });
  if (isLoading) {
    return <div className="mt-5 mx-20 text-2xl text-center text-white font-semibold">Loading...</div>;
  }
  if (isError) {
    return <div>{error}</div>;
  }
  console.log(data);

  return (
    <div className="mt-5 flex gap-5 flex-col mx-20 py-10">
      {data?.pages.map((page) =>
        page.data.data.map((student, index) => (
          <div
            key={index}
            className="bg-slate-500 flex flex-col gap-2 text-white px-10 py-4 rounded-md hover:bg-slate-400 cursor-pointer transition-all duration-400"
          >
            <h3>id : {student.id}</h3>
            <p>Student Name:{student.name}</p>
          </div>
        ))
      )}

      <div>
        <button
          onClick={fetchNextPage}
          className={`text-white px-2 py-1 rounded-md ${hasNextPage ? "bg-slate-600" : "bg-slate-400"}`}
          disabled={!hasNextPage}
        >
          Load more...
        </button>
      </div>
    </div>
  );
};

export default InfiniteQuery;
