import { useEffect, useState } from "react"; // Import React and necessary hooks
import { Transition } from "@headlessui/react"; // Import Transition Component from Headlessui Library
import SendIcon from "@mui/icons-material/Send"; // Import SendIcon component from MUI
import TextCard from "../Components/TextCard"; // Import TextCard component
import RoomCard from "../Components/RoomCard"; // Import RoomCard component
import TextInput from "../Components/TextInput"; // Import TextInput component
import DarkModeIcon from "@mui/icons-material/DarkMode"; // Import DarkModeIcon component from MUI
import LightModeIcon from "@mui/icons-material/LightMode"; // Import LightModeIcon component from MUI
import GitHubIcon from "@mui/icons-material/GitHub"; // Import GitHubIcon component from MUI
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined"; // Import InfoOutlinedIcon component from MUI
import ArrowBackIcon from "@mui/icons-material/ArrowBack"; // Import ArrowBackIcon component from MUI
import MenuIcon from "@mui/icons-material/Menu"; // Import MenuIcon component from MUI
import { amber } from "@mui/material/colors"; // Import amber color from MUI
import onlineUsers from "../Dummy/onlineUsers.json"; // Import onlineUsers data from JSON file
import rooms from "../Dummy/rooms.json"; // Import rooms data from JSON file


