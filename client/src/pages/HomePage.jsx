import { Transition } from "@headlessui/react"; // Import Transition component from Headlessui Library
import SendIcon from "@mui/icons-material/Send"; // Import SendIcon component from MUI
import TextCard from "../components/TextCard"; // Import TextCard component
import RoomCard from "../components/RoomCard"; // Import RoomCard component
import TextInput from "../components/TextInput"; // Import TextInput component
import DarkModeIcon from "@mui/icons-material/DarkMode"; // Import DarkModeIcon component from MUI
import LightModeIcon from "@mui/icons-material/LightMode"; // Import LightModeIcon component from MUI
import GitHubIcon from "@mui/icons-material/GitHub"; // Import GitHubIcon component from MUI
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined"; // Import InfoOutlinedIcon component from MUI
import ArrowBackIcon from "@mui/icons-material/ArrowBack"; // Import ArrowBackIcon component from MUI
import MenuIcon from "@mui/icons-material/Menu"; // Import MenuIcon component from MUI
import { amber } from "@mui/material/colors"; // Import amber color from MUI
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

import rooms from "../dummy/rooms.json"; // Import rooms data from JSON file
import { Component, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import makeRequest from "../utils/makeRequest";
import config from "../utils/config";

class HomePage extends Component {
  state = {
    theme: "dark",
    mobileMenuOpen: false,
    selectedUser: null,
    selectedRoom: null,
    text: "",
    users: null,
    onlineUsers: [],
  };

  constructor() {
    super();
    this.state = {
      theme: this.getInitialTheme(),
      mobileMenuOpen: false,
      selectedUser: null,
      selectedRoom: null,
      text: "",
      users: null,
      onlineUsers: [],
    };
  }

  componentDidMount() {
    const { user } = this.props;
    const { onlineUsers } = this.state;
    this.setState({ onlineUsers: [user, ...onlineUsers] });
  }

  Messages = () => {
    const { selectedUser, selectedRoom, theme } = this.state;
    const { user } = this.props;

    return (
      <>
        {!selectedUser ? (
          <h1
            className={`text-5xl text-center ${
              theme === "dark" ? "text-white" : "text-black"
            }`}
          >
            Please select an user to start a conversation!
          </h1>
        ) : (
          // Display messages
          selectedRoom?.messages?.map((message) => {
            return (
              <TextCard
                key={message.message_id}
                receivingText={!(message.sender_id === user._id)}
                text={message.content}
                theme={theme}
                time={message.time}
              />
            );
          })
        )}
      </>
    );
  };
  MessageInput = () => {
    const { selectedUser, theme, text } = this.state;
    return (
      <>
        {selectedUser && (
          <form
            className="chat-input flex flex-row mx-5 my-4"
            onSubmit={(event) => this.handleMessageSend(text, event)}
          >
            <TextInput theme={theme} text={text} setText={this.setText} />
            <button
              className="bg-amber-500 text-white p-3 rounded-2xl"
              type="submit"
            >
              <SendIcon />
            </button>
          </form>
        )}
      </>
    );
  };
  UserList = () => {
    const { onlineUsers, theme } = this.state;
    const { user } = this.props;
    return (
      <>
        {onlineUsers.map((mapUser) => (
          <RoomCard
            key={mapUser._id}
            user={mapUser}
            ownCard={mapUser._id === user._id}
            handleRoomSelect={() => handleRoomSelect(mapUser)}
            theme={theme}
          />
        ))}
      </>
    );
  };
  ThemeToggle = () => {
    const { theme } = this.state;
    return (
      <div
        className={`text-amber-500 p-2 rounded-xl m-3 max-h-14 self-end ${
          theme === "dark" ? "bg-slate-800" : "bg-slate-900"
        }`}
      >
        <button onClick={this.toggleTheme}>
          {theme === "dark" ? (
            <DarkModeIcon fontSize="large" />
          ) : (
            <LightModeIcon fontSize="large" />
          )}
        </button>
      </div>
    );
  };
  Header = () => {
    return (
      <>
        <h1 className="text-4xl font-carterOne xs:text-6xl text-amber-500">
          OpenChat
        </h1>
      </>
    );
  };
  AppInfo = () => {
    return (
      <div className="text-white flex flex-col items-end my-5 font-carterOne">
        <a
          href="https://github.com/SynapseApp/OpenChat/"
          className="text-2xl flex items-center"
        >
          <p className="me-2">Github</p>
          <GitHubIcon sx={{ color: amber[500] }} />
        </a>
        <Link to="/about" className="text-2xl flex items-center">
          <p className="me-2">About</p>
          <InfoOutlinedIcon sx={{ color: amber[500] }} />
        </Link>
        <button className="text-2xl flex items-center" onClick={this.logout}>
          <p className="me-2">Logout</p>
          <ExitToAppIcon sx={{ color: amber[500] }} />
        </button>
      </div>
    );
  };

  LargeScreenUI = () => {
    const { theme, selectedUser } = this.state;

    return (
      <>
        {/* Main content */}
        <div className="flex flex-row">
          {/* Left side content */}
          <div className="flex flex-col justify-end w-full h-lvh max-h-lvh">
            <div
              className={`flex flex-col overflow-y-auto no-scrollbar break-words ${
                selectedUser ? "" : "m-auto"
              }`}
            >
              {/* Display messages if user is selected otherwise prompt user to select a conversation */}
              <this.Messages />
            </div>
            <this.MessageInput />
          </div>
          {/* Right side content */}
          <div
            className={`w-auto h-lvh max-h-lvh ms-5 flex flex-col justify-between ${
              theme === "dark" ? "bg-slate-900" : "bg-slate-800"
            }`}
          >
            {/* User list */}
            <div className="overflow-y-auto">
              <this.UserList />
            </div>
            {/* Footer section */}
            <div className="flex flex-row justify-between ">
              {/* Theme toggle */}
              <this.ThemeToggle />
              <div className="pr-5">
                <this.Header />
                {/* App info */}
                <this.AppInfo />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };
  MobileScreenUI = () => {
    const { selectedUser, mobileMenuOpen, theme } = this.state;
    return (
      <>
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
              className={`flex flex-col w-auto h-dvh max-h-dvh 
								${selectedUser ? "justify-between" : ""}`}
            >
              {/* Main content */}
              <div className="text-amber-500 cursor-pointer p-4">
                <button onClick={() => this.setState({ mobileMenuOpen: true })}>
                  <MenuIcon fontSize="large" />
                </button>
              </div>
              {/* Messages section */}
              <div className="flex flex-col justify-end">
                <div className="flex flex-col overflow-y-auto break-words">
                  {/* Display messages if user is selected otherwise prompt user to select a conversation*/}
                  <this.Messages />
                </div>
                {/* Message input section */}
                <this.MessageInput />
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
              className={`w-lvw h-lvh max-h-lvh flex flex-col justify-between " +
                ${theme === "dark" ? "bg-slate-900" : "bg-slate-800"}`}
            >
              {/* Header */}
              <div className="flex flex-row items-center justify-between m-4 me-6 text-amber-500">
                <this.Header />
                <button
                  onClick={() => this.setState({ mobileMenuOpen: false })}
                >
                  <ArrowBackIcon fontSize="large" />
                </button>
              </div>
              {/* User list */}
              <div
                className="overflow-y-auto"
                onClick={() => this.setState({ mobileMenuOpen: false })}
              >
                <this.UserList />
              </div>
              {/* Footer */}
              <div className="flex flex-row justify-between ">
                {/* App info */}
                <div className="text-white flex flex-col items-end mx-5 font-carterOne ">
                  <this.AppInfo />
                </div>
                {/* Theme toggle */}
                <this.ThemeToggle />
              </div>
            </div>
          </div>
        </Transition>
      </>
    );
  };
  render() {
    const { theme } = this.state;
    return (
      <div className={theme === "dark" ? "bg-[#020617]" : "bg-white"}>
        {/* Large Screen */}
        <div className="large-screens hidden md:block">
          <this.LargeScreenUI />
        </div>
        {/* Mobile screens layout */}
        <div className={"mobile-screens md:hidden"}>
          <this.MobileScreenUI />
        </div>
      </div>
    );
  }

  // Functions
  // Function to get the initial theme based on user's system preference
  getInitialTheme = () => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      return savedTheme;
    }
    const userPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    return userPrefersDark ? "dark" : "light";
  };

  // Function to toggle between light and dark themes
  toggleTheme = () => {
    const { theme } = this.state;
    const newTheme = theme === "dark" ? "light" : "dark";
    this.setState({ theme: newTheme });
    localStorage.setItem("theme", newTheme);
  };

  // Function to search for chat/room
  checkConnection = (rooms, yourID, clickedUserID) => {
    let room = null;
    room = rooms.rooms.find(
      (room) =>
        room.connections.includes(yourID) &&
        room.connections.includes(clickedUserID) &&
        yourID !== clickedUserID
    );
    return room;
  };

  // Function to handle room selection
  handleRoomSelect = (user) => {
    const room = this.checkConnection(rooms, curUser.id, user.id);
    if (!room) {
      this.setState({ selectedUser: null });
    } else {
      this.setState({ selectedUser: user });
    }
    this.setState({ selectedRoom: room });
  };

  // Function to handle message sending
  handleMessageSend = (text, event) => {
    event.preventDefault();

    const { selectedRoom } = this.state;
    const { user } = this.props;

    const messageId =
      Math.max(
        ...selectedRoom.messages.map((message) => message.message_id),
        0
      ) + 1;
    // Create the new message object
    const newMessage = {
      message_id: messageId,
      sender_id: user.id,
      time: new Date().toISOString(),
      content: text,
    };

    console.log(newMessage.time);

    // Add the new message to the messages array of the corresponding room
    this.setSelectedRoom((prevRoom) => ({
      ...prevRoom,
      messages: [...prevRoom.messages, newMessage],
    }));

    console.log(text);

    // Clear the input text
    setText("");
  };
  // Logout the user
  logout = async () => {
    const { setIsAuthenticated } = this.props;
    const response = await makeRequest(
      `${config.SERVER_URL}/user/logout`,
      "POST"
    );
    setIsAuthenticated(response.success);
  };
}

export default function (props) {
  const { isAuthenticated } = props;
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/register");
    }
  }, [isAuthenticated]);

  return <HomePage {...props} />;
}

// 	useEffect(() => {
// 		if (isAuthenticated === false) {
// 			navigate("/register");
// 		}
// 	}, [isAuthenticated]);

// 	useEffect(() => {
// 		console.log("runs");
// 		setCurUser({
// 			id: user?._id,
// 			name: user?.username,
// 			joinTime: "6:12",
// 		});
// 		setOnlineUsers([curUser, ...onlineUsers]);
// 	}, [user]);

// 	// Effect to set users when component mounts
// 	useEffect(() => {
// 		setUsers(onlineUsers);
// 	}, [users]);
