import "./styles.css";

export const Button = ({ text, loadMorePosts, isDisabled }) => {
  return (
    <button
      disabled={isDisabled}
      onClick={loadMorePosts}
      className="loadMorePosts"
    >
      {text}
    </button>
  );
};
