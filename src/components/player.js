/* eslint-disable jsx-a11y/media-has-caption */

import React, { useEffect, useRef } from "react"
import "../styles/plyr.scss"

export default ({
	videoID,
	options = {},
	onPlay,
	onPause,
	onReady,
	isPlaying,
	isDisplayed = false,
	...rest
}) => {
	const player = useRef(null)
	const hasPlayed = useRef(false)
	const sources = {
		type: "video",
		sources: [{ src: videoID, provider: "youtube" }],
	}
	const elID = `plyr-yt-${videoID}`
	const plyrOptions = Object.assign(
		{},
		{
			controls: [
				// "play-large",
				"rewind",
				"play",
				"fast-forward",
				"progress",
				"current-time",
				"duration",
				"mute",
				"volume",
				"fullscreen",
			],
			seekTime: 15,
			ratio: "16:9",
			// autoplay: true,
			youtube: {
				noCookie: false,
				rel: 0,
				iv_load_policy: 3,
				modestbranding: 1,
				cc_load_policy: 0,
				controls: 0,
				showinfo: 0,
			},
		},
		options
	)
	const checkPlay = useRef(null)

	// Import Plyr dynamically
	useEffect(() => {
		import("plyr")
			.then(plyr => {
				const Plyr = plyr.default

				if (!player.current) {
					player.current = new Plyr(`#${elID}`, plyrOptions)

					player.current.once("canplay", event => {
						if (plyrOptions.autoplay)
							setTimeout(() => player.current.play(), 250)
					})

					player.current.on("playing", event => {
						if (!hasPlayed.current) hasPlayed.current = true
						if (typeof onPlay === "function") onPlay(event)
					})

					player.current.on("play", event => {
						if (!hasPlayed.current) hasPlayed.current = true
						if (typeof onPlay === "function") onPlay(event)
					})

					player.current.on("pause", event => {
						if (typeof onPause === "function") onPause(event)
					})

					player.current.once("ready", event => {
						player.current.source = sources
						if (typeof onReady === "function") onReady()
					})
				}

				return () => {
					// This seems overkill, not sure
					// player.current.destroy()
				}
			})
			.catch(console.error)
	}, [elID, plyrOptions, sources, onPause, onPlay, onReady, isDisplayed])

	useEffect(() => {
		const playOrPause = () => {
			const isReallyPlaying =
				player.current && player.current.ready && player.current.playing

			const play = () => {
				if (!isReallyPlaying && isPlaying) player.current.play()
			}
			play()

			if (isReallyPlaying && !isPlaying) player.current.pause()

			if (isReallyPlaying && isPlaying)
				checkPlay.current && clearInterval(checkPlay.current)
		}

		playOrPause()

		// Do this because the "ready" & "canplay" events don't actually mean it's ready nor that it can play ...
		if (!checkPlay.current)
			checkPlay.current = setInterval(() => {
				console.log("play from timer")
				playOrPause()
			}, 1000)
	}, [isPlaying])

	useEffect(
		() =>
			checkPlay.current &&
			clearInterval(checkPlay.current) &&
			(checkPlay.current = false),
		[]
	)

	return (
		<div id={`${elID}_wrapper`} className="player-wrapper" {...rest}>
			<video id={elID} className="yt-plyr" />
		</div>
	)
}
