import Link from "next/link";
import Image from "next/image";
import {ref, getDownloadURL } from "firebase/storage";
import { storage } from "@/app/config";
import classes from "./meal-item.module.css";

export default async function MealItem({meal}) {
  console.log("MealItem")
  console.log(meal)

const url = await getDownloadURL(ref(storage, `images/${meal._id}.jpeg`));

  return (
    <article className={classes.meal}>
      <header>
        <div className={classes.image}>
          <Image src={url} alt={meal.title} fill />
        </div>
        <div className={classes.headerText}>
          <h2>{meal.title}</h2>
          <p>by {meal.creator}</p>
        </div>
      </header>
      <div className={classes.content}>
        <p className={classes.summary}>{meal.summary}</p>
        <div className={classes.actions}>
          <Link href={`/meals/${meal._id}`}>View Details</Link>
        </div>
      </div>
    </article>
  );
}
