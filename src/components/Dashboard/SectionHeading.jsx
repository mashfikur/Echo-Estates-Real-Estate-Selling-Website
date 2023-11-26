import PropTypes from "prop-types";

const SectionHeading = ({ title }) => {
  return (
    <div className="my-10">
      <h3 className="text-4xl font-semibold font-playfair text-center underline">
        {" "}
        {title}{" "}
      </h3>
    </div>
  );
};

SectionHeading.propTypes = {
  title: PropTypes.string,
};

export default SectionHeading;
