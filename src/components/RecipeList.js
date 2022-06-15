import { Link } from 'react-router-dom'
import { useTheme } from '../hooks/useTheme'
import { projectFirestore } from '../firebase/config'
import trashcan from '../assets/trashcan.svg'

import './RecipeList.css'

export function RecipeList({ recipes }) {

  const { mode } = useTheme()

  if (recipes.length === 0) {
    return <div className="error">No recipes to load...</div>
  }

  const handleDelete = id => {
    projectFirestore.collection('recipes').doc(id).delete()
  }

  return (
    <div className='recipe-list'>
      {recipes.map(recipe => (
        <div key={recipe.id} className={`card ${mode}`}>
          <h3>{recipe.title}</h3>
          <p>{recipe.cookingTime} para preparar.</p>
          <div>{recipe.method.substring(0, 100)}...</div>
          <Link to={`/recipes/${recipe.id}`}>Ver receita</Link>
          <img src={trashcan} alt="Botão de deletar receitas" className='delete' onClick={() => handleDelete(recipe.id)}/>
        </div>
      ))}

    </div>
  )
}