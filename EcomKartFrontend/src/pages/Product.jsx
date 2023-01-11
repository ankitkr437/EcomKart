import { Add, Feedback, Remove,StarBorderOutlined,StarBorder } from "@material-ui/icons";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import { mobile } from "../responsive";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { publicRequest,userRequest } from "../requestMethods";
import { addProduct } from "../redux/cartRedux";
import { useDispatch, useSelector } from "react-redux";
import Review from '../components/Review'
import ReactStars from "react-rating-stars-component";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({ padding: "10px", flexDirection: "column" })}
`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 60vh;
  object-fit: cover;
  ${mobile({ height: "40vh" })}
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 200;
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;

const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0px 5px;
  cursor: pointer;
`;

const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;
  &:hover {
    background-color: #f8f4f4;
  }
`;
const Delete = styled.del`
  color: #746e6e;
  margin-right:5px;
`;
const PriceTag = styled.p`
`;
const FeedbackWrapper= styled.div`
  padding: 50px;
  display: flex;
  flex-direction: column;
  ${mobile({ padding: "10px", flexDirection: "column" })}
`
const RateProductTitle=styled.h2`
   font-weight: 700;
   ${mobile({marginBottom:"1vh"})};
`
const ReviewForm = styled.form`
  border:none;
  display: flex;
  flex-direction: column;
  width: 60%;
  ${mobile({width:"90%",marginTop:"2vh"})};
`;
const Input = styled.input`
  outline: none;
  font-size: 20px;
  padding: 5px;
  margin-top: 2vh;
  height: 9vh;
  border: 1px solid #695e5e;
  ${mobile({ fontSize:"15px"})};
  width: 100%;
`;
const SubmitButton = styled.button`
   border: none;
   padding: 10px;
   font-size: 25px;
   margin-top: 2vh;
   width: 20%;
   font-weight: 300;
   background-color: #c2a309;
   cursor: pointer;
   ${mobile({ padding:"11px",fontSize:"20px",width:"30%"})};
`;
const RatingStar=styled.div`
  margin-top: 4vh;
  display: flex;
  flex-direction: row;
  ${mobile({flexDirection:"column" })}
`
const AvgRating=styled.div`
  padding: 15px;
  display: flex;
  width: 50%;
  background-color: #efeedd;
  flex-direction: column;
  ${mobile({padding:"8px",width:"95%"})};
`
const AvgRatingTitle = styled.h5`
  font-size: 20px;
  font-weight: 300;
  margin-bottom: 2vh;
`
const AvgRatingNumber = styled.h1`
  display: flex;
  align-items: center;
  font-size: 35px;
  ${mobile({fontSize:"30px"})};
  margin-bottom: 0vh;
`
const RatingNumberTotal = styled.p`
  font-size: 20px;
  font-weight: 400;
  margin-left: 5px;
  color: #615f5f;
  
`
 

const Product = () => {

  const { currentUser } = useSelector((state) => state.user);
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [product, setProduct] = useState({});
  const [reviewText,setReviewText]=useState()
  const [rating,setRating]=useState()
  const [review, setReview] = useState();
  const [quantity, setQuantity] = useState(1);
  const [avgRating,setavgRating]=useState(0)
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");

  const dispatch = useDispatch();
   
  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get("/products/find/" + id);
        setProduct(res.data);
      } catch {}
    };
    getProduct();
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleQuantity = (type) => {
    if (type === "dec") {
      quantity > 1 && setQuantity(quantity - 1);
    } else {
      setQuantity(quantity + 1);
    }
  };

  const handleClick = () => {
    dispatch(
      addProduct({ ...product, quantity, color, size })
    );
  };
  useEffect(()=>{
    const res = 
    (review?.reduce((a,v) =>  a = a + v.rating , 0 ));
    setavgRating(res);
  },[id,review,product,avgRating])
    
    useEffect(() => {
    const getReview = async () => {
      try {
        const res = await publicRequest.get("/reviews/product/" + id);
        setReview(res.data);
      } catch {}
    };
    getReview();
  }, [id]);

  const ratingChanged = (newRating) => {
    setRating(newRating)
  };
  const handleReview = async (e)=>{
    e.preventDefault();
    if(!currentUser){
      alert(" Do SignUp to give review")
    }
    else{
      try {
         const res= await publicRequest.post("/reviews", { 
              userId:currentUser._id,
              productId:id,
              text:reviewText,
              rating:rating
           });
          setReview([...review,res.data])
          setReviewText("")
        } catch (err) {
          alert("Something wrong happened")
        }
    }
  }

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <ImgContainer>
          <Image src={product.img} />
        </ImgContainer>
        <InfoContainer>
          <Title>{product.title}</Title>
          <Desc>{product.desc}</Desc>
          <Price> 
            <Delete>$ {product.price+5.97}</Delete>
              <PriceTag>$ {product.price}</PriceTag>
              </Price>
          <FilterContainer>
            <Filter>
              <FilterTitle>Color</FilterTitle>
              {product.color?.map((c) => (
                <FilterColor color={c} key={c} onClick={() => setColor(c)} />
              ))}
            </Filter>
            <Filter>
              <FilterTitle>Size</FilterTitle>
              <FilterSize onChange={(e) => setSize(e.target.value)}>
                {product.size?.map((s) => (
                  <FilterSizeOption key={s}>{s}</FilterSizeOption>
                ))}
              </FilterSize>
            </Filter>
          </FilterContainer>
          <AddContainer>
            <AmountContainer>
              <Remove onClick={() => handleQuantity("dec")} />
              <Amount>{quantity}</Amount>
              <Add onClick={() => handleQuantity("inc")} />
            </AmountContainer>
            <Button onClick={handleClick}>ADD TO CART</Button>
          </AddContainer>
        </InfoContainer>
      </Wrapper>
      <FeedbackWrapper>
         
        <RateProductTitle>Review product</RateProductTitle>
         <ReviewForm onSubmit={handleReview}>

         <ReactStars count={5} onChange={ratingChanged} size={50}activeColor="#ffd700" isHalf={true} value={rating}/>
            
            <Input placeholder="Add a Review" onChange={(e)=>setReviewText(e.target.value)} required/>
            <SubmitButton type="submit">
             Add
            </SubmitButton >

          </ReviewForm>
        <RatingStar>
         <AvgRating>
          <AvgRatingTitle>Average User Rating</AvgRatingTitle>
          <AvgRatingNumber>{avgRating}
          <RatingNumberTotal>/5</RatingNumberTotal>
          </AvgRatingNumber>
         </AvgRating>
        </RatingStar>
       {
        review?.map((rev)=>(
         <Review review={rev}/>
        ))
       
       }
      </FeedbackWrapper>
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default Product;