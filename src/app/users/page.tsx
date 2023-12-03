"use client";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import PageTitle from "@/components/Page-Title/PageTitle";
import { ErrorComponent } from "@/components/Error/Error";
import { Loader } from "@/components/Loader/Loader";
import { getUsers } from "@/state/users/actions";

export default function Users() {
  const dispatch = useAppDispatch();
  const getUsersReducer = useAppSelector((state: any) => state.getUsers);
  const { loading, error, users, pages } = getUsersReducer;

  const [perPage, setPerPage] = useState(6);
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  useEffect(() => {
    dispatch(getUsers({ page, per_page: perPage }));
  }, [page, perPage]);

  // const error = "yo";
  // const loading = true;
  // const items = [{ name: "john" }];
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
              onChange={(e) => setPerPage(Number(e.target.value))}
            />
          </div>
        </div>
      </div>
      <div className="page_list_container">
        {error ? (
          <ErrorComponent error={error} />
        ) : loading ? (
          <Loader />
        ) : (
          users?.map((i: any, idx: number) => {
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
        )}
      </div>
    </div>
  );
}
