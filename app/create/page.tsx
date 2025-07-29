"use client";

import Navbar from "@/components/Navbar";
import { CreateRecipeFormProvider } from "@/components/CreateRecipeFormProvider";
import CreateRecipeForm from "@/components/CreateRecipeForm";
import CreateRecipePreview from "@/components/CreateRecipePreview";

export default function Create() {
  return (
    <main>
      <Navbar />
      <CreateRecipeFormProvider>
        <div className="px-8 py-8 grid grid-cols-2 gap-8">
          <div className="flex flex-col">
            <div className="flex -mb-[2px]">
              <h1 className="capitalize font-serif text-2xl font-semibold bg-latte-3 px-4 py-2 rounded-t-xl">
                Create your recipe
              </h1>
            </div>
            <div className="p-4 bg-latte-3 rounded-b-xl rounded-tr-xl">
              <CreateRecipeForm />
            </div>
          </div>
          <CreateRecipePreview />
        </div>
      </CreateRecipeFormProvider>
    </main>
  );
}
