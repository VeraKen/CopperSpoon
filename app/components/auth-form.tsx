"use client";
import { FormEvent, useState } from "react";
import { supabase } from "../lib/supabase-browser";

export default function AuthForm({mode}:{mode:"login"|"signup"}){
 const signup=mode==="signup";const [status,setStatus]=useState<"idle"|"loading"|"success"|"error">("idle");const [message,setMessage]=useState("");
 async function submit(event:FormEvent<HTMLFormElement>){
  event.preventDefault();setStatus("loading");setMessage("");const data=new FormData(event.currentTarget);const email=String(data.get("email")||"").trim();const password=String(data.get("password")||"");const name=String(data.get("name")||"").trim();
  if(!email||password.length<6){setStatus("error");setMessage("Enter a valid email and a password with at least 6 characters.");return;}
  try{const client=supabase();if(signup){const result=await client.auth.signUp({email,password,options:{data:{full_name:name},emailRedirectTo:`${window.location.origin}/account`}});if(result.error)throw result.error;setStatus("success");setMessage(result.data.session?"Your account is ready. Opening it now…":"Account created! Check your email to confirm your address.");if(result.data.session)window.location.assign("/account");}else{const result=await client.auth.signInWithPassword({email,password});if(result.error)throw result.error;setStatus("success");setMessage("Welcome back! Opening your account…");window.location.assign("/account");}}
  catch(error){setStatus("error");setMessage(error instanceof Error?error.message:"We could not complete that request.");}
 }
 async function google(){setStatus("loading");setMessage("");try{const result=await supabase().auth.signInWithOAuth({provider:"google",options:{redirectTo:`${window.location.origin}/account`}});if(result.error)throw result.error;}catch(error){setStatus("error");setMessage(error instanceof Error?error.message:"Google sign-in could not start.");}}
 return <div className="auth-card"><button className="google-auth" type="button" onClick={google} disabled={status==="loading"}><span>G</span> Continue with Google</button><div className="auth-divider"><span>or use your email</span></div><form onSubmit={submit} noValidate>{signup&&<label>Full name<input name="name" type="text" autoComplete="name" placeholder="Your name" required/></label>}<label>Email address<input name="email" type="email" autoComplete="email" placeholder="you@gmail.com" required/></label><label>Password<input name="password" type="password" autoComplete={signup?"new-password":"current-password"} placeholder="At least 6 characters" minLength={6} required/></label><button className="button auth-submit" disabled={status==="loading"}>{status==="loading"?"Please wait…":signup?"Create my account":"Log in"}</button></form>{message&&<p className={`auth-message ${status}`} role="status">{message}</p>}<p className="auth-switch">{signup?"Already have an account?":"New to The Copper Spoon?"} <a href={signup?"/login":"/signup"}>{signup?"Log in":"Sign up"}</a></p></div>;
}
