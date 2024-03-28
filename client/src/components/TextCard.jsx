import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
// import { Transition } from "@headlessui/react"; // Make sure to install @headlessui/react package

/**
 * TextCard component to display text messages with options for copying, editing, and deleting.
 * @param {boolean} receivingText - Indicates whether the message is received or sent.
 * @param {string} text - The text content of the message.
 * @param {string} theme - The current theme.
 * @param {string} time - The time when the message was sent.
 * @returns {JSX.Element} TextCard component.
 */
function TextCard({ receivingText, text, theme, time }) {
  const [contextMenuVisible, setContextMenuVisible] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState({
    x: 0,
    y: 0,
  });

  const contextMenuRef = useRef(null);

  // Handle right-click event to show context menu
  const handleContextMenu = (e) => {
    e.preventDefault();
    setContextMenuVisible(true);
    let x = e.clientX;
    let y = e.clientY;
    const minVerticalGap = 121;
    const minHorizontalGap = 121;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    if (viewportHeight - y < minVerticalGap) {
      y = viewportHeight - minVerticalGap;
    }
    if (viewportWidth - x < minHorizontalGap) {
      x = viewportWidth - minHorizontalGap;
    }
    setContextMenuPosition({ x: x, y: y });
  };

  // Function for hiding context menu
  const hideContextMenu = () => {
    setContextMenuVisible(false);
    setContextMenuPosition({ x: 0, y: 0 });
  };

  // Close context menu when clicking outside of it
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        contextMenuRef.current &&
        !contextMenuRef.current.contains(event.target)
      ) {
        hideContextMenu();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [contextMenuRef]);

  // Convert ISO string to local time string without seconds
  const localtime = new Date(time).toLocaleTimeString("en-US", {
    hour12: true,
    hour: "numeric",
    minute: "2-digit",
  });

  // Function to handle copying text to clipboard
  function handleCopy() {
    navigator.clipboard.writeText(text);
    setContextMenuPosition({
      x: 0,
      y: 0,
    });
    setContextMenuVisible(false);
  }

  return (
    <>
      <div
        className={
          "max-w-[66%] rounded-3xl rounded-tl-lg rounded-br-lg mx-5 my-2 drop-shadow-lg font-ubuntu " +
          (receivingText
            ? theme === "dark"
              ? "bg-slate-900 text-white hover:bg-slate-800"
              : "bg-slate-300 text-black hover:bg-slate-200"
            : " bg-amber-500 self-end text-black hover:bg-amber-400")
        }
        onContextMenu={handleContextMenu}
      >
        <p className="pt-4 px-3 text-left">{text}</p>
        <p className="py-1 px-3 text-right text-sm">{localtime}</p>
      </div>
      {/* <Transition
        show={contextMenuVisible}
        enter="transition-opacity duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      > */}
      {contextMenuVisible && (
        <div
          ref={contextMenuRef}
          className={`z-10 border-gray-300 shadow-lg absolute rounded-tr-2xl rounded-bl-2xl w-28 transition-opacity duration-300 ease-in-out opacity-100 ${
            theme === "dark" ? "bg-slate-800 text-white" : "bg-slate-100"
          }`}
          style={{
            top: contextMenuPosition.y,
            left: contextMenuPosition.x,
          }}
        >
          <div
            className={
              "px-4 py-2 cursor-pointer rounded-tr-2xl  " +
              (receivingText ? "rounded-bl-2xl " : " ") +
              (theme === "dark" ? "hover:bg-slate-700" : "hover:bg-slate-200")
            }
            onClick={handleCopy}
          >
            Copy
          </div>
          {!receivingText && (
            <>
              <div
                className={
                  "px-4 py-2 cursor-pointer " +
                  (theme === "dark"
                    ? "hover:bg-slate-700"
                    : "hover:bg-slate-200")
                }
                onClick={() => console.log("edit")}
              >
                Edit
              </div>
              <div
                className={
                  "px-4 py-2 cursor-pointer rounded-bl-2xl " +
                  (theme === "dark"
                    ? "hover:bg-slate-700"
                    : "hover:bg-slate-200")
                }
                onClick={() => console.log("delete")}
              >
                Delete
              </div>
            </>
          )}
        </div>
      )}
      {/* </Transition> */}
    </>
  );
}

TextCard.propTypes = {
  receivingText: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  theme: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
};

export default TextCard;
