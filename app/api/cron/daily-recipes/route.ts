import { NextResponse } from "next/server";
import { recipes } from "../../../data/recipes";
import { dailyRecipesHtml, resend, unsubscribeUrl } from "../../../lib/email";

export const maxDuration=60;
export async function GET(request:Request){
 if(request.headers.get("authorization")!==`Bearer ${process.env.CRON_SECRET}`)return NextResponse.json({error:"Unauthorized"},{status:401});
 if(!process.env.RESEND_API_KEY||!process.env.MAIL_FROM||!process.env.SITE_URL)return NextResponse.json({error:"Email service is not configured."},{status:503});
 const contactsResponse=await resend("/contacts"); if(!contactsResponse.ok)return NextResponse.json({error:"Could not load subscribers."},{status:502});
 const contactsData=await contactsResponse.json() as {data?:Array<{email:string;unsubscribed:boolean}>};
 const contacts=(contactsData.data||[]).filter(c=>!c.unsubscribed);
 const day=Math.floor(Date.now()/86400000);const picks=[0,1,2].map(offset=>recipes[(day*3+offset)%recipes.length]);
 let sent=0,failed=0;
 for(let i=0;i<contacts.length;i+=10){const batch=contacts.slice(i,i+10);const results=await Promise.all(batch.map(c=>resend("/emails",{method:"POST",body:JSON.stringify({from:process.env.MAIL_FROM,to:[c.email],subject:`Today's 3 Copper Spoon recipes`,html:dailyRecipesHtml(picks,c.email),headers:{"List-Unsubscribe":`<${unsubscribeUrl(c.email)}>`}})})));results.forEach(r=>r.ok?sent++:failed++);}
 return NextResponse.json({ok:true,subscribers:contacts.length,sent,failed,recipes:picks.map(r=>r.title)});
}
