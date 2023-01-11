import { useEffect, useState } from "react";
import styled from "styled-components";
import { popularProducts } from "../data";
import { Height, Search} from "@material-ui/icons";
import Product from "./Product";
import axios from "axios";
import Loader from "./Loader";
import {search} from "../redux//userRedux";
import { useSelector,useDispatch} from "react-redux";
import { mobile } from "../responsive";
import { Link } from "react-router-dom";
const Container = styled.div`
  padding: 20px;
  ${mobile({ padding:"0px" })}
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1vh;
  ${mobile({ marginTop:"3vh" })}
`;
const SearchContainer = styled.form`
  border: 1px solid lightgray;
  display: flex;
  align-items: center;
  padding: 5px;
`;

const Input = styled.input`
  border: none;
  outline: none;
  width: 500px;
  height: 40px;
  font-size: 16px;
  ${mobile({ width: "200px" ,height:"30px"})}
  padding: 5px;
`;
const SearchButton = styled.button`
   border: none;
   outline: none;
   background-color: white;
`;

const Products = ({ cat, filters, sort }) => {
  const searchedValue = useSelector((state) => state.user.searchedValue);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isFetching,setisFetching]=useState(true);
  const [searchedItem,setsearchedItem]=useState(searchedValue);
  const dispatch = useDispatch();
  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          cat
            ? `https://ecomkartbackend-ankitkr437.onrender.com/api/products?category=${cat}`
            : "https://ecomkartbackend-ankitkr437.onrender.com/api/products"
        );
        setProducts(res.data);
        setisFetching(false)
      } catch (err) {}
    };
    getProducts();
  }, [cat]);
  //  console.log(products)
  useEffect(() => {
    cat &&
      setFilteredProducts(
        products.filter((item) =>
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      );
  }, [products, cat, filters]);

  useEffect(() => {
    if (sort === "newest") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
    } else if (sort === "asc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort]);
  const searchedProducts = (searchedValue) && (cat?filteredProducts:products).filter(p =>
    p?.title.toLowerCase().includes(searchedValue &&searchedValue.toLowerCase()) 
 );
 const searchHandler=(e)=>{
  e.preventDefault();
  dispatch(search(searchedItem));
  // console.log(searchedValue)
}
   useEffect(()=>{
       dispatch(search(null));
  },[])
  return (
    <>
    {
    isFetching?
    <Loader item={"product"}/>:
    <>
    <Wrapper>
     <SearchContainer onSubmit={searchHandler}>
            <Input placeholder="Search product..." onChange={(e)=>setsearchedItem(e.target.value)}/>
            <SearchButton type="submit">
            <Search style={{ color: "gray", fontSize: 30 }} />
            </SearchButton >
    </SearchContainer>
    </Wrapper>
    <Container>
      {
      searchedValue?
      searchedProducts.map((item) => <Product item={item} key={item.id} />)
      :
      (
      cat
        ? filteredProducts.map((item) => <Product item={item} key={item.id} />)
        : products
            .slice(0, 8)
            .map((item) => 
            // <Link to={`/product/${item._id}`}>
            <Product item={item} key={item.id} />
            // </Link>
            )
        )
     }
    </Container>
    </>
    } 
    </>
  );
};

export default Products;