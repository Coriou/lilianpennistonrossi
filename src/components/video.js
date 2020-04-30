import React, { useState, useRef } from "react"
import { navigate } from "gatsby"
import Player from "./player"
import PlayIcon from "../images/play-icon-holly.svg"

export default ({ videoID, className, small, path }) => {
	const hasAlreadyPlayed = useRef(false)
	const [displayPlayer, setDisplayPlayer] = useState(false)
	const [isPlaying, setIsPlaying] = useState(false)
	const [isReady, setIsReady] = useState(false)

	const onPause = () => {
		setIsPlaying(false)
	}

	const onPlay = () => {
		setIsPlaying(true)
		setDisplayPlayer(true)
	}

	const initialStart = () => {
		if (!hasAlreadyPlayed.current) {
			if (!displayPlayer) setDisplayPlayer(true)
			setTimeout(() => setIsPlaying(true), 500)
			hasAlreadyPlayed.current = true
		} else {
			setIsPlaying(true)
		}
	}

	const defaultClass = ["video-wrapper"]
	const wrapperClassName = Array.isArray(className)
		? [...defaultClass, ...className].join(" ")
		: [...defaultClass, className].join(" ")

	return (
		<>
			<div className={wrapperClassName}>
				<div
					className="placeholder-16-9"
					style={{
						backgroundImage: `url('https://i3.ytimg.com/vi/${videoID}/maxresdefault.jpg')`,
						cursor: small ? "pointer" : "inherit",
					}}
					onClick={() => {
						if (small) navigate(path)
					}}
				/>

				<div
					className="video-play-button"
					onClick={initialStart}
					style={{
						zIndex: isPlaying ? -1 : 2,
						display: isReady && !isPlaying ? "flex" : "none",
					}}
				>
					<PlayIcon
						height="5em"
						width="5em"
						className="play-button-icon"
						alt="Play Button"
						onClick={initialStart}
					/>
				</div>

				{!small && (
					<Player
						isDisplayed={displayPlayer}
						videoID={videoID}
						style={{ zIndex: displayPlayer ? 1 : -1 }}
						onPause={onPause}
						onPlay={onPlay}
						onReady={() => setIsReady(true)}
						isPlaying={isPlaying}
					/>
				)}
			</div>
		</>
	)
}
