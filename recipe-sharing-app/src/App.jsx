import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AddRecipeForm from './components/AddRecipeForm'
import RecipeList from './components/RecipeList'
import RecipeDetails from './components/RecipeDetails'
import EditRecipeForm from './components/EditRecipeForm'
import SearchBar from './components/SearchBar'
import FilterPanel from './components/FilterPanel'
import FavoritesList from './components/FavoritesList'
import RecommendationsList from './components/RecommendationsList'
import './App.css'

function App() {
  return (
    <Router>
      <div className="app">
        <header className="app-header">
          <h1>🍳 Recipe Sharing App</h1>
          <p>Share and discover amazing recipes with the community</p>
        </header>
        
        <main className="app-main">
          <Routes>
            <Route path="/" element={
              <div className="app-layout">
                <div className="sidebar">
                  <AddRecipeForm />
                  <FavoritesList />
                  <RecommendationsList />
                </div>
                
                <div className="main-content">
                  <div className="search-filters-container">
                    <SearchBar />
                    <FilterPanel />
                  </div>
                  <RecipeList />
                </div>
              </div>
            } />
            <Route path="/recipe/:id" element={<RecipeDetails />} />
            <Route path="/edit/:id" element={<EditRecipeForm />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App