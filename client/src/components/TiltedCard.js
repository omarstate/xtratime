import React, { useRef, useState } from "react";
import "./TiltedCard.css";

export default function TiltedCard({
  imageSrc,
  altText = "Tilted card image",
  captionText = "",
  containerHeight = "300px",
  containerWidth = "100%",
  imageHeight = "300px",
  imageWidth = "300px",
  scaleOnHover = 1.1,
  rotateAmplitude = 14,
  showMobileWarning = true,
  showTooltip = true,
  overlayContent = null,
  displayOverlayContent = false,
}) {
  const ref = useRef(null);
  const [transform, setTransform] = useState({
    rotateX: 0,
    rotateY: 0,
    scale: 1,
  });
  const [tooltipStyle, setTooltipStyle] = useState({
    x: 0,
    y: 0,
    opacity: 0,
    rotate: 0,
  });
  const [lastY, setLastY] = useState(0);

  function handleMouse(e) {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;

    const rotationX = (offsetY / (rect.height / 2)) * -rotateAmplitude;
    const rotationY = (offsetX / (rect.width / 2)) * rotateAmplitude;

    setTransform({
      rotateX: rotationX,
      rotateY: rotationY,
      scale: scaleOnHover,
    });

    const velocityY = offsetY - lastY;
    setTooltipStyle({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      opacity: 1,
      rotate: -velocityY * 0.6,
    });
    setLastY(offsetY);
  }

  function handleMouseEnter() {
    setTransform(prev => ({ ...prev, scale: scaleOnHover }));
  }

  function handleMouseLeave() {
    setTransform({
      rotateX: 0,
      rotateY: 0,
      scale: 1,
    });
    setTooltipStyle({
      x: 0,
      y: 0,
      opacity: 0,
      rotate: 0,
    });
  }

  return (
    <figure
      ref={ref}
      className="tilted-card-figure"
      style={{
        height: containerHeight,
        width: containerWidth,
      }}
      onMouseMove={handleMouse}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {showMobileWarning && (
        <div className="tilted-card-mobile-alert">
          This effect is not optimized for mobile. Check on desktop.
        </div>
      )}

      <div
        className="tilted-card-inner"
        style={{
          width: imageWidth,
          height: imageHeight,
          transform: `perspective(1000px) rotateX(${transform.rotateX}deg) rotateY(${transform.rotateY}deg) scale(${transform.scale})`,
          transition: 'transform 0.1s ease-out',
        }}
      >
        <img
          src={imageSrc}
          alt={altText}
          className="tilted-card-img"
          style={{
            width: imageWidth,
            height: imageHeight,
          }}
        />

        {displayOverlayContent && overlayContent && (
          <div className="tilted-card-overlay">
            {overlayContent}
          </div>
        )}
      </div>

      {showTooltip && (
        <figcaption
          className="tilted-card-caption"
          style={{
            transform: `translate(${tooltipStyle.x}px, ${tooltipStyle.y}px) rotate(${tooltipStyle.rotate}deg)`,
            opacity: tooltipStyle.opacity,
            transition: 'opacity 0.2s ease, transform 0.1s ease-out',
          }}
        >
          {captionText}
        </figcaption>
      )}
    </figure>
  );
}