"use client";
import { useEffect, useState } from "react";
import type { RootState } from "../../state/Store";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import PageTitle from "@/components/Page-Title/PageTitle";
import { ErrorComponent } from "@/components/Error/Error";
import { Loader } from "@/components/Loader/Loader";
import { getUsers, toggleShowEmailByUserId } from "@/state/users/slice";
import useAuthGuard from "@/hooks/useAuthGuard";

export default function Users() {
  const dispatch = useAppDispatch();
  useAuthGuard();

  const UsersReducer = useAppSelector((state: RootState) => state.Users);
  const { loading, error, users } = UsersReducer;

  useEffect(() => {
    dispatch(getUsers({}));
  }, []);

  const handleShowEmailsFor = (userId: number, value: boolean) => {
    dispatch(toggleShowEmailByUserId({ userId, showEmail: value }));
  };

  return (
    <div className="app_page">
      <PageTitle>Users</PageTitle>
      <div className="page_list_container">
        {error ? (
          <ErrorComponent error={error} />
        ) : loading ? (
          <Loader />
        ) : users && users.length > 0 ? (
          users?.map((i: any, idx: number) => {
            return (
              <div className="page_list_item" key={`item_key_${idx}`}>
                <div className="page_list_item_user">
                  <div
                    className="app_image_container"
                    style={{
                      marginRight: "25px",
                      width: "120px",
                      height: "120px",
                    }}
                  >
                    <img
                      className="app_img"
                      src={i.avatar}
                      alt="sample image"
                    />
                  </div>
                  <div>
                    <p className="key_value_group">
                      <span>ID: </span>
                      <span style={{ fontWeight: "bold" }}>{i.id}</span>
                    </p>
                    <p className="key_value_group">
                      <span>First Name: </span>
                      <span style={{ fontWeight: "bold" }}>{i.first_name}</span>
                    </p>
                    <p className="key_value_group">
                      <span>Last Name: </span>
                      <span style={{ fontWeight: "bold" }}>{i.last_name}</span>
                    </p>
                    <p className="key_value_group">
                      <span>Email: </span>
                      <span style={{ fontWeight: "bold" }}>{i.email}</span>
                    </p>
                  </div>
                </div>
                <button
                  className="app_button"
                  onClick={(e) => {
                    e.preventDefault();
                    handleShowEmailsFor(i.id, i.emailMasked);
                  }}
                >
                  {i.emailMasked ? "Show" : "Hide"} Email
                </button>
              </div>
            );
          })
        ) : (
          <p>No records found on this page.</p>
        )}
      </div>
    </div>
  );
}
