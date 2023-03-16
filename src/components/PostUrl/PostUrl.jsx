import React, { useState } from "react";
import './PostUrl.css'

function Form() {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("https://vercel.com/1siikaa/url-shortner-7jc3/url/shorten", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ longUrl }),
      });
      const data = await response.json();
      alert('data fetched')
        console.log(data)
      setShortUrl(data.data.shortUrl);
      console.log(shortUrl)
      console.log(data.data.shorturl)
    } catch (error) {
      alert(error.name, error.message)
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="longUrl">Long URL:</label>
        <input
          type="text"
          id="longUrl"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      {shortUrl && (
        <div>
          <p>Short URL:</p>
          <a href={shortUrl}>{shortUrl}</a>
        </div>
      )}
    </div>
  );
}

export default Form;
