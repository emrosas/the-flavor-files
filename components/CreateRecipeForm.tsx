import { useCreateRecipeForm } from "./CreateRecipeFormProvider";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { timeOptions, unitOptions } from "@/shared/recipeOptions";
import { useState } from "react";

export default function CreateRecipeForm() {
  const {
    title,
    setTitle,
    description,
    setDescription,
    time,
    setTime,
    instructions,
    setInstructions,
    ingredients,
    setIngredients,
    setTemporaryImageUrl,
    isSubmitting,
    setIsSubmitting,
    clearForm,
  } = useCreateRecipeForm();

  const [instructionsInput, setInstructionsInput] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  const initialIngredientsState = {
    name: "",
    quantity: "1",
    unit: "grams",
  };
  const [ingredientsInput, setIngredientsInput] = useState({
    name: "",
    quantity: "1",
    unit: "grams",
  });
  const [quantity, setQuantity] = useState("1");

  const generateUploadUrl = useMutation(api.images.generateUploadUrl);
  const createRecipe = useMutation(api.recipes.createRecipe);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Handle image upload
    const postUrl = await generateUploadUrl();
    const result = await fetch(postUrl, {
      method: "POST",
      headers: { "Content-Type": imageFile!.type },
      body: imageFile,
    });

    const { storageId } = await result.json();

    // Handle recipe creation
    const { data, error } = await createRecipe({
      title,
      description,
      time,
      instructions,
      ingredients,
      image: storageId,
    });

    if (error) console.log(error);
    if (data) {
      alert(`Recipe with ID ${data} created successfully!`);
    }

    clearForm();
  };

  const handleSetInstructions = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setInstructions([...instructions, instructionsInput]);
    setInstructionsInput("");
  };

  const handleSetIngredients = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const quantityFloat = parseFloat(ingredientsInput.quantity);
    setIngredients([
      ...ingredients,
      {
        name: ingredientsInput.name,
        quantity: quantityFloat,
        unit: ingredientsInput.unit,
      },
    ]);
    setIngredientsInput(initialIngredientsState);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const localUrl = URL.createObjectURL(file);
      setTemporaryImageUrl(localUrl);
      setImageFile(file);
    }
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(e.target.value);
    setIngredientsInput({ ...ingredientsInput, quantity: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label className="flex flex-col gap-1 mb-3">
        Title
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Eg. Chocolate Chip Cookies"
          className="bg-latte-2 rounded-md px-3 py-2 text-xs"
        ></input>
      </label>
      <label className="flex flex-col gap-1 mb-3">
        Description
        <textarea
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          placeholder="Eg. These cookies are a classic favorite. They're soft, chewy, and packed with chocolate chips. They're perfect for a sweet treat after a meal or as a snack."
          className="bg-latte-2 rounded-md px-3 py-2 text-xs resize-none"
        ></textarea>
      </label>
      <div className="grid grid-cols-2 gap-4">
        <label className="flex flex-col gap-1 mb-3">
          Time to cook
          <select
            onChange={(e) => {
              const selectedValue = e.target.value as typeof time;
              if (!timeOptions.includes(selectedValue)) {
                console.log("Invalid Time:", selectedValue);
                return;
              }
              setTime(selectedValue);
            }}
            className="bg-latte-2 rounded-md px-3 py-2 text-xs"
          >
            {timeOptions.map((timeOption) => (
              <option key={timeOption} value={timeOption}>
                {timeOption}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1 mb-3">
          Image
          <input
            type="file"
            accept="image/*"
            className="bg-latte-2 rounded-md px-3 py-2 text-xs"
            onChange={handleImageChange}
          ></input>
        </label>
      </div>
      <label className="flex flex-col gap-1 mb-3">
        Instructions
        <div className="flex items-stretch gap-4">
          <input
            type="text"
            name="instructions"
            value={instructionsInput}
            onChange={(e) => setInstructionsInput(e.target.value)}
            placeholder="Eg. In a large bowl, whisk together the flour, sugar, baking powder, baking soda, and salt."
            className="bg-latte-2 rounded-md px-3 py-2 text-xs grow"
          ></input>
          <button
            onClick={handleSetInstructions}
            className="bg-latte-5 hover:bg-latte-4 text-latte-1 rounded-md px-4 pt-[6px] pb-2 font-medium transition"
          >
            Add
          </button>
        </div>
      </label>
      <label className="flex flex-col gap-1 mb-3">
        Ingredients
        <div className="flex items-stretch gap-4">
          <input
            type="text"
            name="ingredients"
            value={ingredientsInput.name}
            onChange={(e) =>
              setIngredientsInput({ ...ingredientsInput, name: e.target.value })
            }
            placeholder="Eg. Flour"
            className="bg-latte-2 rounded-md px-3 py-2 text-xs grow"
          ></input>
          <input
            type="number"
            name="quantity"
            step="0.1"
            value={ingredientsInput.quantity}
            onChange={handleQuantityChange}
            className="bg-latte-2 rounded-md px-3 py-2 text-xs grow"
          ></input>
          <select
            name="unit"
            value={ingredientsInput.unit}
            onChange={(e) =>
              setIngredientsInput({ ...ingredientsInput, unit: e.target.value })
            }
            className="bg-latte-2 rounded-md px-3 py-2 text-xs grow"
          >
            {unitOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <button
            onClick={handleSetIngredients}
            className="bg-latte-5 hover:bg-latte-4 text-latte-1 rounded-md px-4 pt-[6px] pb-2 font-medium transition"
          >
            Add
          </button>
        </div>
      </label>
      <button
        type="submit"
        className={`bg-brand-1 hover:bg-brand-2 text-latte-1 rounded-md px-4 pt-[6px] pb-2 font-medium transition ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        Create
      </button>
    </form>
  );
}
