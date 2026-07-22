"use client";
import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase-browser";

export default function AuthNav(){
 const [user,setUser]=useState<User|null|undefined>(undefined);
 useEffect(()=>{
  let active=true;
  let removeListeners=()=>{};
  try{
   const client=supabase();
   const syncSession=async()=>{
    const {data}=await client.auth.getSession();
    if(active)setUser(data.session?.user||null);
   };
   syncSession().catch(()=>{if(active)setUser(null);});
   const {data}=client.auth.onAuthStateChange((_event,session)=>{
    if(active)setUser(session?.user||null);
   });
   const refresh=()=>{if(document.visibilityState==="visible")syncSession().catch(()=>{});};
   const restore=()=>{syncSession().catch(()=>{});};
   document.addEventListener("visibilitychange",refresh);
   window.addEventListener("pageshow",restore);
   removeListeners=()=>{
    data.subscription.unsubscribe();
    document.removeEventListener("visibilitychange",refresh);
    window.removeEventListener("pageshow",restore);
   };
  }catch{setUser(null);}
  return()=>{active=false;removeListeners();};
 },[]);
 if(user===undefined)return null;
 if(user)return <a className="auth-account-link" href="/account" aria-label="Open your Copper Spoon account"><span>{(user.user_metadata?.full_name||user.email||"A").slice(0,1).toUpperCase()}</span><b>My account</b></a>;
 return <div className="auth-actions"><a href="/login">Log in</a><a className="auth-signup" href="/signup">Sign up</a></div>;
}
