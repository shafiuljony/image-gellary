import React, { useState } from 'react'
import Header from './Header'
import ImageGallery from './ImageGallery'
import  {galleryImages} from '../constant/images.js'
import imgIcon from '../assets/img-icon.png'

const initialState = galleryImages;

export default function Gallery() {
    const [images, setImages] = useState(initialState)
    const [selectedCount, setSelectedCount] = useState();
    const [selectedImages, setSelectedImages] = useState([]);
    const [isDragging, setIsDragging] = useState(false);
    const [hoveredIndex, setHoveredIndex] = useState(null);


  const handleAction = (type, payload) => {
    const actions = {
      DELETE: () => setImages(images.filter((_, index) => index !== payload)),
      DRAG: () => {
        const { startIndex, targetIndex } = payload;
        const draggedImage = images[startIndex];
        const newImagesDrag = images.filter((_, index) => index !== startIndex);
        newImagesDrag.splice(targetIndex, 0, draggedImage);
        setImages(newImagesDrag);
      },
    };

    if (actions[type]) {
      actions[type]();
    }
  };

    //Handle drag start
  const handleDragStart = (e, index) => {
    e.dataTransfer.setData("text/plain", index);
    setIsDragging(true);
  };


  //Handle drag over
  const handleDragOver = (e, targetIndex) => {
    e.preventDefault();
    const startIndex = Number(e.dataTransfer.getData("text/plain"));
    handleAction("DRAG", { startIndex, targetIndex });
  };


  //Handle drag and drop
  const handleDrop = (e, targetIndex) => {
    e.preventDefault();
    const startIndex = Number(e.dataTransfer.getData("text/plain"));
    handleAction("DRAG", { startIndex, targetIndex });
    setIsDragging(false);
  };

    //Handle checkbox click
  const handleCheckboxClick = (index) => {
    const newSelectedImages = selectedImages.includes(index)
      ? selectedImages.filter((i) => i !== index)
      : [...selectedImages, index];
    setSelectedImages(newSelectedImages);
    setSelectedCount(newSelectedImages.length);
  };

  //Delete selected images
  const handleDeleteSelected = () => {
    const newImages = images.filter((_, index) => !selectedImages.includes(index));
    setImages(newImages);
    setSelectedImages([]);
    setSelectedCount(0);
  };
  return (
    <div className="gallery_wrap">
        <Header 
             selectedCount={selectedCount}
             handleDeleteSelected={handleDeleteSelected}
        />
        <hr />
        <div className="image-gallery">
            {images.map((image, index) => (
            <ImageGallery 
                key={index}
                index={index}
                image={image}
                isDragging={isDragging}
                hoveredIndex={hoveredIndex}
                selectedImages={selectedImages}
                handleDragStart={handleDragStart}
                handleDragOver={handleDragOver}
                handleDrop={handleDrop}
                handleCheckboxClick={handleCheckboxClick}
                setHoveredIndex={setHoveredIndex}
            />
            ))}
            <div className="add_more">
                <img src={imgIcon} alt="" />
                <span className="add">Add Images</span>
            </div>
        </div>  
    </div>
  )
}
