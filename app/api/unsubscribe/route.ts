import { NextResponse } from "next/server";
import { resend, validToken } from "../../lib/email";
import { reportError, reportInfo } from "../../lib/monitoring";

export async function GET(request:Request){
 const url=new URL(request.url);const email=(url.searchParams.get("email")||"").toLowerCase();const token=url.searchParams.get("token")||"";
 if(!email||!validToken(email,token))return new NextResponse("This unsubscribe link is invalid.",{status:400,headers:{"Content-Type":"text/plain"}});
 try{
  const response=await resend(`/contacts/${encodeURIComponent(email)}`,{method:"PATCH",body:JSON.stringify({unsubscribed:true})});
  if(!response.ok){reportError("newsletter.unsubscribe","Provider rejected unsubscribe",{status:response.status});return new NextResponse("We could not unsubscribe this address. Please try again.",{status:502,headers:{"Content-Type":"text/plain"}});}
  reportInfo("newsletter.unsubscribed",{success:true});
  return new NextResponse("You have been unsubscribed from The Copper Spoon daily recipes.",{headers:{"Content-Type":"text/plain"}});
 }catch(error){
  reportError("newsletter.unsubscribe-network",error);
  return new NextResponse("The email service is temporarily unavailable. Please try again.",{status:503,headers:{"Content-Type":"text/plain"}});
 }
}
