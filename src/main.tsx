import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Filter } from 'lucide-react'
import { FilterProvider } from './components/FilterContext.tsx'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <FilterProvider>  
    <App />
    </FilterProvider>
  </React.StrictMode>,
)
