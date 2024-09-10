import { keepPreviousData, useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";

const fetchStudent = (currentPage, limit) => {
  return axios.get(
    `http://localhost:4000/students?_per_page=${limit}&_page=${currentPage}`
  );
};
const PaginationRQ = () => {
  const [currentPage, setCurrentPage] = useState(1);
  console.log(currentPage);
  
  const [limit, setLimit] = useState(4);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["student",currentPage],
    queryFn: () => fetchStudent(currentPage, limit),
    placeholderData:keepPreviousData,
  });
  console.log(data?.data?.data);

  if(isLoading){
    return (
      <div className="mt-5 mx-20 text-2xl text-center text-white font-semibold">Loading...</div>
    )
  }
  if(isError){
    return (
      <div>{error}</div>
    )
  }

  return (
    <div className="mt-5 flex gap-5 flex-col items-center mx-20">
      <div className="flex flex-col gap-5 w-full">
        {data?.data?.data.map((student, index) => (
          <div
            key={index}
            className="bg-slate-500 flex flex-col gap-2 text-white px-10 py-4 rounded-md hover:bg-slate-400 cursor-pointer transition-all duration-400"
          >
            <h3>id : {student.id}</h3>
            <p>Student Name:{student.name}</p>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <button onClick={()=>setCurrentPage(prev => prev - 1)} className={` px-4 py-1 rounded-md ${currentPage === 1 ? "bg-slate-300 ": "bg-slate-400"}`} disabled={currentPage === 1 ? true : false}>Prev</button>
        <button onClick={()=>setCurrentPage(prev => prev + 1)} className={` px-4 py-1 rounded-md ${currentPage === 5 ? "bg-slate-300 ": "bg-slate-400"}`} disabled={currentPage === 5 ? true : false}>Next</button>

      </div>
    </div>
  );
};

export default PaginationRQ;
