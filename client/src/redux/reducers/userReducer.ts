import { SET_USER_DATA } from "../types";

export interface UserReducerProps {
	email: string;
	handle: string;
	userId: string;
	newUser: boolean;
}
const initialState: UserReducerProps = {
	email: "",
	handle: "",
	userId: "",
	newUser: false,
};

export default (state = initialState, { type, payload }: { type: string; payload: any }) => {
	switch (type) {
		case SET_USER_DATA:
			return { ...state, ...payload };
		default:
			return state;
	}
};
