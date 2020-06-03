import React from "react"
import { Container, Col, Row } from "reactstrap"
import { FiGithub } from "react-icons/fi"
import { BsShieldLock } from "react-icons/bs"

export default () => {
	return (
		<footer className="footer">
			<Container>
				<Row>
					<Col xs={10}>
						<ul className="list-inline mb-0">
							<li className="list-inline-item">
								<BsShieldLock /> We <i>do not</i> use cookies to track you
							</li>
						</ul>
					</Col>
					<Col xs={2} className="text-right">
						<a
							href="https://github.com/Coriou/lilianpennistonrossi"
							target="_blank"
							rel="noreferrer"
							alt="Source code"
							title="Source code on Github"
							className="text-reset"
						>
							<FiGithub />
						</a>
					</Col>
				</Row>
			</Container>
		</footer>
	)
}
