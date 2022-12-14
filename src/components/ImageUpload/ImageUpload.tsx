import Img from "next/image";
import React from "react";
import { isBase64UrlImage } from "src/utils/helpers/isBase64UrlImage";

type Props = {
  setImage: (value: string) => void;
  image?: string;
};

const ImageUpload = ({ setImage, image }: Props) => {
  const sendFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      // get image from upload input
      const file = e.target.files[0];
      // convert image to base64
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = async () => {
        const base64 = reader.result;
        if (base64) {
          const isImage = await isBase64UrlImage(base64.toString());
          if (isImage) {
            setImage(base64.toString());
          } else {
            setImage("");

            alert("Please upload an image file");
          }
        }
      };
    }
  };

  return (
    <div className="flex flex-col p-2">
      <div className={`relative ${image && "aspect-square"} h-full w-full`}>
        {image && (
          <Img src={image} alt="uploaded image" className="object-cover" fill />
        )}
      </div>
      <input
        type="file"
        data-testid="image-upload-input"
        accept="image/*"
        onChange={sendFile}
      />
    </div>
  );
};

export default ImageUpload;
