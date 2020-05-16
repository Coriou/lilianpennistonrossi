import React from "react"
import Video from "./video"
import VideoInfo from "./videoInfo"

export default props => {
	return (
		<article className="pt-4 pb-4 d-flex flex-column flex-grow-1">
			<Video className="mb-4" {...props} />
			<VideoInfo {...props} />
		</article>
	)
}
