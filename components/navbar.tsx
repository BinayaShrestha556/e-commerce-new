import Link from "next/link";
import Container from "./ui/container";
import MainNav from "./main-nav";
import getCategories from "@/actions/get-categorirs";
import NavbarActions from "./navbar-actions";

const Navbar =async () => {
  const categories=await getCategories();
 
  return (
    <div className="border-b">
      <Container >
        <div className=" px-4 sm:px-8 flex h-16 items-center">
        <Link href='/' className="ml-4 flex lg:ml-0 gap-x-2">
          <p className="font-bold text-3xl">STORE</p>
        </Link>
        <MainNav data={categories}/>
        <NavbarActions data={categories}/>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
