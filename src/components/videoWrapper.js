import React from "react"
import Video from "./video"
import VideoInfo from "./videoInfo"

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
	return (
		<article className="pt-4 pb-4">
			<Video videoID={videoID} className="mb-2" small={small} path={path} />
			<VideoInfo
				path={path}
				small={small}
				title={title}
				artist={artist}
				description={description}
				excerpt={excerpt}
				meta={meta}
				author={author}
			/>
		</article>
	)
}
