import { useState } from 'react';
import style from "./SearchBar.module.css"

function SearchBar({ onSearch }) {
  const [name, setName] = useState('');

  const handleChange = (event) => {
    const newName = event.target.value;
    console.log("New search query:", newName);
    setName(newName);
    onSearch(newName);
  }

  return (
    <div className={style.search}>
      <input
        type="search"
        placeholder=" Find by name"
        value={name}
        onChange={handleChange}
      />
    </div>
  );
}

export default SearchBar;