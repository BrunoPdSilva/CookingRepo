import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Navbar } from './components/Navbar';
import { Home } from './pages/home/Home'
import { Recipe } from './pages/recipe/Recipe'
import { Search } from './pages/search/Search'
import { Create } from './pages/create/Create'
import { useTheme } from './hooks/useTheme';
import { ThemeSelector } from './components/ThemeSelector';

import './App.css'
import './components/ThemeSelector'

function App() {

  const { mode } = useTheme()

  return (
    <div className={`App ${mode}`}>
      <BrowserRouter>
        <Navbar />
        <ThemeSelector />
        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/recipes/:id" element={<Recipe />} />
          <Route path="/create" element={<Create />} />
          <Route path="/search" element={<Search />} />

        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App
