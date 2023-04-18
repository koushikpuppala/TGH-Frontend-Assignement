import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import Bookmarks from './Bookmarks'
import './index.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AppContextProvider } from './context'

ReactDOM.createRoot(document.getElementById('root')).render(
	<AppContextProvider>
		{/* <React.StrictMode> */}
		<Router>
			<Routes>
				<Route path='/' element={<App />} />
				<Route path='/bookmarks' element={<Bookmarks />} />
				<Route path='*' element={<h1>404: Not Found</h1>} />
			</Routes>
		</Router>
		{/* </React.StrictMode> */}
	</AppContextProvider>
)
