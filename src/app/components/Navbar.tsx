import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="p-4 bg-blue-600 text-white flex justify-between">
      <h1 className="text-xl font-bold">Student Portal</h1>
      <Link href="/application/list">Applications</Link>
      
      <Link href="/application/new">New Application</Link>
    </nav>
  );
};

export default Navbar;
