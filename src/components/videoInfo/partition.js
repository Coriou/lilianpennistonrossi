import React, { useState } from "react"
import { Button } from "reactstrap"
import { GiMusicalScore } from "react-icons/gi"
import slugify from "slugify"

import PDFModal from "../pdfModal"

export default ({ partition, title = "sheet-music" }) => {
	const [show, setShow] = useState(false)

	if (!partition) return null

	const toggle = () => setShow(!show)

	const forceDownload = () => {
		// If it's Safari
		if (typeof navigator !== "undefined" && navigator.userAgent)
			return (
				navigator.userAgent.match(/Safari/gi) &&
				!navigator.userAgent.match(/Chrome/gi)
			)

		return false
	}

	return (
		<div className="d-flex flex-column justify-items-center align-items-center">
			<hr className="w-50 mt-4 mb-4" />

			<Button
				color="primary"
				className="btn-iconed w-50 w-md-100 w-lg-75 w text-white"
				block
				onClick={toggle}
				href={forceDownload() ? partition : null}
				download={forceDownload() ? `${slugify(title)}.pdf` : false}
			>
				<span className="btn-icon">
					<GiMusicalScore />
				</span>
				<span className="btn-text">Score</span>
			</Button>

			{!forceDownload() && (
				<PDFModal
					partition={partition}
					active={show}
					setter={setShow}
					title={title}
				/>
			)}
		</div>
	)
}
