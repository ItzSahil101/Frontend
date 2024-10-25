import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EverythingCard from './EverythingCard';
import Loader from './Loader';
import { useNavigate } from "react-router-dom";

function Yourpost() {
  const history = useNavigate();

  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [images, setImages] = useState({}); // State to store images by post ID

  const token = localStorage.getItem('auth');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.post(
          `https://news-boy-backend.vercel.app/api/handle/yourposts`,
          { token }
        );
        
        const posts = response.data.posts;
        setData(posts); // Set the entire array of posts

        // Fetch images for each post
        const imagesData = await Promise.all(
          posts.map(async (post) => {
            if (post.imgUrl) {
              try {
                const imgResponse = await axios.get(`https://news-boy-backend.vercel.app/api/serve/image/${post.imgUrl}`);
                const { imageBase64, contentType } = imgResponse.data;
                return { id: post._id, imageUrl: `data:${contentType};base64,${imageBase64}` };
              } catch (error) {
                console.error("Error loading image:", error);
                return { id: post._id, imageUrl: null }; // Use null if image fails to load
              }
            }
            return { id: post._id, imageUrl: null }; // Handle posts without imgUrl
          })
        );

        // Map images to the corresponding post ID for easier access
        const imagesMap = imagesData.reduce((acc, img) => {
          acc[img.id] = img.imageUrl;
          return acc;
        }, {});

        setImages(imagesMap);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch your news');
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [token]);

  const handleDelete = async (postId) => {
    try {
      await axios.post(`https://news-boy-backend.vercel.app/api/handle/postDel`, { postId });
      window.location.reload();
    } catch (err) {
      console.error('Failed to delete the post', err);
      setError('Failed to delete the post');
    }
  };

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
                imgUrl={images[element._id] || 'https://th.bing.com/th/id/OIP.MpoLvqH7JE_SP8eUa9wXeAHaHa?w=1200&h=1200&rs=1&pid=ImgDetMain'} // Use fetched image or fallback
                author={element.author || 'Unknown'}
                publishedAt={element.date || 'Unknown Date'}
                source={element.source || 'Users'}
                url={element.url || ''}
                onDelete={handleDelete}
                showDelete={true}
                postId={element._id}
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

export default Yourpost;
