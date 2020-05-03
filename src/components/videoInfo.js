import React, { useEffect, useState } from "react"
import { Link, navigate } from "gatsby"
import { Button } from "reactstrap"
import { GiMusicalScore } from "react-icons/gi"
import { FiPlay } from "react-icons/fi"
import { thousandSeparator, parseDuration } from "../utils"
import PDFModal from "./pdfModal"

export default ({
	videoID,
	title,
	artist,
	description,
	meta = [],
	small,
	author,
	excerpt,
	partition,
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
				const videoDuration = parseDuration(
					stats.items[0].contentDetails.duration
				)
				setDuration(videoDuration || "-")
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

			return <p className="text-primary text-cursive">- {author || "Lilian"}</p>
		}

		const Go = () => {
			if (!small) return null

			return (
				<div className="mt-4 d-flex flex-column align-items-center">
					<Button
						color="primary"
						className="btn-iconed w-25 text-white"
						block
						onClick={() => navigate(path)}
					>
						<span className="btn-icon">
							<FiPlay />
						</span>
						<span className="btn-text">
							<Link to={path}>Watch</Link>
						</span>
					</Button>
				</div>
			)
		}

		return (
			<>
				{!small && <hr className="w-50 mt-4 mb-4" />}

				<div
					className="video-description"
					dangerouslySetInnerHTML={{ __html: description }}
				/>
				<Author />
				<Go />
			</>
		)
	}

	const Partition = () => {
		const [show, setShow] = useState(false)

		if (small || !partition) return null

		const toggle = () => setShow(!show)

		return (
			<div className="d-flex flex-column justify-items-center align-items-center">
				<hr className="w-50 mt-4 mb-4" />

				<Button
					color="primary"
					className="btn-iconed w-25 text-white"
					block
					onClick={toggle}
				>
					<span className="btn-icon">
						<GiMusicalScore />
					</span>
					<span className="btn-text">Sheet music</span>
				</Button>

				<PDFModal
					partition={partition}
					active={show}
					setter={setShow}
					title={title}
				/>
			</div>
		)
	}

	return (
		<div className="video-details">
			<Link to={path}>
				<h3 className="mb-0 text-primary text-capitalize">{title}</h3>
			</Link>

			<h6 className="mt-0 text-muted text-uppercase font-weight-normal">
				{artist}
			</h6>

			<Meta />

			<Details />

			<Partition />
		</div>
	)
}
