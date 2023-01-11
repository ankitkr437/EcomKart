import React from 'react'
import styled from "styled-components";
import { mobile } from "../responsive";
import { useEffect, useState } from "react";
import { publicRequest,userRequest } from "../requestMethods";
import ReactStars from "react-rating-stars-component";
import moment from 'moment';
const AvgStar= styled.div`
    display: flex;
    justify-content: space-between;
    width: ${(props) => props.width};
`
const ReviewWrapper=styled.div`
   padding: 10px;
   margin-top: 2vh;
   display: flex;
   flex-direction: column;
   background-color: #f8f5f5;
   width: 60%;
   ${mobile({ padding:"15px",width:"80%"})};
`
const ReviewUserName=styled.h2`
     font-size:22px;
     ${mobile({fontSize:"18px"})};
`
const UserStar=styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 0.3vh;
  justify-content: space-between;
  align-items: center;
`
const ReviewTime = styled.p`
  font-size: 14px;
  font-weight: 400;
  color: #7a7777;
  ${mobile({fontSize:"11px"})};
`
const UserReview = styled.p`
  margin-top: 2vh;
  font-size: 15px;
  color: #3e3c3c;
  ${mobile({fontSize:"14px"})};
`
const Review = ({review}) => {
    const [reviewer,setReviewer] =useState()
   
     useEffect(() => {
        const getUser = async () => {
          try {
            const res = await publicRequest.get("/users/find/" + review?.userId);
            setReviewer(res.data);
          } catch {}
        };
        getUser();
      }, [review]);
  return (
    <ReviewWrapper >
    <ReviewUserName>{reviewer?.username}</ReviewUserName>
    <UserStar>
    <AvgStar width="70%">
    <ReactStars count={5} value ={review?.rating} edit={false}
          size={25} activeColor="#ffd700" isHalf={true}/>
   </AvgStar>
   <ReviewTime>
   {moment(review?.createdAt).fromNow()}
   </ReviewTime>
  </UserStar>
  <UserReview>
     {review?.text}
  </UserReview>
  </ReviewWrapper>
  )
}

export default Review