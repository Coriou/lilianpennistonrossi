import React from "react"

export default ({ description, author, excerpt, preview = false }) => {
	if (!preview)
		return (
			<>
				<hr className="w-50 mt-4 mb-4" />

				<div
					className="video-description"
					dangerouslySetInnerHTML={{ __html: description }}
				/>

				<p className="text-primary text-cursive">- {author || "Lilian"}</p>
			</>
		)

	return (
		<div
			className="video-description"
			dangerouslySetInnerHTML={{ __html: excerpt }}
		/>
	)
}
