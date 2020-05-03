import React, { useState, useRef } from "react"
import { Document, Page } from "react-pdf/dist/entry.webpack"
import { Button } from "reactstrap"
import { GrLinkPrevious, GrLinkNext } from "react-icons/gr"
import useResizeAware from "react-resize-aware"

export default ({ partition }) => {
	const wrapperRef = useRef(null)
	const [pageNumber, setPageNumber] = useState(1)
	const [numPages, setNumPages] = useState(null)

	const pageDown = () => {
		if (parseInt(pageNumber) !== 1) setPageNumber(pageNumber - 1)
	}

	const pageUp = () => {
		if (parseInt !== parseInt(numPages)) setPageNumber(pageNumber + 1)
	}

	const rem = v => {
		if (typeof getComputedStyle === "function")
			return (
				v *
				parseFloat(
					getComputedStyle(document.body).getPropertyValue("font-size")
				)
			)

		return 30
	}

	const [resizeListener, sizes] = useResizeAware()

	if (partition)
		return (
			<div className="pdf-viewer" ref={wrapperRef}>
				{resizeListener}
				<Document
					width="100%"
					file={partition}
					onLoadError={console.error}
					onLoadSuccess={({ numPages }) => setNumPages(numPages)}
				>
					<Page
						pageNumber={pageNumber}
						scale={1}
						width={sizes.width - rem(1) * 2}
					/>
				</Document>

				<div className="pdf-controls">
					<span className="flex-grow-1 align-self-center d-flex flex-column">
						Page {pageNumber} / {numPages}
						<span className="text-muted pdf-credits">
							Courtesy of free-scores.com
						</span>
					</span>

					<Button
						color="primary"
						onClick={pageDown}
						disabled={!(parseInt(pageNumber) !== 1)}
					>
						<GrLinkPrevious />
					</Button>
					<Button
						color="primary"
						onClick={pageUp}
						disabled={!(parseInt(pageNumber) !== parseInt(numPages))}
					>
						<GrLinkNext />
					</Button>
				</div>
			</div>
		)

	return null
}
