// SVG Imports
import Time from "@/assets/svg/time.svg";
import User from "@/assets/svg/user.svg";
import Heart from "@/assets/svg/heart.svg";

import Image from "next/image";

import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";

import { useCreateRecipeForm } from "./CreateRecipeFormProvider";

export default function CreateRecipePreview() {
  return (
    <div>
      <PreviewCard />
      <PreviewExtra />
    </div>
  );
}

function PreviewCard() {
  const user = useQuery(api.users.currentUser);
  const { title, description, time, temporaryImageUrl } = useCreateRecipeForm();

  return (
    <div className="px-6 pt-6 pb-5 rounded-xl bg-latte-1 mb-8">
      <div className="aspect-video bg-brand-3 rounded-md mb-2 relative">
        {temporaryImageUrl && (
          <Image
            src={temporaryImageUrl}
            alt="Recipe Image"
            fill
            className="object-cover rounded-md absolute inset-0"
          />
        )}
      </div>
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
          : "Here goes your recipe description. Keep it short (under 120 characters), and tell us what makes it special."}
      </p>
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <User />
          <p>{user?.username}</p>
        </div>
        <div className="flex items-center gap-2">
          <Time />
          <p>{time}</p>
        </div>
        <div className="flex items-center gap-2">
          <Heart />
          <p>1</p>
        </div>
      </div>
    </div>
  );
}

function PreviewExtra() {
  const { ingredients, instructions } = useCreateRecipeForm();
  return (
    <div className="px-6 py-5 rounded-xl bg-latte-1 grid grid-cols-2 gap-4">
      <div className="grow">
        <h3 className="text-xl font-semibold font-serif mb-2">Ingredients</h3>
        {ingredients && ingredients.length > 0 ? (
          <ul className="list-disc">
            {ingredients.map((ingredient, index) => (
              <li className="ml-4 gap-4" key={index}>
                <div className="flex item-center justify-between">
                  <p>{ingredient.name}</p>
                  <div className="grid grid-cols-2 gap-1">
                    <p className="font-medium text-right text-sm">
                      {ingredient.quantity}
                    </p>
                    <p className="text-[8px] mt-[2px] opacity-50">
                      {ingredient.unit}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="opacity-50">No ingredients added yet.</p>
        )}
      </div>
      <div className="grow">
        <h3 className="text-xl font-semibold font-serif mb-2">Instructions</h3>
        {instructions && instructions.length > 0 ? (
          <ol className="list-decimal">
            {instructions.map((instruction, index) => (
              <li className="ml-4" key={index}>
                {instruction}
              </li>
            ))}
          </ol>
        ) : (
          <p className="opacity-50">No instructions added yet.</p>
        )}
      </div>
    </div>
  );
}
