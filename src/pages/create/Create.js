import { useState, useEffect, useRef } from 'react'
import { useHistory } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';

import './Create.css';

export function Create() {
  const [title, setTitle] = useState('');
  const [method, setMethod] = useState('');
  const [cookingTime, setCookingTime] = useState('');
  const [newIngredient, setNewIngredient] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const ingredientInput = useRef(null)
  const { postData, data, error } = useFetch('http://localhost:3000/recipes', "POST")
  const history = useHistory();

  useEffect(() => {
    if (data) {
      history.push("/");
    }
  }, [data])

  const handleSubmit = e => {
    e.preventDefault();
    postData({ title, ingredients, method, cookingTime: cookingTime + ' minutes' })
  }

  const handleAdd = e => {
    e.preventDefault();
    const ing = newIngredient.trim();

    if (ing && !ingredients.includes(ing)) {
      setIngredients(prevIngredients => [...prevIngredients, newIngredient])
    }
    setNewIngredient('')
    ingredientInput.current.focus()
  }

  return (
    <div className="create">
      <h1 className="page-title">Add a new recipe</h1>

      <form onSubmit={handleSubmit}>

        <label>
          <span>Recipe title:</span>
          <input type="text" onChange={e => setTitle(e.target.value)} value={title} required />
        </label>

        <label>
          <span>Recipe Ingredients:</span>
          <div className="ingredients">
            <input
              type="text"
              onChange={e => setNewIngredient(e.target.value)}
              value={newIngredient}
              ref={ingredientInput}
            />
            <button className="btn" onClick={e => handleAdd(e)} >Add</button>
          </div>
        </label>
        <p>Ingredients: {ingredients.map(i => (<em key={i}>{i}, </em>))}</p>

        <label>
          <span>Recipe method:</span>
          <textarea onChange={e => setMethod(e.target.value)} value={method} required />
        </label>

        <label>
          <span>Cooking time:</span>
          <input type="number" onChange={e => setCookingTime(e.target.value)} value={cookingTime} required />
        </label>

        <button className="btn">Enviar</button>

      </form>
    </div>
  )
}