import React, { useState, useEffect } from 'react';
import EverythingCard from './EverythingCard';
import Loader from './Loader';
import axios from 'axios';

function Usernews() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageUrls, setImageUrls] = useState({}); // Store image URLs by post ID

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`https://news-boy-backend.vercel.app/api/news/userNews`);
        if (!response.ok) throw new Error('Network response was not ok');

        const myJson = await response.json();
        if (myJson?.data) {
          setData(myJson.data);

          // Fetch images for posts
          const imagesData = await Promise.all(
            myJson.data.map(async (post) => {
              if (post.imgUrl) {
                try {
                  const imgResponse = await axios.get(`https://news-boy-backend.vercel.app/api/serve/image/${post.imgUrl}`);
                  const { imageBase64, contentType } = imgResponse.data;
                  return { id: post._id, imageUrl: `data:${contentType};base64,${imageBase64}` };
                } catch (error) {
                  console.error('Error loading image:', error);
                  return { id: post._id, imageUrl: null }; // Use null if image fails to load
                }
              }
              return { id: post._id, imageUrl: null }; // Handle posts without imgUrl
            })
          );

          // Map images by post ID
          const imagesMap = imagesData.reduce((acc, img) => {
            acc[img.id] = img.imageUrl;
            return acc;
          }, {});

          setImageUrls(imagesMap);
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
                key={element._id}
                title={element.title}
                description={element.description}
                imgUrl={imageUrls[element._id] || 'https://th.bing.com/th/id/OIP.MpoLvqH7JE_SP8eUa9wXeAHaHa?w=1200&h=1200&rs=1&pid=ImgDetMain'} // Use fetched image or fallback
                author={element.author || 'Unknown'}
                publishedAt={element.date || 'Unknown Date'}
                source={element.source || 'Users'}
                url={element.url || ''}
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
