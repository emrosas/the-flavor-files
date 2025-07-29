import { useCreateRecipeForm } from "./CreateRecipeFormProvider";

export default function CreateRecipePreview() {
  const { title, description } = useCreateRecipeForm();
  return (
    <div>
      <div className="px-6 pt-6 pb-5 rounded-lg bg-latte-1 mb-8">
        <div className="aspect-video bg-brand-3 rounded-md mb-2" />
        <h2
          className={`font-medium text-3xl ${title !== "" ? "opacity-100" : "opacity-50"}`}
        >
          {title !== "" ? title : "Your Recipe Name"}
        </h2>
        <p className={`${description !== "" ? "opacity-100" : "opacity-50"}`}>
          {description !== ""
            ? description
            : "Here goes your recipe descriptiom. Keep it short and sweet (under 120 characters)."}
        </p>
      </div>
      <div className="px-6 py-5 rounded-lg bg-latte-1 ">Secondary Card</div>
    </div>
  );
}