function HomePage() {
  // State variables
  const [theme, setTheme] = useState(getInitialTheme()); // Theme state variable
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // Mobile menu state variable
  const [selectedUser, setSelectedUser] = useState(); // Selected user state variable
  const [selectedRoom, setSelectedRoom] = useState(null); // Selected room state variable
  const [text, setText] = useState(""); // Text state variable
  const [users, setUsers] = useState(null); // Users state variable

  //replicate client profile
  const curUser = {
    id: 1,
    name: "Anirudhwa Ankon",
    joinTime: "6:12",
  };

  // Function to get the initial theme based on user's system preference
  function getInitialTheme() {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      return savedTheme;
    }
    const userPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    return userPrefersDark ? "dark" : "light";
  }

  // Function to toggle between light and dark themes
  function toggleTheme() {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  }

  // Effect to set users when component mounts
  useEffect(() => {
    setUsers(onlineUsers);
  }, [users]);

  // Function to search for chat/room
  function checkConnection(rooms, yourID, clickedUserID) {
    let room = null;
    room = rooms.rooms.find(
      (room) =>
        room.connections.includes(yourID) &&
        room.connections.includes(clickedUserID) &&
        yourID !== clickedUserID
    );
    return room;
  }

  // Function to handle room selection
  function handleRoomSelect(user) {
    const room = checkConnection(rooms, curUser.id, user.id);
    if (!room) {
      setSelectedUser(null);
    } else {
      setSelectedUser(user);
    }
    setSelectedRoom(room);
  }

  // Function to handle message sending
  function handleMessageSend(text, event) {
    event.preventDefault();

    const messageId =
      Math.max(
        ...selectedRoom.messages.map((message) => message.message_id),
        0
      ) + 1;
    // Create the new message object
    const newMessage = {
      message_id: messageId,
      sender_id: curUser.id,
      time: new Date().toISOString(),
      content: text,
    };

    console.log(newMessage.time);

    // Add the new message to the messages array of the corresponding room
    setSelectedRoom((prevRoom) => ({
      ...prevRoom,
      messages: [...prevRoom.messages, newMessage],
    }));

    console.log(text);

    // Clear the input text
    setText("");
  }

  return (
    <div className={theme === "dark" ? "bg-[#020617]" : "bg-white"}>
      {/* Large screens layout */}
      <div className="large-screens hidden md:block">
        {/* Main content */}
        <div className="flex flex-row">
          {/* Left side content */}
          <div className="flex flex-col justify-end w-full h-lvh max-h-lvh">
            {/* Messages section */}
            <div
              className={
                "flex flex-col overflow-y-auto no-scrollbar break-words " +
                (selectedUser ? "" : "m-auto")
              }
            >
              {/* Display messages if user is selected otherwise prompt user to select a conversation */}
              {!selectedUser ? (
                <h1
                  className={
                    "text-5xl text-center " +
                    (theme === "dark" ? "text-white" : "text-black")
                  }
                >
                  Please select an user to start a conversation!
                </h1>
              ) : (
                // Display messages
                selectedRoom?.messages?.map((message) => {
                  return (
                    <TextCard
                      key={message.message_id}
                      receivingText={!(message.sender_id === curUser.id)}
                      text={message.content}
                      theme={theme}
                      time={message.time}
                    />
                  );
                })
              )}
            </div>
            {/* Message input section */}
            {selectedUser && (
              <form
                className="chat-input flex flex-row mx-5 my-4"
                onSubmit={(event) => handleMessageSend(text, event)}
              >
                <TextInput theme={theme} text={text} setText={setText} />
                <button
                  className="bg-amber-500 text-white p-3 rounded-2xl"
                  type="submit"
                >
                  <SendIcon />
                </button>
              </form>
            )}
          </div>
          {/* Right side content */}
          <div
            className={
              " w-auto h-lvh max-h-lvh ms-5 flex flex-col justify-between " +
              (theme === "dark" ? "bg-slate-900" : "bg-slate-800")
            }
          >
            {/* User list */}
            <div className="overflow-y-auto">
              {onlineUsers.users.map((user) => {
                return (
                  <RoomCard
                    key={user.id}
                    user={user}
                    ownCard={user.id === curUser.id}
                    handleRoomSelect={() => handleRoomSelect(user)}
                    theme={theme}
                  />
                );
              })}
            </div>
            {/* Footer section */}
            <div className="flex flex-row justify-between ">
              <div
                className={
                  "text-amber-500 p-2 rounded-xl m-3 max-h-14 self-end " +
                  (theme === "dark" ? "bg-slate-800" : "bg-slate-900")
                }
              >
                {/* Theme toggle */}
                <button onClick={toggleTheme}>
                  {theme === "dark" ? (
                    <DarkModeIcon fontSize="large" />
                  ) : (
                    <LightModeIcon fontSize="large" />
                  )}
                </button>
              </div>
              {/* App info */}
              <div className="text-white flex flex-col items-end m-5 font-carterOne">
                <h1 className="text-6xl text-amber-500 mb-2">OpenChat</h1>
                <a
                  href="https://github.com/SynapseApp"
                  className="text-2xl flex items-center"
                >
                  <p className="me-2">Github</p>
                  <GitHubIcon sx={{ color: amber[500] }} />
                </a>
                <a href="#" className="text-2xl flex items-center">
                  <p className="me-2">About</p>
                  <InfoOutlinedIcon sx={{ color: amber[500] }} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Mobile screens layout */}
      <div className={"mobile-screens md:hidden"}>
        {/* Mobile menu transition */}
        <Transition
          show={!mobileMenuOpen}
          enter="transition-transform duration-300"
          enterFrom="-translate-x-full"
          enterTo="translate-x-0"
          leave="transition-transform duration-300"
          leaveFrom="translate-x-0"
          leaveTo="-translate-x-full"
        >
          <div>
            <div
              className={
                "flex flex-col w-auto h-dvh max-h-dvh " +
                (selectedUser ? "justify-between" : "")
              }
            >
              {/* Main content */}
              <div className="text-amber-500 cursor-pointer p-4">
                <button onClick={() => setMobileMenuOpen(true)}>
                  <MenuIcon fontSize="large" />
                </button>
              </div>
              {/* Messages section */}
              <div className="flex flex-col justify-end">
                <div className="flex flex-col overflow-y-auto break-words">
                  {/* Display messages if user is selected otherwise prompt user to select a conversation*/}
                  {!selectedUser ? (
                    <h1 className="text-white text-2xl xs:text-3xl sm:text-5xl text-center mt-20 overflow-hidden">
                      Please select an user to start a conversation!
                    </h1>
                  ) : (
                    // Display messages
                    selectedRoom?.messages?.map((message) => {
                      return (
                        <TextCard
                          key={message.message_id}
                          receivingText={!(message.sender_id === curUser.id)}
                          text={message.content}
                          theme={theme}
                          time={message.time}
                        />
                      );
                    })
                  )}
                </div>
                {/* Message input section */}
                {selectedUser && (
                  <form
                    className="chat-input flex flex-row mx-5 my-4"
                    onSubmit={(event) => handleMessageSend(text, event)}
                  >
                    <TextInput theme={theme} text={text} setText={setText} />
                    <button className="bg-amber-500 text-white p-3 rounded-2xl">
                      <SendIcon />
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </Transition>
        {/* Mobile menu */}
        <Transition
          show={mobileMenuOpen}
          enter="transition-transform duration-300"
          enterFrom="translate-x-full"
          enterTo="translate-x-0"
          leave="transition-transform duration-300"
          leaveFrom="translate-x-0"
          leaveTo="translate-x-full"
        >
          <div>
            <div
              className={
                "w-lvw h-lvh max-h-lvh flex flex-col justify-between " +
                (theme === "dark" ? "bg-slate-900" : "bg-slate-800")
              }
            >
              {/* Header */}
              <div className="flex flex-row items-center justify-between m-4 me-6 text-amber-500">
                <h1 className="text-4xl font-carterOne xs:text-6xl">
                  OpenChat
                </h1>
                <button onClick={() => setMobileMenuOpen(false)}>
                  <ArrowBackIcon fontSize="large" />
                </button>
              </div>
              {/* User list */}
              <div
                className="overflow-y-auto"
                onClick={() => setMobileMenuOpen(false)}
              >
                {onlineUsers.users.map((user) => {
                  return (
                    <RoomCard
                      key={user.id}
                      user={user}
                      ownCard={user.id === curUser.id}
                      handleRoomSelect={() => handleRoomSelect(user)}
                      theme={theme}
                    />
                  );
                })}
              </div>
              {/* Footer */}
              <div className="flex flex-row justify-between ">
                {/* App info */}
                <div className="text-white flex flex-col items-end m-5 font-carterOne ">
                  <a href="github.com" className="text-2xl flex items-center">
                    <p className="me-2">Github</p>
                    <GitHubIcon sx={{ color: amber[500] }} />
                  </a>
                  <a href="#" className="text-2xl flex items-center">
                    <p className="me-2">About</p>
                    <InfoOutlinedIcon sx={{ color: amber[500] }} />
                  </a>
                </div>
                {/* Theme toggle */}
                <button
                  className={
                    "text-amber-500 p-2 rounded-xl m-3 max-h-14 self-end " +
                    (theme === "dark" ? "bg-slate-800" : "bg-slate-900")
                  }
                  onClick={toggleTheme}
                >
                  {theme === "dark" ? (
                    <DarkModeIcon fontSize="large" />
                  ) : (
                    <LightModeIcon fontSize="large" />
                  )}{" "}
                </button>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  );
}

export default HomePage;
