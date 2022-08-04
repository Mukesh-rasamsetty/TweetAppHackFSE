import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllAccounts } from "../feature/Accounts/AccountSlice";
import AccountItem from "./AccountItem";

function AllAccounts() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const storeFollowerAccounts = useSelector(
    (state) => state.AccountReducer.followerAccounts
  );
   
  useEffect(() => {
    //if (localStorage.getItem("token") === null) {
    //  navigate("/unauthorized");
   // }
    dispatch(getAllAccounts());
  }, []);

  return (
    <div>
      <h1>Your Profile</h1>
      {storeFollowerAccounts ? (
        storeFollowerAccounts.map((followerAccount) => {
          if(followerAccount.username==localStorage.getItem("userName")){
          return (
            <AccountItem
              email={ followerAccount.email}
              key={followerAccount.id}
              id={followerAccount.id}
              firstName={followerAccount.firstName}
              lastName={followerAccount.lastName}
              username={followerAccount.username}
              contact={followerAccount.contactNumber}
              profile="yes"
            />
          );
          }
        })
      ) : (
        <span></span>
      )}
    </div>
  );
}

export default AllAccounts;
