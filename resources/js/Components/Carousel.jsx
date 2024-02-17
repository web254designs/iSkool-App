import React from 'react';
import { Carousel } from 'antd';

const imagePaths = [
  'https://cdn-dgidm.nitrocdn.com/VUgvutcfBFBoVwUNnoVGZUAEAIZScwva/assets/images/optimized/rev-8f85e05/k8school.com/wp-content/uploads/2023/08/Coding-for-Schools-10-Reasons-Why-Online-Schools-Teach-Coding-1024x682.jpg',
  'https://cdn-dgidm.nitrocdn.com/VUgvutcfBFBoVwUNnoVGZUAEAIZScwva/assets/images/optimized/rev-8f85e05/k8school.com/wp-content/uploads/2023/04/The-Complete-Guide-to-Plan-an-Activity-for-Nursery-Class.jpg.webp',
  'https://cdn-dgidm.nitrocdn.com/VUgvutcfBFBoVwUNnoVGZUAEAIZScwva/assets/images/optimized/rev-8f85e05/k8school.com/wp-content/uploads/2023/11/Why-Are-Exams-Important-How-Do-They-Improve-Learning-1024x733.jpg',
  // Add more image paths for other slides
];

const CarouselComponent = () => {
  return (
    <div style={{ marginTop: 16 }}>
      {/* Image Carousel */}
      <Carousel autoplay autoplaySpeed={5000} effect="fadein" dotPosition="right" easing="linear">
        {imagePaths.map((imagePath, index) => (
          <div key={index} className="carousel-item">
            <div className="carousel-content">
              <img src={imagePath} alt={`Slide ${index + 1}`} className="center-image w-2/4" />
              <div className="carousel-caption">
                {/* Add your caption content here */}
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default CarouselComponent;
