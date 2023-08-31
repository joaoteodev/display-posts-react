import { Component, useEffect, useState } from "react";

import "./styles.css";

import { PostCard } from "../../components/PostCard";
import { loadPosts } from "../../utils/loadPosts";
import { Button } from "../../components/Button";
import { TextInput } from "../../components/TextInput";

const url = "https://jsonplaceholder.typicode.com/";

export class Home extends Component {
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 10,
    searchFilter: ""
  };

  loadPosts = async () => {
    const { page, postsPerPage } = this.state;
    const posts = await loadPosts(url);

    this.setState({
      allPosts: posts,
      posts: posts.slice(page, postsPerPage)
    });
  };

  componentDidMount() {
    this.loadPosts();
  }

  deletePost = post => {
    const { posts } = this.state;
    this.setState({
      posts: posts.filter(p => p.id !== post.id)
    });
  };

  handleLikePost = postLiked => {
    const { posts } = this.state;

    this.setState({
      posts: posts.map(post =>
        post.id === postLiked.id ? { ...post, liked: !post.liked } : post
      )
    });
  };

  loadMorePosts = () => {
    const { allPosts, posts, page, postsPerPage } = this.state;
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);

    this.setState({
      page: nextPage,
      posts: [...posts, ...nextPosts]
    });
  };

  handleInput = event => {
    const { value } = event.target;

    this.setState({
      searchFilter: value
    });
  };

  render() {
    const { posts, page, postsPerPage, allPosts, searchFilter } = this.state;
    const isDisabled = page + postsPerPage >= allPosts.length;

    const filteredPosts = posts.filter(post =>
      post.title.toLowerCase().includes(searchFilter.toLowerCase())
    );

    return (
      <div className="App">
        <TextInput handleInput={this.handleInput} searchFilter={searchFilter} />
        <div className="postsList">
          {filteredPosts.length > 0 &&
            filteredPosts.map(post => (
              <PostCard
                post={post}
                deletePost={this.deletePost}
                handleLikePost={this.handleLikePost}
                key={post.id}
              />
            ))}
          {filteredPosts.length === 0 && (
            <p className="noPosts">No posts found...</p>
          )}
        </div>

        <div className="button-container">
          {!searchFilter && (
            <Button
              isDisabled={isDisabled}
              text="Load more posts"
              loadMorePosts={this.loadMorePosts}
            />
          )}
        </div>
      </div>
    );
  }
}

export const Home2 = () => {
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [searchFilter, setSearchFilter] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);

  const postsPerPage = 10;

  const loadAllPosts = async url => {
    const postsResponse = await loadPosts(url);

    setAllPosts(postsResponse);
    setPosts(postsResponse.slice(page, postsPerPage));
    setFilteredPosts(postsResponse.slice(page, postsPerPage));
  };

  const deletePost = postDeleted => {
    setPosts(posts.filter(post => post.id !== postDeleted.id));
  };

  const handleLikePost = postLiked => {
    setPosts(
      posts.map(post =>
        post.id === postLiked.id ? { ...post, liked: !post.liked } : post
      )
    );
  };

  const loadMorePosts = () => {
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);

    setPage(nextPage);
    setPosts([...posts, ...nextPosts]);
  };

  const handleChange = event => {
    setSearchFilter(event.target.value);
  };

  useEffect(() => {
    if (page + postsPerPage >= allPosts.length) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }

    setFilteredPosts(
      posts.filter(post =>
        post.title.toLowerCase().includes(searchFilter.toLowerCase())
      )
    );
  }, [posts, searchFilter]);

  useEffect(() => {
    loadAllPosts(url);
  }, []);

  return (
    <div className="App">
      <TextInput handleChange={handleChange} searchFilter={searchFilter} />
      <div className="postsList">
        {filteredPosts.length > 0 &&
          filteredPosts.map(post => (
            <PostCard
              post={post}
              deletePost={deletePost}
              handleLikePost={handleLikePost}
              key={post.id}
            />
          ))}
        {filteredPosts.length === 0 && (
          <p className="noPosts">No posts found...</p>
        )}
      </div>

      <div className="button-container">
        {!searchFilter && (
          <Button
            isDisabled={isDisabled}
            text="Load more posts"
            loadMorePosts={loadMorePosts}
          />
        )}
      </div>
    </div>
  );
};
