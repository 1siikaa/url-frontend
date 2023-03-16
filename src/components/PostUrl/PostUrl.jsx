import React, { useEffect, useState } from 'react'
import './PostUrl.css'
import { CopyToClipboard } from 'react-copy-to-clipboard'

const PostUrl = ({ inputValue }) => {
    const [shorturl, setShorturl] = useState("")
    const [copied, setCopied] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    const fetchData = async (longUrl) => {
        try {
            setLoading(true)
            const res = await fetch("https://vercel.com/1siikaa/url-shortner-7jc3/url/shorten", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ longUrl })
            })
            const result = await res.json()
            console.log("shortUrl", result.data.shortUrl)
            setShorturl(result.data.shortUrl)
            setLoading(false)
        }
        catch (err) {
            setError(err)
        }
    }

    useEffect(() => {
        if (inputValue.length) {
            fetchData(inputValue)
        }
    }, [inputValue])

    useEffect(() => {
        const timer = setTimeout(() => {
            setCopied(false)
        }, 1000)

        return () => clearTimeout(timer)
    }, [copied])

    if (loading) {
        return <p className='noData' >Loading...</p>
    }

    if (error) {
        return <p className='noData' >Something went wrong</p>
    }

    return (
        <>
            {shorturl && (
                <div className='result'>
                    <p>{shorturl}</p>

                    <CopyToClipboard
                        text={shorturl}
                        onCopy={() => setCopied(true)}
                    >
                        <button className={copied ? "copied" : ""}>
                            <i className="fa fa-clone"></i>Copy
                        </button>
                    </CopyToClipboard>
                </div>
            )}
        </>
    )
}

export default PostUrl