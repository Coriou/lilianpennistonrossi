import React, { useEffect, useRef, useState } from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import * as JsSearch from "js-search"
import { Container, Row, Col, Input } from "reactstrap"
import { debounce } from "../utils"

export default () => {
	const {
		site: {
			siteMetadata: { url },
		},
	} = useStaticQuery(
		graphql`
			{
				site {
					siteMetadata {
						url
					}
				}
			}
		`
	)

	const [results, setResults] = useState(false)
	const [isReady, setIsReady] = useState(false)
	const s = useRef(false)
	const search = debounce(q => {
		if (!s.current) return false

		q = String(q)
		if (!q.length) setResults([])
		if (q.length <= 2) return false

		setResults(s.current.search(q))
	}, 250)

	// Search results component
	const SearchResults = ({ results }) => {
		const trimClean = (str, maxLength = 100) => {
			var trimmedString = ""
			if (str.length > trimmedString.length) {
				trimmedString = str.substr(0, maxLength)
				trimmedString = trimmedString.substr(
					0,
					Math.min(trimmedString.length, trimmedString.lastIndexOf(" "))
				)
				if (str.length > trimmedString.length)
					trimmedString = `${trimmedString} ...`
			}

			return trimmedString
		}

		const SearchResult = ({ result }) => {
			return (
				<div
					key={JSON.stringify(result.title)}
					className="search-result d-flex align-items-center p-2"
				>
					<div>
						<Link to={result.path}>
							<h6 className="mb-0 text-primary">{result.title}</h6>
						</Link>
						<b className="text-muted">{result.author}</b>
						<p className="mb-0 pb-0">{trimClean(result.excerpt)}</p>
					</div>
				</div>
			)
		}

		if (!Array.isArray(results) || !results.length) return null

		return (
			<div className="position-absolute w-100">
				{results.map(result => (
					<SearchResult result={result} />
				))}
			</div>
		)
	}

	useEffect(() => {
		const fetchContent = async () => {
			return await fetch(`${url}/content.json`)
				.then(r => r.json())
				.catch(console.error)
		}

		fetchContent()
			.then(({ videos, playlists }) => {
				s.current = new JsSearch.Search("title")

				// Removal of accentuated characters when tokenizing
				s.current.tokenizer = {
					tokenize(text) {
						try {
							text = text.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
						} catch (e) {
							console.error(e)
						}

						// Using built-in simple tokenizer, don't think I need anything better right now
						const { tokenize } = new JsSearch.SimpleTokenizer()

						return tokenize(text)
					},
				}

				s.current.addIndex("title")
				s.current.addIndex("author")
				s.current.addIndex("excerpt")

				s.current.addDocuments([...videos])

				setIsReady(true)
			})
			.catch(console.error)
	}, [url])

	return (
		<Container>
			<Row>
				<Col>
					<div className="search-wrapper mt-4 w-100 position-relative">
						<Input
							disabled={!isReady}
							placeholder="Type to search"
							onChange={e => search(e.target.value)}
						/>
						<SearchResults results={results} />
					</div>
				</Col>
			</Row>
		</Container>
	)
}
