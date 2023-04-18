import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import Card from './components/Card'
import { useAppContext } from './context'
import Loading from './components/Loading'

function Bookmarks() {
	const { bookmarks, isLoading, setIsLoading } = useAppContext()

	const [data, setData] = useState([])

	const getData = async (id) => {
		try {
			const response = await fetch(`https://api.quotable.io/quotes/${id}`)
			const bookmark = await response.json()
			setData((prev) => [...prev, bookmark])
			console.log(bookmark)
			setIsLoading(false)
		} catch (error) {
			clg(error)
			setIsLoading(false)
			setData([
				{
					content: 'Opps... Something went wrong. Please try reloading',
					id: 'Error',
				},
			])
		}
	}

	console.log(bookmarks)

	useEffect(() => {
		bookmarks.map((bookmark) => {
			console.log(bookmark)
			getData(bookmark)
		})
		bookmarks.length === 0 && setIsLoading(false)
	}, [bookmarks])

	if (isLoading) return <Loading />

	return (
		<>
			<Navbar />
			<div className='App flex justify-center flex-col'>
				{data.length !== 0 ? (
					data.map((quote) => {
						return (
							<div key={quote._id}>
								<Card data={quote} />
								<br />
							</div>
						)
					})
				) : (
					<h1 className='text-2xl text-center text-white'>You have no bookmarks</h1>
				)}
			</div>
		</>
	)
}

export default Bookmarks
