import PropTypes from "prop-types";
import "./style.scss";

const ServiceCard = ({ imageSrc, imageAlt = "Image", children }) => (
  <div className="ServiceCard">
    <div className="ServiceCard__imageContainer">
      <img
        data-testid="card-image-testid"
        src={imageSrc}
        alt={imageAlt}
        className="ServiceCard__image"
      />
    </div>
    <div className="ServiceCard__textContainer">
      {children}
    </div>
  </div>
);

ServiceCard.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  imageAlt: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default ServiceCard;

