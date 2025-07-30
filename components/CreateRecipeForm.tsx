import { useCreateRecipeForm } from "./CreateRecipeFormProvider";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { timeOptions } from "@/shared/timeOptions";
import { useState } from "react";

export default function CreateRecipeForm() {
  const {
    title,
    setTitle,
    description,
    setDescription,
    time,
    setTime,
    isSubmitting,
    setIsSubmitting,
    clearForm,
  } = useCreateRecipeForm();

  const [instructionsInput, setInstructionsInput] = useState("");

  const createRecipe = useMutation(api.recipes.createRecipe);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const { data, error } = await createRecipe({
      title,
      description,
      time,
    });

    if (error) console.log(error);
    if (data) {
      alert(`Recipe with ID ${data} created successfully!`);
    }

    clearForm();
  };

  const handleSetInstructions = () => {};

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
          placeholder="Eg. These cook"
          className="bg-latte-2 rounded-md px-3 py-2 text-xs resize-none"
        ></textarea>
      </label>
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
          <button className="bg-latte-5 hover:bg-latte-4 text-latte-1 rounded-md px-4 pt-[6px] pb-2 font-medium transition">
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
