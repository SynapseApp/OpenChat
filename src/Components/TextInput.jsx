import PropTypes from "prop-types";

/**
 * TextInput component for inputting text.
 * @param {string} theme - The current theme.
 * @param {string} text - The current text value in the input.
 * @param {function} setText - Function to set the text value.
 * @returns {JSX.Element} TextInput component.
 */
function TextInput({ theme, text, setText }) {
  return (
    <input
      className={
        "rounded-xl w-full p-2 px-4 me-3 drop-shadow-lg text-white " +
        (theme === "light"
          ? "bg-slate-300 placeholder-black"
          : "bg-slate-900 placeholder-white")
      }
      value={text}
      onChange={(e) => setText(e.target.value)}
      type="text"
      placeholder="Enter your text..."
    />
  );
}

// Prop types validation
TextInput.propTypes = {
  theme: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  setText: PropTypes.func.isRequired,
  // onMessageSend: PropTypes.func.isRequired,
};

export default TextInput;
