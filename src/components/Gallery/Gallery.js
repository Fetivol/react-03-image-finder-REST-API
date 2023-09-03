import { ImageList } from './Gallery.styled';
import { ModalWindow } from './ModalWindow';

export const Gallery = ({ images }) => {
  return (
    <ImageList>
      {images.map(image => {
        return (
          <li key={image.id}>
            <ModalWindow
              webformatURL={image.webformatURL}
              largeImageURL={image.largeImageURL}
              tag={image.tag}
            ></ModalWindow>
          </li>
        );
      })}
    </ImageList>
  );
};
