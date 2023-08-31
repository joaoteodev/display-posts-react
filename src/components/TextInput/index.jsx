import "./styles.css";

export const TextInput = ({ handleChange, searchFilter }) => {
  return (
    <input
      type="search"
      className="searchPost"
      onChange={handleChange}
      value={searchFilter}
      placeholder="Type to search..."
    />
  );
};
