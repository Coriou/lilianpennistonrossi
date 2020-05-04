import React from "react"
import { Link } from "gatsby"
import { Button } from "reactstrap"
import { FiPlay } from "react-icons/fi"

import Meta from "./videoInfo/meta"
import Description from "./videoInfo/description"
import Partition from "./videoInfo/partition"

export default ({
	videoID,
	title,
	artist,
	description,
	meta = [],
	preview,
	author,
	excerpt,
	partition,
	path,
}) => {
	return (
		<div className="video-details">
			<Link to={path}>
				<h3 className="mb-0 text-primary text-capitalize">{title}</h3>
			</Link>

			<h6 className="mt-0 text-muted text-uppercase font-weight-normal">
				{artist}
			</h6>

			{!preview && <Meta videoID={videoID} meta={meta} />}

			<Description
				description={description}
				excerpt={excerpt}
				author={author}
				preview={preview}
			/>

			{preview && (
				<div className="mt-4 d-flex flex-column align-items-center">
					<Button
						color="primary"
						className="btn-iconed w-50 w-md-25 text-white"
						block
						to={path}
						tag={Link}
					>
						<span className="btn-icon">
							<FiPlay />
						</span>
						<span className="btn-text">Watch</span>
					</Button>
				</div>
			)}

			{!preview && <Partition partition={partition} title={title} />}
		</div>
	)
}
