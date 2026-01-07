import { Link } from "react-router-dom";

const links = [
  {
    label: "Become a seller",
    href: "/",
  },
  {
    label: "About Us",
    href: "/",
  },
  {
    label: "Free Delivery",
    href: "/",
  },
  {
    label: "Returns Policy",
    href: "/",
  },
];

export default function TopHeader() {
  return (
    <div className="flex justify-between bg-[#299e60] text-white px-10 py-1">
      <div className="flex gap-4">
        {links.map((link) => (
          <div key={link.label}>
            <Link to={link.href}>{link.label}</Link>
          </div>
        ))}
      </div>
      <div className="flex gap-4">
        <Link to="/">Login</Link>
        <Link to="/">Signup</Link>
      </div>
    </div>
  );
}
