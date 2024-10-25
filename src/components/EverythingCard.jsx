import React from "react";
import { FaTrash } from 'react-icons/fa'; // Import a trash icon

function Card(props) {

  const defImg = "https://th.bing.com/th/id/OIP.MpoLvqH7JE_SP8eUa9wXeAHaHa?w=1200&h=1200&rs=1&pid=ImgDetMain";

    // Function to handle delete icon click
    const handleDeleteClick = () => {
      props.onDelete(props.postId); // Call onDelete prop passed from parent
    };

  return (
    <div className="everything-card mt-10">
      <div className="everything-card flex flex-wrap p-5 gap-1 mb-1">
        <b className="title">{props.title}</b>
        <div className="everything-card-img mx-auto">
          <img className="everything-card-img" src={props.imgUrl || defImg} alt="img" />
        </div>
        <div className="description">
          <p className="description-text leading-7">
            {props.description?.substring(0, 200)}
          </p>
        </div>
        <div className="info">
          <div className="source-info flex items-center gap-2">
            <span className="font-semibold">Source:</span>
            <a
              href={props.url}
              target="_blank"
              className="link underline break-words"
            >
              {props.source.substring(0, 70)}
            </a>
          </div>
          <div className="origin flex flex-col">
            <p className="origin-item">
              <span className="font-semibold">Author:</span>
              {props.author}
            </p>
            <p className="origin-item">
              <span className="font-semibold">Published At:</span>
              ({props.publishedAt})
            </p>
            {/* //delete icon */}
              {/* Conditionally render delete icon */}
      {props.showDelete && (
        <div className="text-right pr-5">
          <button
            className="text-red-500 hover:text-red-700"
            onClick={handleDeleteClick}
            title="Delete this post"
          >
            <FaTrash size={20} />
          </button>
        </div>
      )}
          </div>
        </div>
      </div>

      {/* Added the new card content with styles */}
      <div className="flex lg:flex-row">
        <div
          className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
          style={{ backgroundImage: `url(${props.imageUrlLeft})` }}
          title={props.imageLeftTitle}
        ></div>
        <div className="border rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
          <div className="mb-8">
            <p className="text-sm text-gray-600 flex items-center">
              {props.memberIcon && (
                <svg
                  className="fill-current text-gray-500 w-3 h-3 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  {props.memberIcon}
                </svg>
              )}
              {props.memberText}
            </p>
            <div className="text-gray-900 font-bold text-xl mb-2">
              {props.cardTitle}
            </div>
            <p className="text-gray-700 text-base">{props.cardDescription}</p>
          </div>
          <div className="flex items-center">
            {props.authorImage && (
              <img
                className="w-10 h-10 rounded-full mr-4"
                src={props.authorImage}
                alt="Avatar"
              />
            )}
            <div className="text-sm">
              <p className="text-gray-900 leading-none">{props.authorName}</p>
              <p className="text-gray-600">{props.publishedDate}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
