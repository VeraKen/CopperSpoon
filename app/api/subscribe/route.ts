import { NextResponse } from "next/server";
import { recipes } from "../../data/recipes";
import { dailyRecipesHtml, resend, unsubscribeUrl } from "../../lib/email";

const emailPattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export async function POST(request:Request){
 if(!process.env.RESEND_API_KEY||!process.env.MAIL_FROM||!process.env.SITE_URL||!process.env.UNSUBSCRIBE_SECRET)return NextResponse.json({error:"Email delivery is not active yet. The site owner must add the Resend settings in Vercel."},{status:503});
 let body:{email?:unknown;consent?:unknown};try{body=await request.json();}catch{return NextResponse.json({error:"Invalid request."},{status:400});}
 const email=String(body.email||"").trim().toLowerCase();
 if(!emailPattern.test(email))return NextResponse.json({error:"Enter a valid email address."},{status:400});
 if(body.consent!==true)return NextResponse.json({error:"Please agree to receive the daily recipes."},{status:400});
 let contact=await resend("/contacts",{method:"POST",body:JSON.stringify({email,unsubscribed:false})});
 if(contact.status===409)contact=await resend(`/contacts/${encodeURIComponent(email)}`,{method:"PATCH",body:JSON.stringify({unsubscribed:false})});
 if(!contact.ok){const detail=await contact.json().catch(()=>null) as {message?:string}|null;console.error("Resend contact error",contact.status,detail?.message||"Unknown error");return NextResponse.json({error:"We could not save your subscription. Please try again shortly."},{status:502});}
 const firstThree=recipes.slice(0,3);
 const sent=await resend("/emails",{method:"POST",body:JSON.stringify({from:process.env.MAIL_FROM,to:[email],subject:"Welcome — your first 3 Copper Spoon recipes",html:dailyRecipesHtml(firstThree,email),headers:{"List-Unsubscribe":`<${unsubscribeUrl(email)}>`}})});
 if(!sent.ok){const detail=await sent.json().catch(()=>null) as {message?:string}|null;console.error("Resend email error",sent.status,detail?.message||"Unknown error");return NextResponse.json({error:"Your address was saved, but email delivery failed. Please check the sender-domain settings in Vercel."},{status:502});}
 return NextResponse.json({ok:true});
}
