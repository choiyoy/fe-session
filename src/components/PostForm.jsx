import { useState } from "react";


function PostForm({ onAddPost }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        const newPost = {
                title : title,
                content : content,
                author : author,
                createdAt : new Date().toISOString().split("T")[0],
            };

            onAddPost(newPost); // data App.jsx로 전달

            setTitle("");
            setContent("");
            setAuthor("");
        };

        return (
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="제목"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                />

                <input
                    type="text"
                    placeholder="작성자"
                    value={author}
                    onChange={(event) => setAuthor(event.target.value)}
                />

                <textarea
                    placeholder="내용"
                    value={content}
                    onChange={(event) => setContent(event.target.value)}
                />
                <button type="submit">글 작성</button>
            </form>            
        );
    }

export default PostForm;
