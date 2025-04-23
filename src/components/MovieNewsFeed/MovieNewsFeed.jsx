import React, { useEffect, useState } from "react";
import axios from "axios";

const NEWS_API_KEY = "your_newsapi_key_here"; // заміни на свій ключ

const MovieNewsFeed = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await axios.get(
          `https://newsapi.org/v2/everything?q=movies&language=uk&sortBy=publishedAt&pageSize=8&apiKey=${NEWS_API_KEY}`
        );
        setArticles(res.data.articles);
      } catch (err) {
        console.error("Помилка при отриманні новин:", err);
      }
    };

    fetchNews();
  }, []);

  return (
    <section className="p-4 bg-white mt-10 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-6">📰 Кіноновини зі світу</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article, idx) => (
          <a
            key={idx}
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block bg-gray-50 rounded-xl overflow-hidden hover:shadow-lg transition">
            {article.urlToImage && (
              <img
                src={article.urlToImage}
                alt={article.title}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <h3 className="text-lg font-semibold group-hover:text-blue-600 transition">
                {article.title}
              </h3>
              <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                {article.description}
              </p>
              <p className="text-xs text-gray-400 mt-3">
                {new Date(article.publishedAt).toLocaleString("uk-UA")}
              </p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default MovieNewsFeed;
