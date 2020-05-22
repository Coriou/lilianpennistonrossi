import React from "react"
import Video from "./video"
import VideoInfo from "./videoInfo"

export default props => {
	const { wrapperClassname } = props

	return (
		<article
			className={[
				"pt-4",
				"pb-4",
				"d-flex",
				"flex-column",
				"flex-grow-1",
				...String(wrapperClassname).split(" "),
			].join(" ")}
		>
			<Video className="mb-4" {...props} />
			<VideoInfo {...props} />
		</article>
	)
}
