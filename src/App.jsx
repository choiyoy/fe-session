import "./App.css";
import { useEffect, useState } from "react";
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";


const API_URL = "https://jsonplaceholder.typicode.com";

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
   fetch("http://localhost:3000/posts")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`게시물 정보를 불러오지 못했어요. (${response.status})`);
      }
      return response.json();
    })
    .then((data) => setPosts(data))
    .catch((error) => setError(error.message))
    .finally(() => setLoading(false));
  }, []);

  //!!!!
  const addPost = (newPost) => {
    fetch("http://localhost:3000/posts", {
      method: "POST", // 서버한테 새 데이터 저장하라고 요청
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPost),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("게시글 작성에 실패했습니다.");
        }

        return response.json();
      })
      .then((savedPost) => {
        setPosts((prevPosts) => [...prevPosts, savedPost]);
      })
      .catch((error) => {
        setError(error.message);
      });
    };

  const deletePost = (id) => {
    fetch(`http://localhost:3000/posts/${id}`, { 
     method: "DELETE",
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error("게시글 삭제에 실패했습니다.");
      }

      setPosts((prevPosts) => 
        prevPosts.filter((post) => post.id !== id));
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  
  if (loading) {
    return <p>로딩 중...</p>;
  }
  
  if (error) {
    return <p>{error}</p>;
  }

  const filteredPosts = posts.filter((post) => 
    post.title.toLowerCase().includes(search.toLowerCase().trim())
  );
  
  return (
    <main>
      <h1>게시판</h1>

      <input
        className="search-input"
        type="text"
        placeholder="검색어를 입력하세요."
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />

      <PostForm onAddPost={addPost} />
      
      <PostList posts={filteredPosts} onDeletePost={deletePost} /> 
    </main>
  );
}
export default App;