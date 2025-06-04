import { NavLink } from "react-router";
import { clsx } from "clsx";

export function Navigation() {
  return (
    <nav className="flex flex-row text-2xl justify-around m-auto w-full">
      <NavItem name="Kundesøk" path="/" />
      <NavItem name="Mine kunder" path="kunder" />
    </nav>
  );
}

type NavItemsProps = {
  name: string;
  path: string;
};
function NavItem({ name, path }: NavItemsProps) {
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        clsx(
          "rounded-full p-2 m-2 cursor-pointer",
          isActive
            ? "bg-palette-dark text-palette-light"
            : "hover:bg-palette-dark hover:text-palette-light"
        )
      }
    >
      {name}
    </NavLink>
  );
}
