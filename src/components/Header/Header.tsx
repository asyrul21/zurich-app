"use client";

import React from "react";
import classnames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

import "./Header.scss";
import useCurrentUser from "@/hooks/useCurrentUser";

const Header = () => {
  const pathname = usePathname();
  const { currentUser, isAuthenticated } = useCurrentUser();

  const containerClasses = classnames({
    container_navbar_container: true,
  });

  const navItemClasses = classnames({
    container_navbar_link: true,
    no_select: true,
  });

  const handleClickLogout = () => {
    signOut({ callbackUrl: "/" });
  };

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
          {isAuthenticated && (
            <Link
              className={classnames(navItemClasses, {
                container_navbar_link_active: pathname === "/users",
              })}
              href="/users"
            >
              Users
            </Link>
          )}
        </div>
        <div className="navbar_right">
          {!isAuthenticated ? (
            <Link
              className={classnames(navItemClasses, {
                container_navbar_link_active: pathname === "/auth",
              })}
              href="/auth"
            >
              Log In
            </Link>
          ) : (
            <>
              <span className="greeting">
                Welcome back, {currentUser?.name?.split(" ")[0]}
              </span>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleClickLogout();
                }}
                className={classnames(navItemClasses, {
                  headerLogoutBtn: true,
                })}
              >
                Log Out
              </button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
