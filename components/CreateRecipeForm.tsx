import { useCreateRecipeForm } from "./CreateRecipeFormProvider";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function CreateRecipeForm() {
  const {
    title,
    setTitle,
    description,
    setDescription,
    isSubmitting,
    setIsSubmitting,
    clearForm,
  } = useCreateRecipeForm();

  const createRecipe = useMutation(api.recipes.createRecipe);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const { data, error } = await createRecipe({
      title,
      description,
    });

    if (error) console.log(error);
    if (data) {
      alert(`Recipe with ID ${data} created successfully!`);
    }

    clearForm();
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
          className="bg-latte-2 rounded-md px-3 py-2 text-xs"
        ></textarea>
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
