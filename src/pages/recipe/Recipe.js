import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme";
import { projectFirestore } from "../../firebase/config";

import "./Recipe.css";

export function Recipe() {
  const { id } = useParams();
  const { mode } = useTheme()

  const [recipe, setRecipe] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsPending(true);

    projectFirestore.collection('recipes').doc(id).get().then((doc) => {
      if (doc.exists) {
        setIsPending(false);
        setRecipe(doc.data());
      } else {
        setIsPending(false);
        setError('Não foi possível encontrar esta receita :(')
      }
    })
  }, [id])

  return (
    <div className={`recipe ${mode}`}>
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Carregando...</p>}
      {recipe && (
        <>
          <h2 className="page-title">{recipe.title}</h2>
          <p>Leva {recipe.cookingTime} para preparar.</p>
          {recipe.ingredients.map(ing => (
            <li key={ing}>{ing}</li>
          ))}
          <p className="method">{recipe.method}</p>
        </>
      )}
    </div>
  );
}
