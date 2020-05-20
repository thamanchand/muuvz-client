import React from 'react';
import ContentLoader from "react-content-loader";

const VanListingLoader = () => (
  <ContentLoader
    className="skeleton-loader"
    primaryColor="#dedede"
    secondaryColor="#f2f2f2"
  >
    <rect
      x="0"
      y="0"
      rx="5"
      ry="5"
      width="200"
      height="200"
    />
    <rect
      x="220"
      y="17"
      rx="4"
      ry="4"
      width="300"
      height="13"
    />
    <rect
      x="220"
      y="40"
      rx="3"
      ry="3"
      width="250"
      height="10"
    />
    <rect
      x="220"
      y="60"
      rx="4"
      ry="4"
      width="200"
      height="10"
    />
  </ContentLoader>
);

export default VanListingLoader;
