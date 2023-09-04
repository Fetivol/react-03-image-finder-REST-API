import { Component } from 'react';
import { SearchForm } from './SearchForm/SearchForm';
import { fetchImages } from './api';
import { Gallery } from './Gallery/Gallery';
import { GlobalStyle } from './GlobalStyle';
import { Layout } from './Layout';
import { LoadMoreButton } from './LoadMore/LoadMore';
import { Loader } from './Loader/Loader';

export class App extends Component {
  state = {
    query: '',
    images: [],
    page: 1,
    loading: false,
    loadMoreBtn: true,
  };

  handleSubmit = evt => {
    evt.preventDefault();
    this.setState({
      query: `${evt.target.elements.query.value.trim()}`,
      images: [],
      page: 1,
    });
    console.log('submit', this.state);
    evt.target.reset();
  };

  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  // async componentDidUpdate(prevProps, prevState) {
  //   const { query, page } = this.state;
  //   if (prevState.query !== query || prevState.page !== page) {
  //     try {
  //       this.setState({ loading: true, loadMoreBtn: false });
  //       const searchedImages = await fetchImages(query, page);
  //       // console.log(searchedImages);
  //       if (page === 1) {
  //         this.setState({ images: searchedImages.hits });
  //       } else {
  //         this.setState({
  //           images: [...prevState.images, ...searchedImages.hits],
  //         });
  //       }
  //       if (page === Math.ceil(searchedImages.totalHits / 12)) {
  //         console.log('We found all images=)');
  //         this.setState({ loadMoreBtn: true });
  //       }
  //     } catch (error) {
  //       console.error(error);
  //     } finally {
  //       this.setState({ loading: false });
  //     }
  //   }
  // }
  async componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;

    if (prevState.query !== query || prevState.page !== page) {
      this.setState({ loading: true, loadMoreBtn: false });

      try {
        const searchedImages = await fetchImages(query, page);
        this.updateImages(searchedImages.hits, page);
        this.checkIfAllImagesFound(searchedImages.totalHits, page);
      } catch (error) {
        console.error(error);
      } finally {
        this.setState({ loading: false });
      }
    }
  }

  updateImages(newImages, page) {
    this.setState(prevState => ({
      images: page === 1 ? newImages : [...prevState.images, ...newImages],
    }));
  }

  checkIfAllImagesFound(totalHits, page) {
    if (page === Math.ceil(totalHits / 12)) {
      console.log('We found all images=)');
      this.setState({ loadMoreBtn: true });
    }
  }

  render() {
    const { images, loading, loadMoreBtn } = this.state;
    return (
      <Layout>
        <SearchForm onSubmit={this.handleSubmit} />
        {images.length > 0 && <Gallery images={images}>Gallery</Gallery>}
        {loading && <Loader />}
        {images.length > 0 && !loadMoreBtn && (
          <LoadMoreButton onClick={this.handleLoadMore} />
        )}

        <GlobalStyle />
      </Layout>
    );
  }
}
