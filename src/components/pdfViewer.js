import React, { useState, useRef, useEffect } from "react"
import { Button } from "reactstrap"
import { GrLinkPrevious, GrLinkNext } from "react-icons/gr"
import useResizeAware from "react-resize-aware"

export default ({ partition }) => {
	const wrapperRef = useRef(null)
	const [hasLoaded, setHasLoaded] = useState(false)
	const [pageNumber, setPageNumber] = useState(1)
	const [numPages, setNumPages] = useState("-")

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

	let Document = useRef(undefined),
		Page = useRef(undefined)

	useEffect(() => {
		if (
			typeof Document.current === "undefined" ||
			typeof Page.current === "undefined"
		)
			import("react-pdf/dist/entry.webpack")
				.then(module => {
					Document.current = module.Document
					Page.current = module.Page

					setHasLoaded(true)
				})
				.catch(console.error)
		else setHasLoaded(true)
	}, [])

	if (
		!hasLoaded ||
		typeof Document.current === "undefined" ||
		typeof Page.current === "undefined"
	)
		return <p>Loading PDF...</p>

	if (partition)
		return (
			<div className="pdf-viewer" ref={wrapperRef}>
				{resizeListener}
				<Document.current
					width="100%"
					file={partition}
					onLoadError={console.error}
					onLoadSuccess={({ numPages }) => setNumPages(numPages)}
				>
					<Page.current
						pageNumber={pageNumber}
						scale={1}
						width={sizes.width - rem(1) * 2}
					/>
				</Document.current>

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
