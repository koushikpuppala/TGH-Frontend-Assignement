import { useContext, createContext, useState } from 'react'

const Context = createContext()

export function useAppContext() {
	return useContext(Context)
}

export function AppContextProvider({ children }) {
	const [bookmarks, setBookmarks] = useState(JSON.parse(localStorage.getItem('bookmarks')) || [])
	const [tags, setTags] = useState([])
	const [selection, setSelection] = useState({
		name: 'Select a tag',
		_id: null,
	})
	const [isLoading, setIsLoading] = useState(true)

	return (
		<Context.Provider
			value={{
				bookmarks,
				setBookmarks,
				tags,
				setTags,
				selection,
				setSelection,
				isLoading,
				setIsLoading,
			}}>
			{children}
		</Context.Provider>
	)
}
