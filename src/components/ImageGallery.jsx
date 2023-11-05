import React from 'react'


export default function ImageGallery({
    index,
    image,
    isDragging,
    hoveredIndex,
    selectedImages,
    handleDragStart,
    handleDragOver,
    handleDrop,
    handleCheckboxClick,
    setHoveredIndex,
}) {
  return (
    <div
    className={`image-container ${index === 0 ? "featured-image" : ""}`}
    draggable
    onDragStart={(e) => handleDragStart(e, index)}
    onDragOver={(e) => handleDragOver(e)}
    onDrop={(e) => handleDrop(e, index)}
    onMouseEnter={() => setHoveredIndex(index)}
    onMouseLeave={() => setHoveredIndex(null)}
  >
    <img src={image.src} alt={`image-${index}`} />
    {!isDragging && (hoveredIndex === index || selectedImages.includes(index)) && (
      <div
        className={`overlay ${selectedImages.includes(index) ? "selected-overlay" : ""}`}
      >
        <input
          type="checkbox"
          style={{ height: "18px", width: "18px" }}
          checked={selectedImages.includes(index)}
          onChange={() => handleCheckboxClick(index)}
        />
      </div>
    )}
  </div>
  )
}
