import React, { useState, useEffect } from "react";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { app } from "../firebase"; // make sure firebase.js exports `app`

const db = getFirestore(app);

function Search() {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [lastSearches, setLastSearches] = useState([]);

  // Load last searches from localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("lastSearches")) || [];
    setLastSearches(stored);
  }, []);

  const saveSearchToFirestore = async (searchQuery) => {
    try {
      await addDoc(collection(db, "searches"), {
        query: searchQuery,
        timestamp: serverTimestamp(),
      });
    } catch (error) {
      console.error("Error saving to Firestore:", error);
    }
  };

  const saveSearchToLocalStorage = (searchQuery) => {
    const updated = [searchQuery, ...lastSearches.filter(q => q !== searchQuery)].slice(0, 5);
    setLastSearches(updated);
    localStorage.setItem("lastSearches", JSON.stringify(updated));
  };

  const fetchUsers = async (newQuery, newPage) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.github.com/search/users?q=${newQuery}&page=${newPage}&per_page=30`
      );
      const data = await response.json();

      const total = data.total_count || 0;
      const loadedSoFar = (newPage - 1) * 30 + (data.items?.length || 0);
      setHasMore(loadedSoFar < total);

      if (newPage === 1) {
        setUsers(data.items || []);
      } else {
        setUsers((prev) => [...prev, ...(data.items || [])]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query) return;

    setPage(1);
    fetchUsers(query, 1);
    saveSearchToFirestore(query);
    saveSearchToLocalStorage(query);
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchUsers(query, nextPage);
  };

  const handleLastSearchClick = (searchQuery) => {
    setQuery(searchQuery);
    setPage(1);
    fetchUsers(searchQuery, 1);
  };

  return (
    <div className="w-full max-w-4xl">
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="flex mb-4">
        <input
          type="text"
          placeholder="Enter GitHub username"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-grow p-3 rounded-l-lg border border-gray-300 focus:outline-none bg-[#6D9773] text-white placeholder-white focus:ring-2 focus:ring-[#FFBA00]"
        />
        <button
          type="submit"
          className="bg-[#B46C17] text-white px-6 rounded-r-lg hover:bg-[#a15a14] transition"
        >
          Search
        </button>
      </form>

      {/* Last Searches */}
      {lastSearches.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {lastSearches.map((item, idx) => (
            <button
              key={idx}
              onClick={() => handleLastSearchClick(item)}
              className="bg-[#FFBA00] text-[#0C3B2E] px-3 py-1 rounded-full font-medium hover:brightness-90 transition"
            >
              {item}
            </button>
          ))}
        </div>
      )}

      {/* Loading */}
      {loading && users.length === 0 && (
        <p className="text-center text-white">Loading...</p>
      )}

      {/* No Results */}
      {!loading && users.length === 0 && query && (
        <p className="text-center text-white mt-6">No users found for "{query}"</p>
      )}

      {/* User Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {users.map((user) => (
          <div
            key={user.id}
            className="rounded-2xl shadow-xl bg-white overflow-hidden transform transition-all hover:scale-105 hover:shadow-2xl"
          >
            <div className="bg-gradient-to-b from-[#0C3B2E] to-[#6D9773] p-6 flex flex-col items-center">
              <p className="text-sm text-[#FFBA00] font-bold mb-2">Avatar:</p>
              <img
                src={user.avatar_url}
                alt={user.login}
                className="w-24 h-24 rounded-full border-4 border-white shadow-md"
              />
            </div>
            <div className="p-6 text-center">
              <p className="font-medium text-[#B46C17]">Username:</p>
              <h3 className="text-xl font-semibold text-[#0C3B2E]">
                {user.login}
              </h3>
              <p className="font-medium text-[#B46C17] mt-4">Profile:</p>
              <a
                href={user.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0C3B2E] font-semibold hover:underline"
              >
                Click to see profile
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Load More */}
      {hasMore && !loading && (
        <div className="flex justify-center mt-8">
          <button
            onClick={handleLoadMore}
            className="bg-[#B46C17] text-white px-6 py-3 rounded-xl shadow-md hover:bg-[#a15a14] transition"
          >
            Load More
          </button>
        </div>
      )}

      {loading && users.length > 0 && (
        <p className="text-center text-white mt-4">Loading more...</p>
      )}
    </div>
  );
}

export default Search;
