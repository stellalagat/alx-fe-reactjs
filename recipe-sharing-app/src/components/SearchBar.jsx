import React from 'react';
import { useRecipeStore } from './recipeStore';

const SearchBar = () => {
  const searchTerm = useRecipeStore((s) => s.searchTerm);
  const setSearchTerm = useRecipeStore((s) => s.setSearchTerm);

  return (
    <div style={{ marginBottom: '12px' }}>
      <input
        type="text"
        value={searchTerm}
        placeholder="Search by name, ingredient or prep time..."
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          width: '100%',
          padding: '8px',
          boxSizing: 'border-box',
          borderRadius: 4,
          border: '1px solid #ccc',
        }}
      />
    </div>
  );
};

export default SearchBar;
