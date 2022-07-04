import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { projectFirestore } from "../../firebase/config";
import { useFetch } from "../../hooks/useFetch";

import "./Create.css";

export function Create() {
  const [title, setTitle] = useState("");
  const [method, setMethod] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [newIngredient, setNewIngredient] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const ingredientInput = useRef(null);
  
  const { postData, data } = useFetch('http://localhost:3000/recipes', 'POST')
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    const doc = {
      title,
      ingredients,
      method,
      cookingTime: cookingTime + " minutes",
    };

    try {
      await projectFirestore.collection("recipes").add(doc);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const handleAdd = e => {
    e.preventDefault();
    const ing = newIngredient.trim();

    if (ing && !ingredients.includes(ing)) {
      setIngredients(prevIngredients => [...prevIngredients, newIngredient]);
    }
    setNewIngredient("");
    ingredientInput.current.focus();
  };

  useEffect(() => {
    if (data) {
      navigate("/");
    }
  }, [data, navigate]);

  return (
    <div className="create">
      <h1 className="page-title">Adicione uma nova receita</h1>

      <form onSubmit={handleSubmit}>
        <label>
          <span>Nome da Receita:</span>
          <input
            type="text"
            onChange={e => setTitle(e.target.value)}
            value={title}
            required
          />
        </label>

        <label>
          <span>Ingredientes:</span>
          <div className="ingredients">
            <input
              type="text"
              onChange={e => setNewIngredient(e.target.value)}
              value={newIngredient}
              ref={ingredientInput}
            />
            <button className="btn" onClick={e => handleAdd(e)}>
              Adicionar
            </button>
          </div>
        </label>
        <p>
          {ingredients.map(i => (
            <em key={i}>{i}, </em>
          ))}
        </p>

        <label>
          <span>Modo de preparo:</span>
          <textarea
            onChange={e => setMethod(e.target.value)}
            value={method}
            required
          />
        </label>

        <label>
          <span>Tempo de preparo:</span>
          <input
            type="number"
            onChange={e => setCookingTime(e.target.value)}
            value={cookingTime}
            required
          />
        </label>

        <button className="btn">Enviar</button>
      </form>
    </div>
  );
}
