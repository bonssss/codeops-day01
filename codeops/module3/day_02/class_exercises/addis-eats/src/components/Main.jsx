import React, { useState,useEffect } from 'react'
import Dish from './Dish'
import CategoryBar from './CategoryBar'

function Main() {
  const [total, setTotal] = useState(0);
  const [catagory, setCatagory] = useState("all");
  const[dish,setDishes]=useState([]);
  const[loading,setLoading]=useState(true);
  const[error,setError]=useState(null);

  useEffect(()=>{
    async function loadData(){
      try{
        const res = await fetch('/menu.json')
        if(!res.ok){
          throw new Error(`Failed to fetch menu: ${res.statusText}`);
        }
        const data=await res.json();
        if(!data || !Array.isArray(data.items)){
          throw new Error("Invalid menu format");
        }
        setDishes(data.items);

      }
      catch(e){
        console.log(e.message);
        setError(e.message);
      }
      finally{
        setLoading(false);
      }
    }

    loadData();
  },[]);


  const shown = catagory === "all"
    ? dish
    : dish.filter(dish => dish.catagory.toLowerCase().trim() === catagory.toLowerCase().trim());

  function addToOrder(price) {
    setTotal(prevTotal => prevTotal + price);
  }

  return (
    <main className="main-section">
      <div className="menu-header-bar">
        <h2>Menu Items</h2>
        <div className="total-box">
          <span>Total Order: <strong>{total} ETB</strong></span>
          {total > 0 && (
            <button className="reset-btn" onClick={() => setTotal(0)}>
              Reset
            </button>
          )}
        </div>
      </div>

      <CategoryBar onSelectCatagory={setCatagory} activeCategory={catagory} />

      <p className="category-status">Showing: <strong style={{ textTransform: 'capitalize' }}>{catagory}</strong> ({shown.length} items)</p>

      <div className="dishes-grid">
        {loading ?(
          <p>Loading...</p>
        ):
        error ? (
          <p>Error: {error}</p>
        ): 
        shown.length==0?
        (
          <p>No dishes found in category "{catagory}".</p>
        ):
        shown.map((item) => (
          <Dish
            key={item.id}
            {...item}
            onAdd={addToOrder}
          />
        ))}
      </div>
    </main>
  )
}

export default Main;