import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './newsfeed.css';

const categories = ['Technology', 'Sports', 'Business', 'Entertainment', 'Health', 'Science'];

const NewsFeed = () => {
  const [news, setNews] = useState([]);
  const [query, setQuery] = useState('technology');
  const [activeCategory, setActiveCategory] = useState('Technology');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [bookmarkedArticles, setBookmarkedArticles] = useState(new Set());
  const apiKey = 'f6c765af22c14de5a4a600fd60d1cb60';

  const fetchNews = useCallback(async (pageNumber) => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get('https://news-aggregator-backend-production.up.railway.app/news', {
        params: {
          apiKey: apiKey,
          query: query.toLowerCase(),
          page: pageNumber,
          pageSize: 10 
        }
      });

      const { articles, totalResults } = response.data;

      if (!articles) {
        throw new Error('No articles found.');
      }

      const filteredArticles = articles.filter(article => article.urlToImage);

      setNews(prevNews => [...prevNews, ...filteredArticles]);
      setTotalResults(totalResults);
    } catch (error) {
      setError('Unable to fetch news articles. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, [query, apiKey]);

  useEffect(() => {
    fetchNews(page);
  }, [page, fetchNews]);

  const handleCategoryChange = (category) => {
    setQuery(category);
    setActiveCategory(category);
    setPage(1); 
    setNews([]); 
  };

  const handleSearchChange = (e) => {
    setQuery(e.target.value);
    setPage(1);
    setNews([]); 
  };

  const handleArticleClick = (article) => {
    setSelectedArticle(article);
  };

  const closeModal = () => {
    setSelectedArticle(null);
  };

  const handleBookmark = (article) => {
    setBookmarkedArticles(prev => {
      const updatedBookmarks = new Set(prev);
      if (updatedBookmarks.has(article.url)) {
        updatedBookmarks.delete(article.url);
      } else {
        updatedBookmarks.add(article.url);
      }
      return updatedBookmarks;
    });
  };

  const isBookmarked = (article) => {
    return bookmarkedArticles.has(article.url);
  };

  const handleScroll = (e) => {
    const bottom = e.target.scrollHeight === e.target.scrollTop + e.target.clientHeight;
    if (bottom && !loading && news.length < totalResults) {
      setPage(prevPage => prevPage + 1);
    }
  };

  return (
    <div className="news-feed" onScroll={handleScroll}>
      <nav className="navbar">
        {categories.map((category, index) => (
          <button 
            key={index} 
            className={`navbar-item ${activeCategory === category ? 'active' : ''}`} 
            onClick={() => handleCategoryChange(category)}
          >
            {category}
          </button>
        ))}
      </nav>
      <h2 className="news-feed-title">Top {activeCategory} News</h2>
      <input 
        type="text" 
        placeholder="Search for news..." 
        value={query} 
        onChange={handleSearchChange} 
        className="search-input"
      />
      {error && <p className="error-message">{error}</p>}
      {loading && <p className="loading-message">Loading news articles...</p>}
      <div className="news-wrapper">
        {news.length > 0 ? (
          news.map((article, index) => (
            <div key={index} className="news-item">
              <img src={article.urlToImage} alt={article.title} className="news-image" />
              <div className="news-content" onClick={() => handleArticleClick(article)}>
                <h3 className="news-title">
                  {index + 1}. {article.title}
                </h3>
                <p className="news-description">{article.description}</p>
                <div className="news-actions">
                  <a href={article.url} target="_blank" rel="noopener noreferrer" className="news-link">
                    Read more
                  </a>
                  <button onClick={() => handleBookmark(article)} className="bookmark-button">
                    {isBookmarked(article) ? 'Unbookmark' : 'Bookmark'}
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          !loading && <p>No news articles available with images.</p>
        )}
      </div>
      {selectedArticle && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>{selectedArticle.title}</h3>
            <p>{selectedArticle.description}</p>
            <a href={selectedArticle.url} target="_blank" rel="noopener noreferrer">Read more</a>
            <button onClick={closeModal} className="modal-close-button">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsFeed;