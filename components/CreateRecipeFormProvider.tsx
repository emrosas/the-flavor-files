import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { Doc } from "@/convex/_generated/dataModel";
import { WithoutSystemFields } from "convex/server";

type RecipeForm = WithoutSystemFields<
  Omit<Doc<"recipes">, "author" | "featured">
>;

interface CreateRecipeFormState extends RecipeForm {
  isSubmitting: boolean;
  temporaryImageUrl: string | null;
}

interface CreateRecipeFormContextType extends CreateRecipeFormState {
  setTitle: (title: string) => void;
  setDescription: (description: string) => void;
  setTime: (time: RecipeForm["time"]) => void;
  setInstructions: Dispatch<SetStateAction<RecipeForm["instructions"]>>;
  setIngredients: Dispatch<SetStateAction<RecipeForm["ingredients"]>>;
  setIsSubmitting: Dispatch<SetStateAction<boolean>>;
  setTemporaryImageUrl: Dispatch<SetStateAction<string | null>>;
  clearForm: () => void;
}

const initialFormState: CreateRecipeFormState = {
  title: "",
  description: "",
  instructions: [],
  ingredients: [],
  time: "5 min",
  isSubmitting: false,
  temporaryImageUrl: null,
};

const CreateRecipeFormContext = createContext<
  CreateRecipeFormContextType | undefined
>(undefined);

export function CreateRecipeFormProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [title, setTitle] = useState(initialFormState.title);
  const [description, setDescription] = useState(initialFormState.description);
  const [ingredients, setIngredients] = useState(initialFormState.ingredients);
  const [instructions, setInstructions] = useState(
    initialFormState.instructions,
  );
  const [time, setTime] = useState(initialFormState.time);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [temporaryImageUrl, setTemporaryImageUrl] = useState<string | null>(
    null,
  );

  const clearForm = () => {
    setTitle("");
    setDescription("");
    setIngredients([]);
    setInstructions([]);
    setTime("15-30 min");
    setIsSubmitting(false);
    setTemporaryImageUrl(null);

    // if (isClient) {
    //   localStorage.removeItem("recipeFormState");
    // }
  };

  return (
    <CreateRecipeFormContext.Provider
      value={{
        title,
        setTitle,
        description,
        setDescription,
        ingredients,
        setIngredients,
        instructions,
        setInstructions,
        time,
        setTime,
        temporaryImageUrl,
        setTemporaryImageUrl,
        isSubmitting,
        setIsSubmitting,
        clearForm,
      }}
    >
      {children}
    </CreateRecipeFormContext.Provider>
  );
}

export function useCreateRecipeForm() {
  const context = useContext(CreateRecipeFormContext);
  if (context === undefined) {
    throw new Error(
      "useCreateRecipeForm must be used within a CreateRecipeFormProvider",
    );
  }
  return context;
}

export default CreateRecipeFormProvider;
