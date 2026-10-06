function PostItem({ post, onDeletePost }) {
  return (
    <li>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <p>작성자: {post.author}</p>
      <p>작성일: {post.createdAt}</p>
      
      <button onClick={() => onDeletePost(post.id)}>삭제</button>
    </li>
  );
}

export default PostItem;