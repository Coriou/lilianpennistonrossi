import React, { useState, useEffect } from "react"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap"
import slugify from "slugify"
import PDFViewer from "./pdfViewer"

export default ({ partition, active, setter, title }) => {
	if (typeof setter !== "function") setter = () => {}
	const [modal, setModal] = useState(active)

	const toggle = () => setModal(!modal)

	useEffect(() => {
		setModal(active)
	}, [active])

	return (
		<div>
			<Modal
				isOpen={modal}
				toggle={toggle}
				size="md"
				onClosed={() => {
					setter(false)
				}}
				onOpened={() => {
					setter(true)
				}}
			>
				<ModalHeader toggle={toggle}>
					Sheet music
					<span className="d-block text-muted pdf-title">{title}</span>
				</ModalHeader>
				<ModalBody>
					<PDFViewer partition={partition} />
				</ModalBody>
				<ModalFooter>
					<Button
						color="primary"
						download={`${slugify(title)}.pdf`}
						href={partition}
						title={title}
					>
						Download
					</Button>
					<Button color="secondary" onClick={toggle}>
						Close
					</Button>
				</ModalFooter>
			</Modal>
		</div>
	)
}
