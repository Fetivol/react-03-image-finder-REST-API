import { Component } from 'react';
import { SearchForm } from './SearchForm/SearchForm';
import { fetchImages } from './api';
import { Gallery } from './Gallery/Gallery';

export class App extends Component {
  state = {
    query: '',
    images: [],
    page: 1,
  };

  handleSubmit = evt => {
    evt.preventDefault();
    this.setState({
      query: `${evt.target.elements.query.value.trim()}`,
      images: [],
      page: 1,
    });
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
        const searchedImages = await fetchImages(
          this.state.query,
          this.state.page
        );
        console.log(searchedImages);
        // if (this.state.page === 1) {
        //   this.setState({ images: searchedImages.hits });
        // }
        this.setState({
          images: [...prevState.images, ...searchedImages.hits],
        });
        if (this.state.page === searchedImages.totalHits / 12) {
          console.log('We found all images=)');
        }
      } catch (error) {
        console.error(error);
      } finally {
      }
    }
  }

  render() {
    // console.log(this.state);
    return (
      <div>
        <SearchForm onSubmit={this.handleSubmit} />
        {this.state.images.length > 0 && <div>Gallery</div>}
        <Gallery images={this.state.images}></Gallery>
        <button onClick={this.handleLoadMore}>Load more</button>
      </div>
    );
  }
}
