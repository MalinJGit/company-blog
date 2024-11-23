import React from 'react';

function Post({ title, content, imageUrl, onEdit }) {
  const displayImageUrl = imageUrl || "https://cdn.pixabay.com/photo/2024/08/03/10/09/business-8941855_960_720.jpg";

  console.log("Image URL:", displayImageUrl); // Logga den aktuella bild-URL:en
  return (
    <div className="post">
      <h2>{title}</h2>
      <p>{content}</p>
      {displayImageUrl && <img src={displayImageUrl} alt={title} className="post-image" />}
      <button onClick={onEdit} className="edit-button">Redigera inlägg</button>
    </div>
  );
}

export default Post;
