import { useState, Component } from "react";
import "./App.css";

const url = "https://jsonplaceholder.typicode.com/";

export class App extends Component {
  state = {
    posts: []
  };

  getPosts = async () => {
    const response = await fetch(url + "posts");
    const data = await response.json();
    this.setState({ posts: data });
  };

  componentDidMount() {
    this.getPosts();
  }

  deletePost = post => {
    const { posts } = this.state;
    this.setState({
      posts: posts.filter(p => p.id !== post.id)
    });
    console.log(post);
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
        <header className="App-header">
          {posts.map(post => (
            <div key={post.id}>
              <h2>{post.title}</h2>
              <p>{post.body}</p>
              <span
                onClick={() => this.handleLikePost(post)}
                style={{ cursor: "pointer", userSelect: "none" }}
              >
                {post?.liked ? "❤" : "♡"}
              </span>
              <span
                onClick={() => this.deletePost(post)}
                style={{
                  cursor: "pointer",
                  userSelect: "none",
                  marginLeft: 20
                }}
              >
                🗑
              </span>
            </div>
          ))}
        </header>
      </div>
    );
  }
}
