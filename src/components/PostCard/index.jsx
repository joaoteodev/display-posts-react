import { FaTrash } from "react-icons/fa";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

import "./styles.css";

export const PostCard = ({ post, handleLikePost, deletePost }) => {
  return (
    <div className="postCard">
      <img src={post.image} alt="Post" className="postImage" />

      <div className="postContent">
        <h2 className="postTitle">{post.title}</h2>
        <p>{post.body}</p>
      </div>

      <div className="actionsCard">
        <button onClick={() => handleLikePost(post)}>
          {post?.liked ? <AiFillHeart /> : <AiOutlineHeart />}
        </button>
        <button onClick={() => deletePost(post)}>
          <FaTrash />
        </button>
      </div>
    </div>
  );
};
