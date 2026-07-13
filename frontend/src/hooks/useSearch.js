import { useState, useMemo } from 'react';

/**
 * A custom hook to handle searching and filtering a list of items.
 * @param {Array} items - The array of items to filter
 * @param {Array} searchKeys - The object keys to perform the string search on
 */
export const useSearch = (items = [], searchKeys = ['title']) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // useMemo ensures we only recalculate the filtered list when items or searchTerm changes,
  // preventing unnecessary expensive re-renders in large lists.
  const filteredItems = useMemo(() => {
    if (!searchTerm) return items;
    
    const lowerCaseSearch = searchTerm.toLowerCase();
    
    return items.filter(item => {
      // Check if any of the specified search keys contain the search term
      return searchKeys.some(key => {
        const val = item[key];
        return val && val.toString().toLowerCase().includes(lowerCaseSearch);
      });
    });
  }, [items, searchTerm, searchKeys]);

  return {
    searchTerm,
    setSearchTerm,
    filteredItems
  };
};
