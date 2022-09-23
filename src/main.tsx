import * as React from 'react'
import { createRoot } from 'react-dom/client'
import { Calculator } from './Calculator'
import './index.css'

createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<Calculator />
	</React.StrictMode>
)
