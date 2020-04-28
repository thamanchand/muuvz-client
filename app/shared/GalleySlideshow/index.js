import React from "react";
import PropTypes from 'prop-types';

const { uuid } = require('uuidv4');

class Slideshow extends React.Component {
  constructor(props) {
    super(props);
    this.containerWrapperRef = React.createRef()
    this.state = {
      slideIndex: 0
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
      slideIndex: this.getNewSlideIndex(-1)
    });
  };

  forward = () => {
    this.setState({
      slideIndex: this.getNewSlideIndex(1)
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
    const { input } = this.props;
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
              <div className="number-text">
                {`${index + 1} / ${input.length}`}
              </div>
              <img className="image" src={`${'http://localhost:1337'}${image.url}`} alt={image.caption} />
              {/* <div className="caption-text">{image.caption}</div> */}
            </div>
          ))}

          <span role="presentation" className="prev" onClick={this.backward}>
            ❮
          </span>
          <span role="presentation" className="next" onClick={this.forward}>
            ❯
          </span>
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
}

export default Slideshow;
