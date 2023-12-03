"use client";

import React from "react";
import classnames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";

import "./Header.scss";

const Header = () => {
  const pathname = usePathname();

  const containerClasses = classnames({
    container_navbar_container: true,
  });

  const navItemClasses = classnames({
    container_navbar_link: true,
    no_select: true,
  });

  console.log("pathname:", pathname);
  return (
    <header className="app_header" data-testid="header-root">
      <nav className={containerClasses}>
        <div className="navbar_left">
          <Link className="nav_title" href="/">
            ZurichApp
          </Link>
          <Link
            data-testid="nav-link-about"
            className={classnames(navItemClasses, {
              container_navbar_link_active: pathname === "/about",
            })}
            href="/about"
          >
            About
          </Link>
          <Link
            className={classnames(navItemClasses, {
              container_navbar_link_active: pathname === "/users",
            })}
            href="/users"
          >
            Users
          </Link>
        </div>
        <div className="navbar_right">
          <Link
            className={classnames(navItemClasses, {
              container_navbar_link_active: pathname === "/auth",
            })}
            href="/auth"
          >
            Log In
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
