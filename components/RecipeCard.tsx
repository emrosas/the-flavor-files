import Image from "next/image";
// import Heart from "@/assets/svg/heart.svg";
// import User from "@/assets/svg/user.svg";
import Time from "@/assets/svg/time.svg";
import { RecipeWithImage } from "@/convex/recipes";

export function FeaturedRecipeCard({ recipe }: { recipe: RecipeWithImage }) {
  return (
    <li className="p-4 rounded-md flex flex-col bg-latte-1">
      <div className="w-full aspect-video bg-brand-1 rounded-sm mb-3 relative overflow-clip">
        {recipe.imageUrl && (
          <Image
            src={recipe.imageUrl}
            alt={recipe.title}
            fill
            className="absolute inset-0 object-cover"
          />
        )}
      </div>
      <h4 className="font-medium">{recipe.title}</h4>
      <p className="text-xs">{recipe.description}</p>
      <div className="grow flex items-end mt-4">
        <div className="flex items-center text-xs">
          <Time className="scale-80" /> {recipe.time}
        </div>
      </div>
    </li>
  );
}

export function RecipeCard({ recipe }: { recipe: RecipeWithImage }) {
  return (
    <li className="p-4 rounded-md bg-latte-1 flex gap-3">
      <div className="size-24 aspect-square bg-brand-1 rounded-sm relative overflow-clip">
        {recipe.imageUrl && (
          <Image
            src={recipe.imageUrl}
            alt={recipe.title}
            fill
            className="absolute inset-0 object-cover"
          />
        )}
      </div>
      <div className="flex flex-col gap-3 justify-between">
        <div>
          <h4 className="font-medium">{recipe.title}</h4>
          <p className="text-[10px] leading-tight">{recipe.description}</p>
        </div>
        <div className="grow flex items-end mt-4">
          {/*<div className="flex items-center text-xs">
            <User className="scale-80" /> {recipe.author}
          </div>*/}
          <div className="flex items-center text-xs">
            <Time className="scale-80" /> {recipe.time}
          </div>
        </div>
      </div>
    </li>
  );
}
