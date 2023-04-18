import { BookmarkIcon as BookmarkSolid } from '@heroicons/react/24/solid'
import { BookmarkIcon as BookmarkOutline } from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'
import { useAppContext } from '../context'

export default function Card({ data }) {
	const { bookmarks, setBookmarks } = useAppContext()

	const [bookmarked, setBookmarked] = useState(false)

	useEffect(() => {
		if (bookmarks && bookmarks.includes(data._id)) {
			setBookmarked(true)
		} else {
			setBookmarked(false)
		}
	}, [data])

	return (
		<div className='container flex items-center justify-center'>
			<div className='box overflow-hidden bg-red-500 shadow-2xl sm:rounded-lg'>
				<div className='px-4 py-5 sm:px-6 text-center'>
					<h6 className='text-lg font-medium leading-6 text-white'>{data.content}</h6>
					<hr className='my-4' />
					{data._id && (
						<div className='flex justify-between flex-col md:flex-row align-middle items-center'>
							<p className='mt-1 max-w-2xl text-sm text-gray-300'>
								<span className='text-white'></span>
								{data.tags.map((tag) => {
									return (
										<span
											key={tag}
											className='bg-gray-800 rounded-full px-2 py-1 text-sm font-semibold text-gray-100 mr-2'>
											{tag}
										</span>
									)
								})}
							</p>
							<div className='flex justify-between flex-row align-middle items-center w-1/2'>
								<p className='mt-1 max-w-2xl text-sm text-gray-300 p-4'>
									<span className='text-white'>Author -</span> {data.author}
								</p>

								{bookmarked ? (
									<BookmarkSolid
										className='h-5 w-5 text-white'
										aria-hidden='true'
										onClick={() => {
											const index = bookmarks.indexOf(data._id)
											if (index > -1) {
												bookmarks.splice(index, 1)
											}
											setBookmarks(bookmarks)
											localStorage.setItem(
												'bookmarks',
												JSON.stringify(bookmarks)
											)
											setBookmarked(false)
										}}
									/>
								) : (
									<BookmarkOutline
										className='h-5 w-5 text-white'
										aria-hidden='true'
										onClick={() => {
											bookmarks.includes(data._id)
												? null
												: bookmarks.push(data._id)

											setBookmarks(bookmarks)
											localStorage.setItem(
												'bookmarks',
												JSON.stringify(bookmarks)
											)
											setBookmarked(true)
										}}
									/>
								)}
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}
