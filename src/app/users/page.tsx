"use client";
import { useEffect, useState } from "react";
import type { RootState } from "../../state/Store";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import PageTitle from "@/components/Page-Title/PageTitle";
import { ErrorComponent } from "@/components/Error/Error";
import { Loader } from "@/components/Loader/Loader";
import { getUsers } from "@/state/users/slice";
import Paginator from "@/components/Paginator/Paginator";
import useAuthGuard from "@/hooks/useAuthGuard";

export default function Users() {
  const dispatch = useAppDispatch();
  useAuthGuard();

  const UsersReducer = useAppSelector((state: RootState) => state.Users);
  const { loading, error, users, pages, total } = UsersReducer;

  const [perPage, setPerPage] = useState(6);
  const [page, setPage] = useState(1);
  const [firstNameStartsFilter, setFirstNameStartsFilter] = useState("G");
  const [lastNameStartsFilter, setLastNameStartsFilter] = useState("W");
  const [showEmail, setShowEmail] = useState(false);

  useEffect(() => {
    dispatch(getUsers({ page, per_page: perPage, maskEmail: !showEmail }));
  }, [page, perPage, showEmail]);

  const filteredUsers = users?.filter((u: any) => {
    /* both filter is empty */
    if (firstNameStartsFilter === "" && lastNameStartsFilter === "") {
      return true;
    } else if (firstNameStartsFilter !== "" && lastNameStartsFilter === "") {
      /* last name filter is empty */
      const fn_filterLength = firstNameStartsFilter.length;
      return (
        u.first_name.toLowerCase().slice(0, fn_filterLength) ===
        firstNameStartsFilter.toLowerCase()
      );
    } else if (firstNameStartsFilter === "" && lastNameStartsFilter !== "") {
      /* first filter is empty */
      const ln_filterLength = lastNameStartsFilter.length;
      return (
        u.last_name.toLowerCase().slice(0, ln_filterLength) ===
        lastNameStartsFilter.toLowerCase()
      );
    } else if (firstNameStartsFilter !== "" && lastNameStartsFilter !== "") {
      /* both filter is filled */
      const fn_filterLength = firstNameStartsFilter.length;
      const ln_filterLength = lastNameStartsFilter.length;
      return (
        u.first_name.toLowerCase().slice(0, fn_filterLength) ===
          firstNameStartsFilter.toLowerCase() ||
        u.last_name.toLowerCase().slice(0, ln_filterLength) ===
          lastNameStartsFilter.toLowerCase()
      );
    }
  });

  return (
    <div className="app_page">
      <PageTitle>Users</PageTitle>
      <div className="app_filters_container">
        <h3 className="app_sub_heading">Filters</h3>
        <div className="input_group">
          <label className="input_label" htmlFor="per_page_filter">
            Per Page
          </label>
          <div className="input_container">
            <input
              className="input_input"
              id="per_page_filter"
              type="number"
              value={String(perPage)}
              onChange={(e) => {
                setPage(1);
                setPerPage(Number(e.target.value));
              }}
            />
          </div>
        </div>
        <h3 className="app_sub_heading">OR Filter</h3>
        <div className="input_group">
          <label className="input_label" htmlFor="first_name_filter">
            First Name starts with
          </label>
          <div className="input_container">
            <input
              className="input_input"
              id="first_name_filter"
              type="text"
              value={firstNameStartsFilter}
              onChange={(e) => {
                setFirstNameStartsFilter(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="input_group">
          <label className="input_label" htmlFor="per_page_filter">
            Last Name starts with
          </label>
          <div className="input_container">
            <input
              className="input_input"
              id="per_page_filter"
              type="text"
              value={lastNameStartsFilter}
              onChange={(e) => {
                setLastNameStartsFilter(e.target.value);
              }}
            />
          </div>
        </div>
      </div>
      {users && users.length > 0 && (
        <div className="app_flex">
          <button
            className="app_button"
            onClick={(e) => {
              e.preventDefault();
              setShowEmail(!showEmail);
            }}
          >
            {showEmail ? "Hide" : "Show"} Email
          </button>
          <Paginator
            currentPage={page}
            onChange={(v) => setPage(v)}
            totalPages={pages || 0}
          />
        </div>
      )}
      <div className="page_list_container">
        {error ? (
          <ErrorComponent error={error} />
        ) : loading ? (
          <Loader />
        ) : filteredUsers && filteredUsers.length > 0 ? (
          filteredUsers?.map((i: any, idx: number) => {
            return (
              <div className="page_list_item" key={`item_key_${idx}`}>
                <div
                  className="app_image_container"
                  style={{
                    marginRight: "25px",
                    width: "120px",
                    height: "120px",
                  }}
                >
                  <img className="app_img" src={i.avatar} alt="sample image" />
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
            );
          })
        ) : (
          <p>No records found on this page.</p>
        )}
      </div>
    </div>
  );
}
