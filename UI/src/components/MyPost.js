import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getProfilePosts } from "../feature/checkProfile/checkProfileSlice";
import PostItem from "./PostItem";

function MyPost() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const postList = useSelector((state) => state.checkProfileReducer.postList);
  

  useEffect(() => {
  //  if (localStorage.getItem("token") === null) {
   //   navigate("/unauthorized");
   // }

    if (localStorage.getItem("userName") !== null) {
      dispatch(getProfilePosts(localStorage.getItem("userName")));
      
    }
  }, []);
  console.log('-------------myposts----------',postList);

  return (
    <div>
      <h1>Tweet's of {localStorage.getItem("firstName")+" "+localStorage.getItem("lastName")}</h1>
      {postList !== null ? (
        postList.map((post) => {
          return (
            <PostItem
              key={post.id}
              postId={post.id}
              userId={post.user.username}
              firstName={post.user.firstName}
              lastName={post.user.lastName}
              image=""
              handleName={post.user.username}
              content={post.tweetTag}
              loveList={post.likes}
              shareList=""
              commentList={post.replies}
              postDate={post.postDate}
              handles="user"
            />
          );
        })
      ) : (
        <span></span>
      )}
    </div>
  );
}

export default MyPost;
