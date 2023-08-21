import { Component } from "react";
import { FaTrash } from "react-icons/fa";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import "./App.css";

const url = "https://jsonplaceholder.typicode.com/";

export class App extends Component {
  state = {
    posts: [],
    images: []
  };

  loadPosts = async () => {
    const postsUrl = url + "posts";
    const imagesUrl = url + "photos";

    const [postsResponse, imagesResponse] = await Promise.all([
      fetch(postsUrl),
      fetch(imagesUrl)
    ]);
    const postsContent = await postsResponse.json();
    const images = await imagesResponse.json();

    const posts = postsContent.map((posts, index) => {
      return { ...posts, image: images[index].url };
    });

    this.setState({ posts: posts });
  };

  componentDidMount() {
    this.loadPosts();
  }

  deletePost = post => {
    const { posts } = this.state;
    this.setState({
      posts: posts.filter(p => p.id !== post.id)
    });

    console.log(this.state.images);
  };

  handleLikePost = postLiked => {
    const { posts } = this.state;

    this.setState({
      posts: posts.map(post =>
        post.id === postLiked.id ? { ...post, liked: !post.liked } : post
      )
    });
  };

  render() {
    const { posts } = this.state;
    return (
      <div className="App">
        <div className="postsList">
          {posts.map(post => (
            <div key={post.id} className="postCard">
              <img src={post.image} alt="Post image" className="postImage" />

              <div className="postContent">
                <h2 className="postTitle">{post.title}</h2>
                <p>{post.body}</p>
              </div>

              <div className="actionsCard">
                <button onClick={() => this.handleLikePost(post)}>
                  {post?.liked ? <AiFillHeart /> : <AiOutlineHeart />}
                </button>
                <button onClick={() => this.deletePost(post)}>
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
