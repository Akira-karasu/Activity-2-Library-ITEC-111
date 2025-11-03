import React from "react";
import "./BookCard.css";
import placeholderImage from "../../assets/book-placeholder.svg";

interface BookCardProps {
  title: string;
  author?: string;
  image?: string;
  onClick?: () => void;
}

export default function BookCard({ title, author, image, onClick }: BookCardProps) {
  return (
    <div className="book-card" onClick={onClick}>
      <div className="book-card-image">
        <img
          src={image || placeholderImage}
          alt={title}
          onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
            e.currentTarget.src = placeholderImage;
          }}
        />
      </div>
      <div className="book-card-content">
        <h3 className="book-title">{title}</h3>
        {author && <p className="book-author">{author}</p>}
      </div>
    </div>
  );
}
