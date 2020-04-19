import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

const CropImage = ( props ) => {
  const [upImg, setUpImg] = useState();
  const [imgRef, setImgRef] = useState(null);
  const [crop, setCrop] = useState({ });
  const [previewUrl, setPreviewUrl] = useState();

  const onSelectFile = e => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () => setUpImg(reader.result));
      reader.readAsDataURL(e.target.files[0]);

      // convert files to an array
      const files = [...e.target.files];
      props.onChange({ file: files[0], name: files[0].name });

    }
  };

  const onLoad = useCallback(img => {
    setImgRef(img);
  }, []);

  const makeClientCrop = async cropImage => {
    if (imgRef && cropImage.width && cropImage.height) {
      createCropPreview(imgRef, cropImage, 'newFile.jpeg');
    }
  };

  const createCropPreview = async (image, cropImage, fileName) => {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = cropImage.width;
    canvas.height = cropImage.height;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
      image,
      cropImage.x * scaleX,
      cropImage.y * scaleY,
      cropImage.width * scaleX,
      cropImage.height * scaleY,
      0,
      0,
      cropImage.width,
      cropImage.height
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob(blob => {
        if (!blob) {
          reject(new Error('Canvas is empty'));
          return;
        }
        blob.name = fileName;
        window.URL.revokeObjectURL(previewUrl);
        setPreviewUrl(window.URL.createObjectURL(blob));
      }, 'image/jpeg');
    });
  };

  return (
    <div className="App">
      <div>
        <input
          type="file"
          name={props.name}
          accept="image/*"
          onChange={onSelectFile}
        />
      </div>
      <ReactCrop
        src={upImg}
        onImageLoaded={onLoad}
        crop={crop}
        onChange={c => setCrop(c)}
        onComplete={makeClientCrop}
        circularCrop
      />
      {previewUrl && <img alt="Crop preview" src={previewUrl} />}
    </div>
  );
}

CropImage.propTypes = {
  onChange: PropTypes.func,
  name: PropTypes.string,
}

const renderCropFileInput = (props) => {
  const { input, meta } = props;
  return (
    <div className="form__form-group-input-wrap">
      <CropImage {...input} />
      {meta.touched && meta.error && <span className="form__form-group-error">{meta.error}</span>}
    </div>
  );
};

renderCropFileInput.propTypes = {
  input: PropTypes.shape({
    onChange: PropTypes.func,
    name: PropTypes.string,
  }).isRequired,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string,
  }),
};

renderCropFileInput.defaultProps = {
  meta: null,
};

export default renderCropFileInput;
