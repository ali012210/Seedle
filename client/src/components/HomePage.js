import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { PostsContext } from '../context/PostsContext';
import PostList from './PostList';
import CreatePostQuickForm from './CreatePostQuickForm'; 

const HomePage = () => {
  // Access global states
  const { isAuthenticated } = useContext(AuthContext);
  const { fetchPosts } = useContext(PostsContext);
  
  // Local state to manage search/filter terms
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTag, setFilterTag] = useState('');

  useEffect(() => {
    // Fetch initial posts on mount or when search/filter terms change
    fetchPosts(searchTerm, filterTag);
  }, [fetchPosts, searchTerm, filterTag]);

  // Handlers for search and tag filtering, called from within UI
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleTagFilterChange = (selectedTag) => {
    setFilterTag(selectedTag);
  };

  return (
    <div className="homepage">
      {isAuthenticated && (
        <div className="quick-post-form-container">
          <CreatePostQuickForm />
        </div>
      )}

      <div className="search-filter-container">
        <input
          type="text"
          placeholder="Search posts..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <select onChange={(e) => handleTagFilterChange(e.target.value)}>
          <option value="">Select a tag...</option>
          {/* Options should be dynamically generated based on available tags */}
          <option value="Gardening">Gardening</option>
          <option value="HousePlants">House Plants</option>
        </select>
      </div>

      <PostList />

      <footer className="homepage-footer">
        {/* Footer content */}
        <Link to="/about">About Seedle</Link>
        <Link to="/contact">Contact Us</Link>
      </footer>
    </div>
  );
};

export default HomePage;
