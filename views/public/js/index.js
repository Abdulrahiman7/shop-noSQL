const headers={
    'Authorization':localStorage.getItem('shops_token')
}

function displayProducts(title, price, description, imageUrl, id, ul) {

    const li=document.createElement('li');
    li.setAttribute('class','product col');
    li.setAttribute('id',id);


    const div=document.createElement('div');
    div.setAttribute('class','titleText');      
    const textTitle=document.createTextNode(title);
    div.appendChild(textTitle);

    let img = document.createElement('img');
    img.src=imageUrl;
    img.style.width='100px';
    img.style.height='100px';
    li.appendChild(img);

    const div1=document.createElement('div');
    div1.setAttribute('class','priceText');
    const textPrice=document.createTextNode(price.toString());
    div1.appendChild(textPrice);
    
    li.appendChild(div)
    li.appendChild(div1);
  
    const addToCart=document.createElement('button');
    addToCart.textContent='Add to Cart';
    li.appendChild(addToCart);

    addToCart.addEventListener('click',addProductToCart);

    async function addProductToCart(e)
    {
        try{    
            e.preventDefault();
            const productId=await this.parentElement.id;
            const updateCart=await axios.post('http://3.87.122.85/addToCart',{id: productId},{headers});
            if(updateCart.status === 200)
            {
                addToCart.textContent= `Added to Cart`;
                addToCart.disabled= true;
            }

        }catch(err)
        {
            console.log(err);
        }
    }

    ul.appendChild(li);
}

document.addEventListener('DOMContentLoaded',async ()=>{
    try{
        const productsUl=document.createElement('ul');
        productsUl.setAttribute('id','items-ul');
        const getAllProducts=await axios.get('http://3.87.122.85/fetchProducts',{headers});
        const productsList=getAllProducts.data;
        if(productsList.length)
        {
            productsList.forEach(element => {
                displayProducts(element.title, element.price, element.description, element.imageUrl, element._id, productsUl)
            });
           
        }
        const availableItemsRow=document.getElementById('items');
        availableItemsRow.appendChild(productsUl);
}catch(err)
    {
        console.log(err);  
    }
})