import request from "../request";
import axios from "../axiosClient";

export const downloadFile = async (url, filename = "Image.png") => {
	try {
		const res = await axios.get(url, {responseType: "blob"});
		if (!res || res.status !== 200) return null;

		const link = document.createElement("a");
		link.href = window.URL.createObjectURL(new Blob([res.data]));
		link.setAttribute("download", filename);
		document.body.appendChild(link);
		link.click();
		link.remove();
	} catch (e) {
		return null;
	}
};

export const uploadFiles = (boardId, files) => request(axios.post(`/file/upload/`, {boardId, files}));