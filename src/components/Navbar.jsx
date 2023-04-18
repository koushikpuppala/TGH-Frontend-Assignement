import { Disclosure } from '@headlessui/react'
import { Link } from 'react-router-dom'

function Navbar() {
	return (
		<Disclosure as='nav'>
			<div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
				<div className='relative flex h-16 items-center sm:ml-6 justify-between'>
					<a href='/' className='rounded-full p-1 hover:text-gray-400 text-white'>
						Home
					</a>
					<a
						href='/bookmarks'
						className='rounded-full p-1 hover:text-gray-400 text-white'>
						Bookmarks
					</a>
				</div>
			</div>
		</Disclosure>
	)
}

export default Navbar
