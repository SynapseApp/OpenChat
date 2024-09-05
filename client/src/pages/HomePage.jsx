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

import { Component, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import makeRequest from "../utils/makeRequest";
import config from "../utils/config";

class HomePage extends Component {
  constructor() {
    super();
    this.state = {
      disable: false,
      theme: this.getInitialTheme(),
      mobileMenuOpen: false,
      selectedUser: null,
      selectedRoom: null,
      messages: [],
      rooms: [],
      text: "",
      users: null,
      onlineUsers: [],
    };
  }

  async componentDidMount() {
    const { user } = this.props;

    const users = (await makeRequest(config.SERVER_URL + "/user")).data.filter(
      (u) => u._id !== user._id
    );
    const rooms = (await makeRequest(config.SERVER_URL + "/room")).data;

    this.setState({ onlineUsers: [user, ...users], rooms });
  }

  Messages = () => {
    const { selectedUser, messages, theme } = this.state;
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
          messages.map((message) => {
            return (
              <TextCard
                key={message._id}
                receivingText={!(message.sender === user._id)}
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
            className="chat-input flex flex-row mx-5 my-4 justify-between max-md:w-full"
            onSubmit={(event) => this.handleMessageSend(text, event)}
          >
            <TextInput
              theme={theme}
              text={text}
              setText={(text) => {
                this.setState({ text });
              }}
            />
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
            handleRoomSelect={() => this.handleRoomSelect(mapUser)}
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
              className={`chats flex flex-col overflow-y-auto no-scrollbar break-words ${
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
            className={`w-auto h-lvh max-h-lvh flex flex-col justify-between ${
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
              className={`flex flex-col w-full h-dvh max-h-dvh 
								${selectedUser ? "justify-between" : ""}`}
            >
              {/* Main content */}
              <div className="text-amber-500 cursor-pointer p-4">
                <button onClick={() => this.setState({ mobileMenuOpen: true })}>
                  <MenuIcon fontSize="large" />
                </button>
              </div>
              {/* Messages section */}
              <div className="h-[90dvh] w-full flex flex-col">
                <div className="chats w-full h-[80dvh] flex flex-col overflow-y-auto">
                  {/* Display messages if user is selected otherwise prompt user to select a conversation*/}
                  <this.Messages />
                </div>
                {/* Message input section */}
                <div className="flex h-[5rem] w-full">
                  <this.MessageInput />
                </div>
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
    const { theme, disable } = this.state;
    return (
      <div
        className={`h-[100dvh] w-[100vw] overflow-hidden ${
          theme === "dark" ? "bg-[#020617]" : "bg-white"
        }`}
      >
        <div
          className={`absolute w-screen h-screen top-0 left-0 bg-slate-950/30 ${
            !disable ? "hidden" : ""
          }`}
        ></div>
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
  checkConnection = async (yourID, clickedUserID) => {
    const { rooms } = this.state;
    if (yourID === clickedUserID) return null;
    let room = null;
    room = rooms.find(
      (room) =>
        room.users.includes(yourID) && room.users.includes(clickedUserID)
    );
    if (room === undefined) {
      this.setState({ disable: true });
      room = (
        await makeRequest(config.SERVER_URL + "/room", "POST", {
          users: [yourID, clickedUserID],
        })
      ).data;
      this.setState({ rooms: [...rooms, room], disable: false });
    }
    return room;
  };

  // Function to handle room selection
  handleRoomSelect = async (user) => {
    const { user: curUser, socket } = this.props;
    const { selectedRoom } = this.state;
    const room = await this.checkConnection(curUser._id, user._id);
    if (!room) {
      this.setState({ selectedUser: null });
    } else {
      this.setState({ selectedUser: user });
    }

    if (selectedRoom !== null)
      socket.off(
        selectedRoom._id + "/incoming-message",
        this.handleIncomingMessage
      );
    if (room !== null) {
      socket.on(room._id + "/incoming-message", this.handleIncomingMessage);
    }

    const messages = (
      await makeRequest(config.SERVER_URL + `/message?room=${room._id}`)
    ).data;

    this.setState({ selectedRoom: room, messages });

    this.toRecentChat();
  };

  handleIncomingMessage = (message) => {
    const { messages } = this.state;
    this.setState({ messages: [...messages, message] });
    this.toRecentChat();
  };

  // Function to handle message sending
  handleMessageSend = async (text, event) => {
    event.preventDefault();

    const { selectedRoom, messages } = this.state;
    const { user } = this.props;

    if (text !== "")
      await makeRequest(config.SERVER_URL + "/message", "POST", {
        sender: user._id,
        room: selectedRoom._id,
        time: new Date().toISOString(),
        content: text,
      });

    // Add the new message to the messages array of the corresponding room
    // this.setState({ messages: [...messages, newMessage], text: "" });
    this.setState({ text: "" });
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

  toRecentChat = () => {
    const chats = document.querySelectorAll(".chats");
    chats.forEach((chat) => {
      setTimeout(() => {
        chat.scrollTop = chat.scrollHeight;
      });
    });
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
