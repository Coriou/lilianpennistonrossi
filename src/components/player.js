import React, { useEffect, useRef } from "react"

export default ({ videoID, className, title, cover, events = () => {} }) => {
	const player = useRef(null)

	useEffect(() => {
		const createPlayer = () => {
			player.current = new window.YT.Player("player", {
				width: 1920,
				height: 1080,
				videoId: videoID,
				playerVars: {
					rel: 0,
					modestbranding: 1,
					showinfo: 0,
					color: "white",
				},
				events: {
					onReady: ({ data }) => {
						if (typeof events === "function")
							events("ready", data, player.current)
					},
					onPlaybackQualityChange: ({ data }) => {
						if (typeof events === "function")
							events("quality", data, player.current)
					},
					onStateChange: ({ data }) => {
						if (typeof events === "function")
							events("state", data, player.current)
					},
					onError: ({ data }) => {
						if (typeof events === "function")
							events("error", data, player.current)
					},
				},
			})
		}

		// Load script
		if (!window.YT) {
			window.onYouTubeIframeAPIReady = createPlayer

			const tag = document.createElement("script")
			tag.src = "https://www.youtube.com/iframe_api"

			const firstScriptTag = document.getElementsByTagName("script")[0]
			firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)
		} else {
			createPlayer()
		}
	}, [videoID, events])

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
			<div id="player" />
			{/* <iframe
				id="player"
				title={title}
				className="embed-responsive-item"
				src={`https://www.youtube.com/embed/${videoID}?rel=0&modestbranding=1&showinfo=0&color=white`}
				allowFullScreen
			></iframe> */}
		</div>
	)
}
