"use client";
import { useFormStatus } from "react-dom";

export default function MealsFormSubmit() {
  console.log("MealsFormSubmit");
  const { pending } = useFormStatus();
  return (
    <button disabled={pending}>
      {pending ? "Submitting..." : "Share Meal"}
    </button>
  );
}
