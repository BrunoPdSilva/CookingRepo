import { BrowserRouter, Route, Switch } from 'react-router-dom';

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
        <Switch>

          <Route exact path="/">
            <Home />
          </Route>

          <Route path="/recipes/:id">
            <Recipe />
          </Route>

          <Route path="/create">
            <Create />
          </Route>

          <Route path="/search">
            <Search />
          </Route>

        </Switch>
      </BrowserRouter>

    </div>
  );
}

export default App
