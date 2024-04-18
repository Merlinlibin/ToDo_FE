import React, { createContext, useContext, useEffect, useState } from "react";

const TodoContext = createContext();

const Context = ({ children }) => {
  const [selectedChat, setSelectedChat] = useState();
  const [user, setUser] = useState();
  const [notification, setNotification] = useState([]);
  const [chats, setChats] = useState();
  const API_URL = "http://localhost:3000";

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUser(userInfo);

    if (!userInfo) history.push("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history]);

  return (
    <TodoContext.Provider
      value={{
        selectedChat,
        setSelectedChat,
        user,
        setUser,
        notification,
        setNotification,
        chats,
        setChats,
        API_URL,
      }}>
      {children}
    </TodoContext.Provider>
  );
};

export const TodoState = () => {
  return useContext(TodoContext);
};

export default Context;
