import { Component } from 'react';
import Modal from 'react-modal';
import { Image } from './Gallery.styled';

Modal.setAppElement('#root');

export class ModalWindow extends Component {
  state = {
    modalIsOpen: false,
  };

  openModal = () => {
    this.setState({ modalIsOpen: true });
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };

  render() {
    const { webformatURL, largeImageURL, tag } = this.props;

    return (
      <div className="overlay">
        <Image
          src={webformatURL}
          alt={tag}
          loading="lazy"
          onClick={() => this.openModal()}
        />
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={() => this.closeModal()}
          contentLabel="Minimal Modal Example"
        >
          <img src={largeImageURL} alt={tag} />
          <button onClick={() => this.closeModal()}>Close Modal</button>
        </Modal>
      </div>
    );
  }
}
