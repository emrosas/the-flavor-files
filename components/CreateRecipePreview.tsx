import { useCreateRecipeForm } from "./CreateRecipeFormProvider";
import Time from "@/assets/svg/time.svg";

export default function CreateRecipePreview() {
  return (
    <div>
      <PreviewCard />
      <PreviewExtra />
    </div>
  );
}

function PreviewCard() {
  const { title, description, time } = useCreateRecipeForm();

  return (
    <div className="px-6 pt-6 pb-5 rounded-lg bg-latte-1 mb-8">
      <div className="aspect-video bg-brand-3 rounded-md mb-2" />
      <h2
        className={`font-medium text-3xl ${title !== "" ? "opacity-100" : "opacity-50"}`}
      >
        {title !== "" ? title : "Your Recipe Name"}
      </h2>
      <p
        className={`${description !== "" ? "opacity-100" : "opacity-50"} mb-4`}
      >
        {description !== ""
          ? description
          : "Here goes your recipe descriptiom. Keep it short and sweet (under 120 characters)."}
      </p>
      <div>
        <div className="flex items-center gap-2">
          <Time />
          <p>{time}</p>
        </div>
      </div>
    </div>
  );
}

function PreviewExtra() {
  const { ingredients, instructions } = useCreateRecipeForm();
  return (
    <div className="px-6 py-5 rounded-lg bg-latte-1 flex gap-4">
      <div className="grow">
        <h3 className="text-xl font-semibold font-serif">Ingredients</h3>
        {ingredients && ingredients.length > 0 ? (
          <ul>
            {ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        ) : (
          <p className="opacity-50">No ingredients added yet.</p>
        )}
      </div>
      <div className="grow">
        <h3 className="text-xl font-semibold font-serif">Instructions</h3>
        {instructions && instructions.length > 0 ? (
          <ol>
            {instructions.map((instruction, index) => (
              <li key={index}>{instruction}</li>
            ))}
          </ol>
        ) : (
          <p className="opacity-50">No instructions added yet.</p>
        )}
      </div>
    </div>
  );
}
