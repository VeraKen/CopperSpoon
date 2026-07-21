"use client";
import { FormEvent, useState } from "react";

export default function NewsletterForm(){
 const [status,setStatus]=useState<"idle"|"loading"|"success"|"error">("idle");
 const [message,setMessage]=useState("");
 async function submit(event:FormEvent<HTMLFormElement>){
  event.preventDefault(); setStatus("loading"); setMessage("");
  const form=new FormData(event.currentTarget);
  try{
   const response=await fetch("/api/subscribe",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:form.get("email"),consent:form.get("consent")==="yes"})});
   const body=await response.json();
   if(!response.ok)throw new Error(body.error||"Please try again.");
   setStatus("success"); setMessage("Welcome to the table! Check your inbox for your first three recipes."); event.currentTarget.reset();
  }catch(error){setStatus("error");setMessage(error instanceof Error?error.message:"Please try again.");}
 }
 return <form className="newsletter-form" onSubmit={submit}>
  <div className="newsletter-fields"><label className="sr-only" htmlFor="email">Email address</label><input id="email" name="email" type="email" autoComplete="email" placeholder="Your email address" required/><button type="submit" disabled={status==="loading"}>{status==="loading"?"Joining…":"Get 3 daily recipes"}</button></div>
  <label className="consent"><input type="checkbox" name="consent" value="yes" required/><span>I agree to receive three Copper Spoon recipes by email every day. I can unsubscribe anytime.</span></label>
  {message&&<p className={`form-message ${status}`} role="status">{message}</p>}
 </form>;
}
