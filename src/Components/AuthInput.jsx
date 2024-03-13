import { useState } from "react";
import PropTypes from "prop-types";

/**
 * HomePageInput component for rendering an input field on the auth page.
 * @param {string} placeholder - The placeholder text for the input field.
 * @returns {JSX.Element} HomePageInput component.
 */
function HomePageInput({placeholder}) {
  const [value, setValue] = useState("");
  return (
    <input
      value={value}
      onChange={(event) => setValue(event.target.value)}
      placeholder={placeholder}
      className="bg-slate-300 dark:bg-slate-900 rounded-xl text-white p-4 mt-3 mb-3 md:p-2 md:mt-1 md:mb-1 lg:p-3 lg:mt-2 lg:mb-2"
    />
  );
}

HomePageInput.propTypes = {
  placeholder: PropTypes.string.isRequired,
};

export default HomePageInput;
