export const SearchForm = ({ onSubmit }) => {
  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        name="query"
        // autocomplete="off"
        // autofocus
        placeholder="Search images and photos"
      />
      <button type="submit">Search</button>
    </form>
  );
};
