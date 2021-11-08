import React, { useState } from "react";
import { ProductImage } from "@/data/pages";
import { classNames } from "@/utils/class-names";

type Props = {
  images: ProductImage[];
};

const Image = ({
  image,
  isSelected,
  onPreviewClick,
}: {
  image: ProductImage;
  isSelected: boolean;
  onPreviewClick: () => void;
}) => {
  const baseClassName = "aspect-w-1 aspect-h-1 rounded-lg overflow-hidden ";
  const className = classNames(baseClassName, isSelected ? "ring-4 ring-indigo-500 ring-offset-2" : "cursor-pointer");

  return (
    <div className={className} onClick={onPreviewClick}>
      <img src={image.src} alt={image.alt} className="w-full h-full object-center object-cover" />
    </div>
  );
};

const OrdinaryImage = ({ image }: { image: ProductImage }) => {
  return <img src={image.src} alt={image.alt} className="w-full h-full object-center object-cover" />;
};

export const ImageGallery = ({ images }: Props) => {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  const handlePreviewClick = (id: number) => {
    setSelectedImage(() => images[id]);
  };

  return (
    <>
      <div className="hidden mt-6 max-w-2xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-3 lg:gap-x-8">
        {images[0] && (
          <div className="hidden aspect-w-3 aspect-h-4 rounded-lg overflow-hidden lg:block">
            <OrdinaryImage image={images[0]} />
          </div>
        )}
        <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
          {images[1] && (
            <div className="aspect-w-3 aspect-h-2 rounded-lg overflow-hidden">
              <OrdinaryImage image={images[1]} />
            </div>
          )}
          {images[2] && (
            <div className="aspect-w-3 aspect-h-2 rounded-lg overflow-hidden">
              <OrdinaryImage image={images[2]} />
            </div>
          )}
        </div>
        {images[3] && (
          <div className="aspect-w-4 aspect-h-5 sm:rounded-lg sm:overflow-hidden lg:aspect-w-3 lg:aspect-h-4">
            <OrdinaryImage image={images[3]} />
          </div>
        )}
      </div>
      <div className="lg:hidden">
        <div className="aspect-w-1 aspect-h-1 rounded-lg overflow-hidden">
          <img src={selectedImage.src} alt={selectedImage.alt} className="w-full h-full object-center object-cover" />
        </div>
        <div className="grid grid-cols-4 gap-x-8 gap-y-8 mt-8">
          {images[0] && (
            <Image
              image={images[0]}
              isSelected={selectedImage.src === images[0].src}
              onPreviewClick={() => handlePreviewClick(0)}
            />
          )}
          {images[1] && (
            <Image
              image={images[1]}
              isSelected={selectedImage.src === images[1].src}
              onPreviewClick={() => handlePreviewClick(1)}
            />
          )}
          {images[2] && (
            <Image
              image={images[2]}
              isSelected={selectedImage.src === images[2].src}
              onPreviewClick={() => handlePreviewClick(2)}
            />
          )}
          {images[3] && (
            <Image
              image={images[3]}
              isSelected={selectedImage.src === images[3].src}
              onPreviewClick={() => handlePreviewClick(3)}
            />
          )}
        </div>
      </div>
    </>
  );
};
