import { ButtonWrapper, LoadMore } from './LoadMore.styled';

export const LoadMoreButton = ({ onClick }) => {
  return (
    <ButtonWrapper>
      <LoadMore onClick={onClick}>Load more</LoadMore>
    </ButtonWrapper>
  );
};
