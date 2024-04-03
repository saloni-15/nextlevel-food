import { uploadBytes, ref } from "firebase/storage";
import { storage } from "@/app/config";
import connectDB from "@/lib/connectDB";
import Recipe from "@/Model/Recipe";

export async function getMeals() {
  //await new Promise((resolve) => setTimeout(resolve, 2000));
  await connectDB();
  const data = await Recipe.find();
  return data;
}

export async function getMeal(id) {
  await connectDB();
  const data = await Recipe.findById(id);
  return data;
}

export async function saveMeal(meal) {
  await connectDB();

  const recipe = new Recipe({
    title: meal.title,
    instructions: meal.instructions,
    summary: meal.summary,
    creator: meal.creator,
    creator_email: meal.creator_email,
  });

  const rcp = await recipe.save();
  const bufferedImage = await meal.image.arrayBuffer();
  const extension = "jpeg";
  const fileName = `${rcp._id}.${extension}`;
  const storageRef = ref(storage, `images/${fileName}`);
  const metadata = {
    contentType: "image/jpeg",
  };
  await uploadBytes(storageRef, bufferedImage, metadata);
}
