import React, { useState, useEffect } from 'react';
import EverythingCard from './EverythingCard';
import Loader from './Loader';
import axios from 'axios';

function Usernews() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageUrls, setImageUrls] = useState({}); // Store image URLs by ID

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Fetch post data
        const response = await fetch(`https://news-boy-backend.vercel.app/api/news/userNews`);
        if (!response.ok) throw new Error('Network response was not ok');
        
        const myJson = await response.json();
        if (myJson?.data) {
          setData(myJson.data);
          
          // After setting data, fetch images for each post
          await fetchImages(myJson.data.map(post => post.imgUrl)); // Assuming `imgUrl` contains the image ID
        } else {
          setError(myJson.message || 'An error occurred');
        }
      } catch (error) {
        console.error('Fetch error:', error);
        setError('Failed to fetch news. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    const fetchImages = async (imageIds) => {
      try {
        // Fetch each image by ID
        const imageFetches = imageIds.map(id => 
          axios.get(`https://news-boy-backend.vercel.app/api/serve/image/${id}`).then(response => ({
            id,
            url: `data:${response.data.contentType};base64,${response.data.imageBase64}`
          }))
        );
        
        // Await all image fetch requests
        const fetchedImages = await Promise.all(imageFetches);
        
        // Map image URLs by ID
        const urls = fetchedImages.reduce((acc, { id, url }) => {
          acc[id] = url;
          return acc;
        }, {});

        setImageUrls(urls); // Update state with URLs
      } catch (error) {
        console.error('Error loading images:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <>
      {error && <div className="text-red-500 mb-4">{error}</div>}

      <div className="my-10 cards grid lg:place-content-center md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 xs:grid-cols-1 xs:gap-4 md:gap-10 lg:gap-14 md:px-16 xs:p-3">
        {!isLoading ? (
          data.length > 0 ? (
            data.map((element) => (
              <EverythingCard
                key={element._id} // Using unique _id as key
                title={element.title}
                description={element.description}
                imgUrl={imageUrls[element.imgUrl] || ''} // Use image URL if available
                author={element.author || "Unknown"}
                publishedAt={element.date || "Unknown Date"}
                source={element.source || "Users"}
                url={element.url || ""}
              />
            ))
          ) : (
            <div>No news available</div>
          )
        ) : (
          <Loader />
        )}
      </div>
    </>
  );
}

export default Usernews;
