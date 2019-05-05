import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Lightbox from 'react-images';

export default class VanGallery extends PureComponent {
  static propTypes = {
    images: PropTypes.arrayOf(PropTypes.shape({
      src: PropTypes.string,
    })).isRequired,
  };

  constructor() {
    super();
    this.state = {
      lightboxIsOpen: false,
      currentImage: 0,
      currentImagePreview: 0,
    };
  }

  changeImg = (i, e) => {
    e.preventDefault();
    this.setState({
      currentImagePreview: i,
      currentImage: i,
    });
  };

  openLightbox = (index, event) => {
    event.preventDefault();
    this.setState({
      currentImage: index,
      lightboxIsOpen: true,
    });
  };

  closeLightbox = () => {
    this.setState(prevState => ({ currentImage: prevState.currentImagePreview, lightboxIsOpen: false }));
  };

  gotoPrevious = () => {
    this.setState(prevState => ({ currentImage: prevState.currentImage - 1 }));
  };

  gotoNext = () => {
    this.setState(prevState => ({ currentImage: prevState.currentImage + 1 }));
  };

  gotoImage = (index) => {
    this.setState({
      currentImage: index,
    });
  };

  handleClickImage = () => {
    const { images } = this.props;
    const { currentImage } = this.state;
    if (currentImage === images.length - 1) return;
    this.gotoNext();
  };

  render() {
    const { images } = this.props;
    const { currentImage, currentImagePreview, lightboxIsOpen } = this.state;
    return (
      <div className="van-gallery">
        <a
          className="van-gallery__current-img"
          onClick={e => this.openLightbox(currentImage, e)}
          href={images[currentImage].src}
        >
          <img src={images[currentImagePreview].src} alt="product-img" />
        </a>
        <div className="van_gallery__gallery">
          {images.map((img) => (
            <button type="button" key={img.id} onClick={e => this.changeImg(img.id, e)} className="van-gallery__img-preview">
              <img src={img.src} alt="product-img" />
            </button>
          ))}
        </div>
        <Lightbox
          currentImage={currentImage}
          images={images}
          isOpen={lightboxIsOpen}
          onClickImage={this.handleClickImage}
          onClickNext={this.gotoNext}
          onClickPrev={this.gotoPrevious}
          onClickThumbnail={this.gotoImage}
          onClose={this.closeLightbox}
        />
      </div>
    );
  }
}
