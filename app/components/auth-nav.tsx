"use client";
import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase-browser";

export default function AuthNav(){
 const [user,setUser]=useState<User|null>(null);
 useEffect(()=>{let active=true;try{const client=supabase();client.auth.getUser().then(({data})=>{if(active)setUser(data.user)});const {data}=client.auth.onAuthStateChange((_event,session)=>setUser(session?.user||null));return()=>{active=false;data.subscription.unsubscribe();};}catch{return;}},[]);
 if(user)return <a className="auth-account-link" href="/account" aria-label="Open your Copper Spoon account"><span>{(user.user_metadata?.full_name||user.email||"A").slice(0,1).toUpperCase()}</span><b>My account</b></a>;
 return <div className="auth-actions"><a href="/login">Log in</a><a className="auth-signup" href="/signup">Sign up</a></div>;
}
