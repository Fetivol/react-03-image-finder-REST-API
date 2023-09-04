import { Audio, Rings } from 'react-loader-spinner';
import { LoadWrapper } from './Loader.styled';
export const Loader = () => {
  return (
    <LoadWrapper>
      {/* <Audio
        height="80"
        width="80"
        radius="9"
        color="blue"
        ariaLabel="loading"
        wrapperStyle
        wrapperClass
      /> */}
      <Rings
        height="80"
        width="80"
        color="#3f51b5"
        radius="6"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="rings-loading"
      />
    </LoadWrapper>
  );
};
