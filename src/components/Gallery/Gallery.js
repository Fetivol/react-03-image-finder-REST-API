export const Gallery = ({ images }) => {
  return (
    <ul>
      {images.map(image => {
        return (
          <li key={image.id}>
            <img
              src={image.webformatURL}
              alt={image.largeImageURL}
              loading="lazy"
            />
          </li>
        );
      })}
    </ul>
  );
};
