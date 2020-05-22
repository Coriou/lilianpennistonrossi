import React from "react"
import { Link } from "gatsby"
import { Button, Row, Col } from "reactstrap"
import { FiPlay } from "react-icons/fi"

import Meta from "./videoInfo/meta"
import Description from "./videoInfo/description"
import Partition from "./videoInfo/partition"

export default ({
	videoID,
	title,
	artist,
	authorBirthDeath,
	description,
	meta = [],
	preview,
	author,
	excerpt,
	partition,
	path,
	playlistComponent,
}) => {
	const displaySidebar = !preview && partition

	return (
		<div className="video-details d-flex flex-column flex-grow-1">
			<Row className="d-flex">
				<Col>
					<Link to={path}>
						<h3 className="mb-0 text-primary text-capitalize">{title}</h3>
					</Link>

					<h6 className="mt-0 text-muted text-uppercase font-weight-normal">
						{artist}{" "}
						{!preview && authorBirthDeath && (
							<span className="small">{authorBirthDeath}</span>
						)}
					</h6>

					{!preview && <Meta videoID={videoID} meta={meta} />}
				</Col>
			</Row>

			<Row className="d-flex flex-grow-1">
				<Col
					md={displaySidebar ? (playlistComponent ? 8 : 9) : 12}
					className="flex-grow-1 h-100"
				>
					<Description
						description={description}
						excerpt={excerpt}
						author={author}
						preview={preview}
					/>
				</Col>
				<Col md={displaySidebar ? (playlistComponent ? 4 : 3) : 0}>
					<Partition partition={partition} title={title} />
				</Col>
			</Row>

			{preview && (
				<Row className="d-flex">
					<Col>
						<div className="mt-4 d-flex flex-column align-items-center">
							<Button
								color="primary"
								className="btn-iconed w-50 w-sm-25 text-white"
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
					</Col>
				</Row>
			)}
		</div>
	)
}
