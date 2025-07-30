import { Doc } from "@/convex/_generated/dataModel";
// import Heart from "@/assets/svg/heart.svg";
import Time from "@/assets/svg/time.svg";

export function FeaturedRecipeCard({ recipe }: { recipe: Doc<"recipes"> }) {
  return (
    <li className="p-4 rounded-md bg-latte-1">
      <div className="w-full aspect-video bg-brand-1 rounded-sm mb-3" />
      <h4 className="font-medium">{recipe.title}</h4>
      <p className="text-xs">{recipe.description}</p>
      <div className="flex gap-1 items-center text-xs mt-4">
        <Time /> {recipe.time}
      </div>
    </li>
  );
}

export function RecipeCard({ recipe }: { recipe: Doc<"recipes"> }) {
  return (
    <li className="p-4 rounded-md bg-latte-1 flex gap-3">
      <div className="size-24 aspect-square bg-brand-1 rounded-sm" />
      <div className="flex flex-col gap-3 justify-between">
        <div>
          <h4 className="font-medium">{recipe.title}</h4>
          <p className="text-[10px] leading-tight">{recipe.description}</p>
        </div>
        <div className="flex gap-1 items-center text-xs">
          <Time /> {recipe.time}
        </div>
      </div>
    </li>
  );
}
