import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";
import fs from "node:fs";
import { uploadBytes, ref } from "firebase/storage";
import { storage } from "@/app/config";
import connectDB from "@/lib/connectDB";
import Recipe from "@/Model/Recipe";

export async function getMeals() {
  //await new Promise((resolve) => setTimeout(resolve, 2000));
  await connectDB();
  const data = await Recipe.find();
  console.log(data);
  return data;
}

export async function getMeal(id) {
  await connectDB();
  const data = await Recipe.findById(id);
  console.log("single meal", id,  data);
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
    image_url: "abac",
  });

  recipe.save().then(async (recipe) => {
    const bufferedImage = await meal.image.arrayBuffer();

    // meal.slug = slugify(meal.title, { lower: true });

    const extension = "jpeg";
    const fileName = `${recipe._id}.${extension}`;
    const storageRef = ref(storage, `images/${fileName}`);
    const metadata = {
      contentType: "image/jpeg",
    };
    uploadBytes(storageRef, bufferedImage, metadata).then((snapshot) => {
      console.log("Uploaded an array!", snapshot);
    });
  });

  // db.prepare(
  //   `
  // INSERT INTO meals (title, summary, instructions, creator, creator_email, image, slug)
  // VALUES (@title, @summary, @instructions, @creator, @creator_email, @image, @slug)
  // `
  // ).run(meal);
}
