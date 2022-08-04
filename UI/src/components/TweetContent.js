import React, { useEffect } from "react";
import PostCompose from "./PostCompose";
import PostItem from "./PostItem";
import { Spinner } from "react-bootstrap";
import {getFollowingPosts} from "../feature/Post/PostSlice";
import { useDispatch, useSelector } from "react-redux";

function TweetContent() {
  const dispatch = useDispatch();
  const storeFollowingPosts = useSelector((state) => state.PostReducer.followingPosts);
  console.log('--------------------stored followers',storeFollowingPosts);
  
  

  useEffect(() => {
    dispatch(getFollowingPosts());
  },[]);

  return (
    <div>
      <PostCompose />
      {console.log(storeFollowingPosts)
      }
      {storeFollowingPosts !== null && storeFollowingPosts !== ""? (
        storeFollowingPosts.map((post) => {
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
        <div className="d-flex justify-content-center align-items-center my-5">
          <Spinner animation="border" variant="success" />
          <span>No Tweets Found</span>
        </div>
      )}
    </div>
  );
}

export default TweetContent;
