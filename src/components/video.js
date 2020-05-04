import React from "react"
import { navigate } from "gatsby"
import Img from "gatsby-image"
import Player from "./player"
// import PlayIcon from "../images/play-icon-holly.svg"

export default ({ videoID, className, preview, path, title, cover }) => {
	const Cover = () => {
		if (cover) return <Img fluid={cover} alt={title} />

		return (
			<img
				src={`https://i3.ytimg.com/vi/${videoID}/maxresdefault.jpg`}
				className="embed-responsive-item"
				alt={title}
			/>
		)
	}

	if (preview)
		return (
			<div
				className={[
					!cover ? "embed-responsive" : "",
					!cover ? "embed-responsive-16by9" : "",
					"video-thumbnail",
					className,
				].join(" ")}
				onClick={() => navigate(path)}
			>
				<Cover />

				{/* <div className="video-play-button" onClick={() => navigate(path)}>
					<PlayIcon
						height="5em"
						width="5em"
						className="play-button-icon"
						alt="Play Button"
						onClick={() => navigate(path)}
					/>
				</div> */}
			</div>
		)

	return (
		<Player
			videoID={videoID}
			className={className}
			title={title}
			cover={cover}
		/>
	)
}
