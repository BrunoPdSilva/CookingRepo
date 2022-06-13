import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { useTheme } from "../../hooks/useTheme";

import "./Recipe.css";

export function Recipe() {
  const { id } = useParams();
  const { data: recipe, isPending, error } = useFetch(`http://localhost:3000/recipes/${id}`);
  const { mode } = useTheme()

  return (
    <div className={`recipe ${mode}`}>
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Loading...</p>}
      {recipe && (
        <>
          <h2 className="page-title">{recipe.title}</h2>
          <p>Takes {recipe.cookingTime} to cook.</p>
          {recipe.ingredients.map(ing => (
            <li key={ing}>{ing}</li>
          ))}
          <p className="method">{recipe.method}</p>
        </>
      )}
    </div>
  );
}
