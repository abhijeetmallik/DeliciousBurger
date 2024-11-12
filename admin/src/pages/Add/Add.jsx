import React, { useState } from 'react'
import './Add.css'
import { assets } from '../../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'

const Add = ({url}) => {

  // const url = "http://localhost:4000";
  const [image,setImage] = useState(false);
  const [data,setData] = useState({
    name:"",
    description:"",
    price:"",
    category:"Cheese Burger"
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data=>({...data,[name]:value}));
  }

  // useEffect(()=>{
  //   console.log(data);
  // },[data]);

  const onSubmitHandler = async (event) => {
       event.preventDefault();
       const formData = new FormData();
        formData.append("name",data.name);
        formData.append("description",data.description);
        formData.append("price",Number(data.price));
        formData.append("category",data.category);
        formData.append("image",image);
        const response = await axios.post(`${url}/api/food/add`,formData);
        if (response.data.success){
          setData({
            name:"",
            description:"",
            price:"",
            category:"Cheese Burger"
          })
          setImage(false);
          toast.success(response.data.message);
        } else{
          toast.error(response.data.message);
        }
  }

  return (
    <div className='add'>
      <form className='flex-col' onSubmit={onSubmitHandler}>
        <div className="add-img-upload flex-col">
            <p>Upload Image</p>
            <label htmlFor="image">
              <img src={image?URL.createObjectURL(image):assets.upload_area} alt="" />
            </label>
            {/* /////////////////////////////////////////////////////////////////////////// required */}
            <input onClick={(e)=>setImage(e.target.files[0])} type="file" id="image" hidden /> 
        </div>
        <div className="add-product-name flex-col">
              <p>Product name</p>
              <input onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder='Type here' />
        </div>
        <div className="add-product-description flex-col">
            <p>Product description</p>
            <textarea onChange={onChangeHandler} value={data.description} name="description" rows="6"  placeholder='Write content here' required></textarea>
        </div>
        <div className="add-category-price">
            <div className="add-category flex-col">
                <p>Product category</p>
                <select onChange={onChangeHandler} name="category">
                    <option value="Cheese Burger">Cheese Burger</option>
                    <option value="Paneer Burger">Paneer Burger</option>
                    <option value="Aloo Tikki Burger">Aloo Tikki Burger</option>
                    <option value="Chicken Burger">Chicken Burger</option>
                    <option value="Noodle Burger">Noodle Burger</option>
                    <option value="Tofu Burger">Tofu Burger</option>
                    <option value="Mix Veg Burger">Mix Veg Burger</option>
                    <option value="Afgani Burger">Afgani Burger</option>
                </select>
            </div>
            <div className="add-price flex-col">
                <p>Product Price</p>
                <input onChange={onChangeHandler} value={data.price} type="number" name='price' placeholder='₹50' />
            </div>
        </div>
        <button type='submit' className='add-btn'>ADD</button>
      </form>
    </div>
  )
}

export default Add
