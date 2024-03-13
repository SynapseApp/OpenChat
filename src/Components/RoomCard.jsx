import PropTypes from "prop-types";

/**
 * RoomCard component to display user information in a list of rooms.
 * @param {object} user - The user object containing user information.
 * @param {boolean} ownCard - Indicates if it's the user's card.
 * @param {function} handleRoomSelect - Function to handle room selection.
 * @param {string} theme - The theme of the app.
 * @returns {JSX.Element} RoomCard component.
 */
function RoomCard({ user, ownCard, handleRoomSelect, theme }) {
  return (
    <div
      className={
        "w-auto h-10 m-5 rounded-2xl flex flex-row justify-between text-center py-2 px-3 font-ubuntu font-medium " +
        (ownCard
          ? "bg-amber-500 text-black cursor-pointer hover:bg-amber-400"
          : "text-white cursor-pointer hover:bg-slate-700 " +
            (theme === "dark" ? "bg-slate-800" : "bg-slate-900"))
      }
      onClick={handleRoomSelect}
    >
      <p>{user.name}</p>
      <p>Joined: {user.joinTime} am</p>
    </div>
  );
}

RoomCard.propTypes = {
  user: PropTypes.object.isRequired,
  ownCard: PropTypes.bool.isRequired,
  handleRoomSelect: PropTypes.func.isRequired,
  theme: PropTypes.string.isRequired,
};

export default RoomCard;
