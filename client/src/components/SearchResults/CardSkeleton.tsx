import React from "react";

import "../../styles/Card.css";

const CardSkeleton = () => {
	return (
		<>
			<div className="loading-track-cards container flex items-center my-5 bg-black rounded-lg overflow-hidden border border-gray-700 cursor-pointer">
				<div className="track-art-container">
					<img src="https://i.ytimg.com/vi/GxsBZOc-B2E/hqdefault.jpg" alt="track art" className="track-art" />
				</div>
				<div className="info-panel w-3/4">
					<h1 className="track-title-card">Place Holder Track Title</h1>
					<p className="author">Place Holder Artist Name</p>
				</div>
				<div className="card-controls">
					<i className="fas fa-plus add-to-playlist"></i>
				</div>
			</div>
			<div className="loading-track-cards container flex items-center my-5 bg-black rounded-lg overflow-hidden border border-gray-700 cursor-pointer">
				<div className="track-art-container">
					<img src="https://i.ytimg.com/vi/GxsBZOc-B2E/hqdefault.jpg" alt="track art" className="track-art" />
				</div>
				<div className="info-panel w-3/4">
					<h1 className="track-title-card">Place Holder Track Title</h1>
					<p className="author">Place Holder Artist Name</p>
				</div>
				<div className="card-controls">
					<i className="fas fa-plus add-to-playlist"></i>
				</div>
			</div>
			<div className="loading-track-cards container flex items-center my-5 bg-black rounded-lg overflow-hidden border border-gray-700 cursor-pointer">
				<div className="track-art-container">
					<img src="https://i.ytimg.com/vi/GxsBZOc-B2E/hqdefault.jpg" alt="track art" className="track-art" />
				</div>
				<div className="info-panel w-3/4">
					<h1 className="track-title-card">Place Holder Track Title</h1>
					<p className="author">Place Holder Artist Name</p>
				</div>
				<div className="card-controls">
					<i className="fas fa-plus add-to-playlist"></i>
				</div>
			</div>
			<div className="loading-track-cards container flex items-center my-5 bg-black rounded-lg overflow-hidden border border-gray-700 cursor-pointer">
				<div className="track-art-container">
					<img src="https://i.ytimg.com/vi/GxsBZOc-B2E/hqdefault.jpg" alt="track art" className="track-art" />
				</div>
				<div className="info-panel w-3/4">
					<h1 className="track-title-card">Place Holder Track Title</h1>
					<p className="author">Place Holder Artist Name</p>
				</div>
				<div className="card-controls">
					<i className="fas fa-plus add-to-playlist"></i>
				</div>
			</div>
		</>
	);
};
export default CardSkeleton;
