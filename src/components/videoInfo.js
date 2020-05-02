import React, { useEffect, useState } from "react"
import { Link } from "gatsby"
import { Button } from "reactstrap"
import dayjs from "dayjs"
import duration from "dayjs/plugin/duration"
import { thousandSeparator } from "../utils"

dayjs.extend(duration)

export default ({
	videoID,
	title,
	artist,
	description,
	meta = [],
	small,
	author,
	excerpt,
	path,
}) => {
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
				const d = dayjs.duration(stats.items[0].contentDetails.duration)
				setDuration(
					`${d.minutes().padStart(2, 0)}:${d.seconds().padStart(2, 0)}`
				)
			} catch (err) {
				console.error(err)
			}
		}

		if (!small) getMeta()
	}, [videoID, small])

	const Meta = () => {
		if (small) return null

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

	const Details = () => {
		if (small) description = excerpt

		const Author = () => {
			if (small) return null

			return (
				<p className="text-muted text-cursive">
					- {author || "Lilian Penniston Rossi"}
				</p>
			)
		}

		const Go = () => {
			if (!small) return null

			return (
				<div className="d-flex mt-4 align-content-center justify-content-center">
					<Button outline color="primary">
						<Link to={path}>Watch</Link>
					</Button>
				</div>
			)
		}

		return (
			<>
				{!small && <hr className="w-50" />}

				<div
					className="video-description"
					dangerouslySetInnerHTML={{ __html: description }}
				/>
				<Author />
				<Go />
			</>
		)
	}

	return (
		<div className="video-details">
			<Link to={path}>
				<h3 className="mb-0 font-weight-light text-primary text-capitalize">
					{title}
				</h3>
			</Link>

			<h6 className="mt-0 text-muted text-uppercase font-weight-normal">
				{artist}
			</h6>

			<Meta />

			<Details />
		</div>
	)
}
