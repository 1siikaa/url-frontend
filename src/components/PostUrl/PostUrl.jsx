import React, { useState } from 'react';
import './PostUrl.css';

const PostUrl = () => {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://vercel.com/1siikaa/url-shortner-7jc3/url/shorten', {
        mode : "no-cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ longUrl })
      });
      console.log(res)
      const result = await res.json();
      console.log(result)

      if (result.status) {
        setShortUrl(result.data.shortUrl);
        setError("");
      } else {
        setShortUrl("");
        setError(result.message);
      }

    } catch (err) {
      console.log(err);
      setError("Something went wrong. Please try again later.");
    }
  }

  return (
    <div className="container">
      <h1>Shorten a URL</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter a long URL"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          required
        />
        <button type="submit">Shorten</button>
      </form>

      {error && <p className="error">{error}</p>}
      {shortUrl && (
        <div className="result">
          <p>Short URL:</p>
          <a href={shortUrl} target="_blank" rel="noopener noreferrer">{shortUrl}</a>
        </div>
      )}
    </div>
  );
};

export default PostUrl;
