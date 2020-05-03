import React from "react"

export default ({ videoID, className, title, cover }) => {
	return (
		<div
			className={[
				"embed-responsive",
				"embed-responsive-16by9",
				"video-player",
				className,
			].join(" ")}
			style={{ backgroundImage: cover ? `url(${cover.base64})` : "" }}
		>
			<iframe
				title={title}
				className="embed-responsive-item"
				src={`https://www.youtube.com/embed/${videoID}?rel=0&modestbranding=1&showinfo=0&color=white`}
				allowFullScreen
			></iframe>
		</div>
	)
}
