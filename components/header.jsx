import { SignedIn, SignedOut,   SignInButton, UserButton } from "@clerk/nextjs"
import Image from "next/image"
import Link from "next/link"
import { Button } from "./ui/button"
import { PenBox } from "lucide-react"
import UserMenu from "./user-menu"
import { checkUser } from "@/lib/checkUser";
import UserLoading from "./user-loading";

async function Header() {
  await checkUser();

  return (
    <header className="container mx-auto"> 
      <nav className="py-6 px-4 flex justify-between items-center">
        <Link  href="/" >
        <Image className="h-10 w-auto object-contain" width={30} height={50} src={'/p-i-vedant.png'} alt=""/>
        </Link>

     <div className="flex gap-2 items-center">
      <Link href='/project/create'>
      <Button className="flex gap-2 items-center" variant="destructive" >
        <PenBox size={18}/>
        <span>Create project</span>
      </Button>
      </Link> 
        <SignedOut>
           <SignInButton forceRedirectUrl="/onboarding">
           <Button variant="outline">Login</Button>
           </SignInButton>
        </SignedOut>
        <SignedIn>
             <UserMenu/>
        </SignedIn>
        </div>
         </nav>
         <UserLoading/>
    </header>
  )
}

export default Header