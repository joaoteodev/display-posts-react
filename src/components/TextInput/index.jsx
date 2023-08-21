import "./styles.css";

export const TextInput = ({ handleInput, searchFilter }) => {
  return (
    <input
      type="search"
      className="searchPost"
      onChange={handleInput}
      value={searchFilter}
      placeholder="Type to search..."
    />
  );
};
