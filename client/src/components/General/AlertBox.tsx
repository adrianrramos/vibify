import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { HIDE_COPIED } from "../../redux/types";
import AlertMessage from "./AlertMessage";

const AlertBox = () => {
	const dispatch = useDispatch();

	const unsaved = useSelector((state: RootState) => state.playlist.unsaved);
	const urlCopied = useSelector((state: RootState) => state.playlist.urlCopied);

	useEffect(() => {
		const timer = setTimeout(() => {
			dispatch({ type: HIDE_COPIED });
		}, 3000);

		return () => clearTimeout(timer);
	}, [urlCopied, dispatch]);

	return (
		<>
			<AlertMessage isActive={unsaved} alertType="info">
				You have unsaved changes on your playlist. Click the save icon next to your playlist title.
			</AlertMessage>
			<AlertMessage isActive={urlCopied} alertType="success">
				Playlist URL has been copied to your clipboard!
			</AlertMessage>
		</>
	);
};
export default AlertBox;
