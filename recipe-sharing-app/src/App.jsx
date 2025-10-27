import React from 'react'
import AddRecipeForm from './components/AddRecipeForm'
import RecipeList from './components/RecipeList'
import './App.css'

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>🍳 Recipe Sharing App</h1>
        <p>Share and discover amazing recipes with the community</p>
      </header>
      
      <main className="app-main">
        <div className="container">
          <div className="form-section">
            <AddRecipeForm />
          </div>
          
          <div className="list-section">
            <RecipeList />
          </div>
        </div>
      </main>
    </div>
  )
}

export default App