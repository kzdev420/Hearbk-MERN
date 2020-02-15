import React from "react";

const Iframe = ({
    width,
    height,
    className,
    src,
    title,
    frameBorder,
    allow,
    allowFullScreen,
}) => (
  <iframe
    width={width}
    height={height}
    className={className}
    src={src}
    title={title}
    frameBorder={frameBorder}
    allow={allow}
    allowFullScreen={allowFullScreen}
  />
);

export default Iframe;
