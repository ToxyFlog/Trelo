import {io} from "socket.io-client";
import config from "../../config";
import store from "../../redux/store";
import registerCardHandler from "./cardHandler";
import registerBoardHandler from "./boardHandler";
import createRoomHandler from "./roomHandler";

export default () => {
	const options = {
		path: "/ws/",
		auth: {JWT: localStorage.getItem("JWT")},
		transports: ["websocket"],
		upgrade: false,
		secure: true,
		rejectUnauthorized: false,
	};
	const socket = io(`${config.BACKEND}`, options);

	registerCardHandler(socket, store);
	registerBoardHandler(socket, store);

	return createRoomHandler(socket);
};