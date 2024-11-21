import React from 'react';

function Post({ title, content, imageUrl, onEdit, onDelete }) {
  // Använd en extern URL om imageUrl är tom
  const displayImageUrl = imageUrl || "https://cdn.pixabay.com/photo/2024/08/03/10/09/business-8941855_960_720.jpg";

  console.log("Image URL:", displayImageUrl); // Logga den aktuella bild-URL:en
  return (
    <div className="post">
      {displayImageUrl && <img src={displayImageUrl} alt={title} className="post-image" />} {/* Visa bilden om displayImageUrl finns */}
      <h2>{title}</h2>
      <p>{content}</p>
      <button onClick={onEdit}>Ändra</button>
      <button onClick={onDelete}>Radera</button>
    </div>
  );
}

export default Post;
