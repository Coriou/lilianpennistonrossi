import React from "react"
import { Link } from "gatsby"
import { Button } from "reactstrap"

export default ({
	title,
	artist,
	description,
	meta = [],
	small,
	author,
	excerpt,
	path,
}) => {
	const Meta = () => {
		if (!meta || !Array.isArray(meta) || !meta.length) return null

		return (
			<div>
				<ul className="video-meta list-unstyled list-inline">
					{meta.map((m, i) => {
						const [k, v] = m

						return (
							<li className="list-inline-item" key={i}>
								<b>{k}</b> <span>{v}</span>
							</li>
						)
					})}
				</ul>
			</div>
		)
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
				<div className="d-flex mt-2 align-content-center justify-content-center">
					<Button outline color="primary">
						<Link to={path}>Watch</Link>
					</Button>
				</div>
			)
		}

		return (
			<>
				<hr className="w-50" />

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
