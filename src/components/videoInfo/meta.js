import React, { useState, useEffect } from "react"
import { thousandSeparator, parseDuration } from "../../utils"

export default ({ videoID }) => {
	const [views, setViews] = useState("-")
	const [duration, setDuration] = useState("-")

	useEffect(() => {
		const getMeta = async () => {
			const stats = await fetch(
				`https://www.googleapis.com/youtube/v3/videos?part=contentDetails,statistics&id=${videoID}&key=AIzaSyCDAuRWU9k9TaI2Xnj4SKvJ4oLv6AOsLBs`
			)
				.then(r => r.json())
				.catch(console.error)

			try {
				setViews(thousandSeparator(stats.items[0].statistics.viewCount))
			} catch (err) {
				console.error(err)
			}

			try {
				const videoDuration = parseDuration(
					stats.items[0].contentDetails.duration
				)
				setDuration(videoDuration || "-")
			} catch (err) {
				console.error(err)
			}
		}

		getMeta()
	}, [videoID])

	return (
		<ul className="video-meta list-unstyled list-inline">
			<li className="list-inline-item">
				<b>Duration</b> <span>{duration}</span>
			</li>
			<li className="list-inline-item">
				<b>Views</b> <span>{views}</span>
			</li>
		</ul>
	)

	// if (!meta || !Array.isArray(meta) || !meta.length) return null

	// return (
	// 	<div>
	// 		<ul className="video-meta list-unstyled list-inline">
	// 			{meta.map((m, i) => {
	// 				const [k, v] = m

	// 				return (
	// 					<li className="list-inline-item" key={i}>
	// 						<b>{k}</b> <span>{v}</span>
	// 					</li>
	// 				)
	// 			})}
	// 		</ul>
	// 	</div>
	// )
}
