import "./App.css";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import PostsTraditional from "./components/PostsTraditional";
import PostsRQ from "./components/PostsRQ";
import PostDetailsRQ from "./components/PostDetailsRQ";
import PaginationRQ from "./components/PaginationRQ";
import InfiniteQuery from "./components/InfiniteQuery";
import InfiniteScrollQuery from "./components/InfiniteScrollQuery";
import MutationQuery from "./components/MutationQuery";

function App() {
  return (
    <BrowserRouter>
      <div>
        <nav className="bg-slate-600 px-20 py-4 sticky top-0">
          <ul className="flex gap-8 items-center">
            <li className="text-xl font-semibold text-white cursor-pointer">
              <Link to="/">Home</Link>
            </li>
            <li className="text-xl font-semibold text-white cursor-pointer">
              <Link to="/posts">Traditional Posts</Link>
            </li>
            <li className="text-xl font-semibold text-white cursor-pointer">
              <Link to="/rq-posts">Posts RQ</Link>
            </li>
            <li className="text-xl font-semibold text-white cursor-pointer">
              <Link to="/rq-pagination">Pagination RQ</Link>
            </li>
            <li className="text-xl font-semibold text-white cursor-pointer">
              <Link to="/infinite-query">Infinite Query</Link>
            </li>
            <li className="text-xl font-semibold text-white cursor-pointer">
              <Link to="/infinite-scroll-query">Infinite Scroll Query</Link>
            </li>
            <li className="text-xl font-semibold text-white cursor-pointer">
              <Link to="/mutation-query">Mutation Query</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/posts" element={<PostsTraditional />} />
          <Route exact path="/rq-posts" element={<PostsRQ />} />
          <Route exact path="/rq-posts/:postId" element={<PostDetailsRQ />} />
          <Route exact path="/rq-pagination" element={<PaginationRQ />} />
          <Route exact path="/infinite-query" element={<InfiniteQuery />} />
          <Route exact path="/infinite-scroll-query" element={<InfiniteScrollQuery />} />
          <Route exact path="/mutation-query" element={<MutationQuery />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
