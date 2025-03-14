const chats = [
  {
    id: "1",
    image: require("../assets/images/user_2.png"),
    name: "Mark Dyson",
    message: "I'm already starting to play",
    time: "14 Jun",
    status: "active",
    unread: 2,
    isReaded: false,
  },
  {
    id: "2",
    image: require("../assets/images/user_2.png"),
    name: "Mark Dyson",
    message: "You: Ok",
    status: "offline",
    time: "14 Jun",
    unread: 0,
    isReaded: true,
  },
  {
    id: "3",
    image: require("../assets/images/user_2.png"),
    name: "Mark Dyson",
    message: "I'm already starting to play",
    time: "14 Jun",
    status: "online",
    unread: 0,
    isReaded: false,
  },
];

export { chats };
