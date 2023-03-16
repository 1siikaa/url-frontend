import React, { useEffect, useState } from 'react';
import './PostUrl.css';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const PostUrl = () => {
  const [inputValue, setInputValue] = useState('');
  const [shorturl, setShorturl] = useState('');
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch(`https://short-api-51t8.onrender.com/url/shorten`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ longUrl: inputValue })
      });
      const result = await res.json();
      console.log('shortUrl', result.data.shortUrl);
      setShorturl(result.data.shortUrl);
      setLoading(false);
    } catch (err) {
      setError(err);
    }
  };

  useEffect(() => {
    if (inputValue.length) {
      fetchData();
    }
  }, [inputValue]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCopied(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [copied]);

  if (loading) {
    return <p className='noData'>Loading...</p>;
  }

  if (error) {
    return <p className='noData'>Something went wrong</p>;
  }

  return (
    <div className='link-result-container'>
      <input
        type='text'
        value={inputValue}
        placeholder='Paste long URL and shorten it'
        onChange={(e) => setInputValue(e.target.value)}
      />
      {shorturl && (
        <div className='result'>
          <p>{shorturl}</p>

          <CopyToClipboard text={shorturl} onCopy={() => setCopied(true)}>
            <button className={copied ? 'copied' : ''}>
              <i className='fa fa-clone'></i>Copy
            </button>
          </CopyToClipboard>
        </div>
      )}
    </div>
  );
};

export default PostUrl;

