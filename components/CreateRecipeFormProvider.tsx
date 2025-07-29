import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { Doc } from "@/convex/_generated/dataModel";

type RecipeForm = Omit<
  Doc<"recipes">,
  "_id" | "_creationTime" | "author" | "featured"
>;

interface CreateRecipeFormState extends RecipeForm {
  isSubmitting: boolean;
}

interface CreateRecipeFormContextType extends CreateRecipeFormState {
  setTitle: (title: string) => void;
  setDescription: (description: string) => void;
  setTime: (time: RecipeForm["time"]) => void;
  setInstructions: Dispatch<SetStateAction<RecipeForm["instructions"]>>;
  setIngredients: Dispatch<SetStateAction<RecipeForm["ingredients"]>>;
  setIsSubmitting: Dispatch<SetStateAction<boolean>>;
  clearForm: () => void;
}

const initialFormState: CreateRecipeFormState = {
  title: "",
  description: "",
  instructions: [],
  ingredients: [],
  time: "15-30 min",
  isSubmitting: false,
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

  const clearForm = () => {
    setTitle("");
    setDescription("");
    setIngredients([]);
    setInstructions([]);
    setTime("15-30 min");
    setIsSubmitting(false);

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
