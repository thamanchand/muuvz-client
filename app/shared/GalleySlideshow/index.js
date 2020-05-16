import React from "react";
import PropTypes from 'prop-types';
import DeleteForeverIcon from 'mdi-react/DeleteForeverIcon';

const { uuid } = require('uuidv4');

class Slideshow extends React.Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    if(nextProps.input !== prevState.input) {
      return { currentImageId: nextProps && nextProps.input[0] && nextProps.input[0].id};
    }
    return null;
  }

  constructor(props) {
    super(props);
    this.containerWrapperRef = React.createRef()
    this.state = {
      slideIndex: 0,
      currentImageId: null
    };

    const { ratio } = this.props;
    const ratioWHArray = ratio.split(":");
    this.ratioWH = ratioWHArray[0] / ratioWHArray[1];
  }

  getNewSlideIndex = step => {
    const {slideIndex} = this.state;
    const numberSlide = this.props.input.length;

    let newSlideIndex = slideIndex + step;

    if (newSlideIndex >= numberSlide) newSlideIndex = 0;
    else if (newSlideIndex < 0) newSlideIndex = numberSlide - 1;

    return newSlideIndex;
  };

  backward = () => {

    this.setState({
      slideIndex: this.getNewSlideIndex(-1),
      currentImageId: this.props.input[this.getNewSlideIndex(-1)].id
    });
  };

  forward = () => {

    this.setState({
      slideIndex: this.getNewSlideIndex(1),
      currentImageId: this.props.input[this.getNewSlideIndex(1)].id
    });
  };

  setSlideIndex = index => {
    this.setState({
      slideIndex: index
    });
  };

  updateDimensions = () => {
    this.containerElm.style.height = `${this.containerElm.offsetWidth /
      this.ratioWH}px`;
  };

  runAutomatic = () => {
    this.setState({
      slideIndex: this.getNewSlideIndex(1)
    });
  };

  componentDidMount() {
    const { mode, timeout } = this.props;
    this.containerElm = this.containerWrapperRef.current;

    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions);

    if (mode === "automatic") {
      const clearTimeout = timeout || 5000;

      this.automaticInterval = setInterval(
        () => this.runAutomatic(),
        Number.parseInt(clearTimeout, 10)
      );
    }
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
    if (this.automaticInterval) clearInterval(this.automaticInterval);
  }

  render() {
    const { currentImageId } = this.state;
    const { input, source, coverDelete } = this.props;

    return (
      <div className="lp-slideshow">
        <div className="container " ref={this.containerWrapperRef}>
          {input.map((image, index) => (
            <div
              key={uuid()}
              className={`slide ${
                this.state.slideIndex === index ? "active" : ""
              }`}
            >
              {/* <div className="number-text">
                {`${index + 1} / ${input.length}`}
              </div> */}
              <img className="image" src={`${'http://localhost:1337'}${image.url}`} alt={image.caption} />
              {/* <div className="caption-text">{image.caption}</div> */}
              {/* <div className="overlay"></div> */}
              {source === 'resourceEdit' && (
                <span>
                  <DeleteForeverIcon
                    size="25" color="#646777"
                    onClick={() => coverDelete(currentImageId)}
                    className="resource_cover__delete"
                  />
                </span>
              )}
            </div>
          ))}

          {currentImageId ?
            ( <span role="presentation" className="prev" onClick={this.backward}>
              ❮
            </span>
            ) : (
              null
            )}
          {currentImageId ?
            (
              <span role="presentation" className="next" onClick={this.forward}>
              ❯
              </span>
            ) : (
              null
            )}
        </div>

        <div className="dot-container">
          {input.map((_, index) => (
            <span
              role="presentation"
              key={uuid()}
              className={`dot ${
                this.state.slideIndex === index ? "active" : ""
              }`}
              onClick={() => this.setSlideIndex(index)}
            />
          ))}
        </div>
      </div>
    );
  }
}
Slideshow.defaultProps = {
  timeout: 0,
}

Slideshow.propTypes = {
  input: PropTypes.shape({
    length: PropTypes.string,
  }),
  ratio: PropTypes.number,
  mode: PropTypes.string,
  timeout: PropTypes.number,
  source: PropTypes.string,
  coverDelete: PropTypes.func,
}

export default Slideshow;
