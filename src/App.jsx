import { Fragment, useEffect, useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Card from './components/Card'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { useAppContext } from './context'
import Loading from './components/Loading'

function classNames(...classes) {
	return classes.filter(Boolean).join(' ')
}

function App() {
	const { selection, setSelection, tags, setTags, isLoading, setIsLoading } = useAppContext()

	const [data, setData] = useState(null)

	const getQuote = async () => {
		setIsLoading(true)
		try {
			const response = await fetch(
				`https://api.quotable.io/random${selection._id ? `?tags=${selection.name}` : ''}`
			)
			const { statusCode, statusMessage, ...data } = await response.json()
			if (!response.ok) throw new Error(`${statusCode} ${statusMessage}`)
			setData(data)
			console.log({ statusCode, statusMessage, ...data })
			setIsLoading(false)
		} catch (error) {
			setData({
				content: 'Opps... Something went wrong. Please try reloading',
			})
			setIsLoading(false)
		}
	}

	const getTags = async () => {
		setIsLoading(true)
		try {
			const response = await fetch('https://api.quotable.io/tags')
			const data = await response.json()
			if (!response.ok) throw new Error(`${statusCode} ${statusMessage}`)
			setTags([
				{
					name: 'Select a tag',
					_id: null,
				},
				...data,
			])
			console.log(data)
			setIsLoading(false)
		} catch (error) {
			console.log(error)
			setTags([
				{
					name: 'Error while fetching tags',
					_id: null,
				},
			])
			setIsLoading(false)
		}
	}

	useEffect(() => {
		getQuote()
		getTags()
	}, [selection])

	if (isLoading) return <Loading />

	return (
		<>
			<Navbar />
			<div className='App flex justify-center flex-col'>
				<Card data={data} />
				<br />
				<div className='flex justify-center items-center align-middle text-center flex-col'>
					<Listbox value={selection} onChange={setSelection}>
						{({ open }) => (
							<>
								<div className='relative mt-2'>
									<Listbox.Button className='relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6'>
										<span className='flex items-center'>
											<span className='ml-3 block truncate px-4'>
												{selection.name}
											</span>
										</span>
										<span className='pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2'>
											<ChevronUpDownIcon
												className='h-5 w-5 text-gray-400'
												aria-hidden='true'
											/>
										</span>
									</Listbox.Button>

									<Transition
										show={open}
										as={Fragment}
										leave='transition ease-in duration-100'
										leaveFrom='opacity-100'
										leaveTo='opacity-0'>
										<Listbox.Options className='absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
											{tags.map((data) => (
												<Listbox.Option
													key={data._id}
													className={({ active }) =>
														classNames(
															active
																? 'bg-indigo-600 text-white'
																: 'text-gray-900',
															'relative cursor-default select-none py-2 pl-3 pr-9'
														)
													}
													value={data}>
													{({ selected, active }) => (
														<>
															<div className='flex items-center'>
																<span
																	className={classNames(
																		selected
																			? 'font-semibold'
																			: 'font-normal',
																		'ml-3 block truncate'
																	)}>
																	{data.name}
																</span>
															</div>

															{selected ? (
																<span
																	className={classNames(
																		active
																			? 'text-white'
																			: 'text-indigo-600',
																		'absolute inset-y-0 right-0 flex items-center pr-4'
																	)}>
																	<CheckIcon
																		className='h-5 w-5'
																		aria-hidden='true'
																	/>
																</span>
															) : null}
														</>
													)}
												</Listbox.Option>
											))}
										</Listbox.Options>
									</Transition>
								</div>
							</>
						)}
					</Listbox>
					<br />
					<button onClick={getQuote}>Next Quote</button>
				</div>
			</div>
		</>
	)
}

export default App
