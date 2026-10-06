import PostItem from "./PostItem";

function PostList ({ posts, onDeletePost }) {
    return (
        <ul>
            {posts.map((post) => (
                <PostItem 
                key={post.id} 
                post={post} 
                onDeletePost={onDeletePost} />
            ))}
        </ul>
    );
}
export default PostList;