import { getMeal } from "@/lib/meals";
import classes from "./page.module.css";
import Image from "next/image";
import {ref, getDownloadURL } from "firebase/storage";
import { storage } from "@/app/config";

export default async function MealDetailsPage({ params }) {
  console.log("meal detail page" , params);
  const meal = await getMeal(params.id);
  console.log("download image url", meal)
  const url = await getDownloadURL(ref(storage, `images/${meal._id}.jpeg`));

  meal.instructions = meal.instructions.replace(/\n/g, "<br />");
  
  return (
    <>
      <header className={classes.header}>
        <div className={classes.image}>
          <Image src={url} fill alt={meal.title} />
        </div>
        <div className={classes.headerText}>
          <h1>{meal.title}</h1>
          <p className={classes.creator}>
            by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
          </p>
          <p className={classes.summary}>{meal.summary}</p>
        </div>
      </header>
      <main>
        <p
          className={classes.instructions}
          dangerouslySetInnerHTML={{
            __html: meal.instructions,
          }}
        ></p>
      </main>
    </>
  );
}
