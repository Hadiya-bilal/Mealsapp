import { useState } from "react";

const Search = ({ onSearch }) => {
  const [input, setInput] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(input);
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>

<input
        type="text"
        placeholder="Search meals..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
    );
  };

export default Search;
