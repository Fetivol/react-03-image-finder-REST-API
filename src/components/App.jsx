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
    // loadMoreBtn: true,
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

  async componentDidUpdate(prevProps, prevState) {
    if (
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page
    ) {
      try {
        this.setState({ loading: true, loadMoreBtn: false });
        const searchedImages = await fetchImages(
          this.state.query,
          this.state.page
        );
        // console.log(searchedImages);
        // if (this.state.page === 1) {
        //   this.setState({ images: searchedImages.hits });
        // } else {
        //   this.setState({
        //     images: [...prevState.images, ...searchedImages.hits],
        //   });
        // }
        // if (this.state.page === Math.ceil(searchedImages.totalHits / 12)) {
        //   console.log('We found all images=)');
        //   this.setState({ loadMoreBtn: false });
        // }
        if (
          this.state.page === 1 ||
          this.state.page < Math.ceil(searchedImages.totalHits / 12)
        ) {
          this.setState({
            images: [...prevState.images, ...searchedImages.hits],
          });
        } else {
          console.log('We found all images=)');
          this.setState({ loadMoreBtn: false });
        }

        this.setState({ loading: false });
      } catch (error) {
        console.error(error);
      } finally {
      }
    }
  }

  render() {
    console.log('render', this.state);
    return (
      <Layout>
        <SearchForm onSubmit={this.handleSubmit} />
        {this.state.images.length > 0 && (
          <Gallery images={this.state.images}>Gallery</Gallery>
        )}
        {this.state.loading && <Loader />}
        {this.state.images.length > 0 && this.state.loadMoreBtn && (
          <LoadMoreButton onClick={this.handleLoadMore} />
        )}

        <GlobalStyle />
      </Layout>
    );
  }
}
