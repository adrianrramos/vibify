import React from "react";
import Alert from "@material-ui/lab/Alert";
import { Animated } from "react-animated-css";

interface AlertMessageProps {
	children: React.ReactNode;
	isActive: boolean;
	alertType: "success" | "info" | "warning" | "error" | undefined;
}

const AlertMessage = ({ children, isActive, alertType }: AlertMessageProps) => {
	return (
		<div className="alerts-container" style={{ position: "fixed" }}>
			<Animated animationIn="slideInDown" animationOut="slideOutUp" animateOnMount={false} isVisible={isActive}>
				<Alert variant="filled" severity={alertType}>
					{children}
				</Alert>
			</Animated>
		</div>
	);
};
export default AlertMessage;
