import { Component } from "react";

import "./App.css";
import { PostCard } from "./components/PostCard";

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
            <PostCard
              post={post}
              deletePost={this.deletePost}
              handleLikePost={this.handleLikePost}
              key={post.id}
            />
          ))}
        </div>
      </div>
    );
  }
}
