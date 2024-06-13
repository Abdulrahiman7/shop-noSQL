

const headers={
    'Authorization':localStorage.getItem('shops_token')
}
const ul=document.getElementById('products');

function displayCartItems(id, title, price, imageUrl, quantity)
{
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
    const textPrice=document.createTextNode(`price:  ${price.toString()}`);
    div1.appendChild(textPrice);
    
    li.appendChild(div)
    li.appendChild(div1);
  
    const quantityText=document.createTextNode(`quantity:  ${quantity}`);
    li.appendChild(quantityText);

    ['+','-','delete'].forEach(signQty=>{
    const buttonQuantity=document.createElement('button');
    if(signQty==='delete') buttonQuantity.setAttribute('id','deleteCartItem');
    buttonQuantity.textContent=signQty;
    buttonQuantity.style.fontSize='10px';
    buttonQuantity.style.fontWeight='700px';
    li.appendChild(buttonQuantity);
    buttonQuantity.addEventListener('click',(e)=>{ 
        e.preventDefault();
        if(signQty === 'delete') changeQuantity(0);
        else changeQuantity(signQty==='+'? 1 : -1);
     });

    })

    async function changeQuantity(quantity)
    {
        try{    
            
            const updateCart=await axios.post(`http://localhost:3000/changeQuantity`,{id, quantity},{headers});
            if(updateCart.status === 200)
            {
                window.location.reload();
            }

        }catch(err)
        {
            console.log(err);
        }
    }

    ul.appendChild(li);
}

document.addEventListener('DOMContentLoaded',async ()=>{
    const cart=await axios.get('http://localhost:3000/getCartItems',{headers});
    if(cart.status==200)
    {
        let cartItems=cart.data.cartItems;
        let totalPrice=0;
        const totalPriceDiv=document.getElementById('totalPrice');
        let totalPriceText;
        if(cartItems.length)
        {
            cartItems.forEach(item => {
                totalPrice += +item.price* item.quantity;
                
                displayCartItems(item._id, item.title, item.price,item.imageUrl, item.quantity);
            });
             totalPriceText=document.createTextNode(`Total Price: ${totalPrice}`);

             const createOrder=document.createElement('button');
            createOrder.textContent='Order now';
            totalPriceDiv.appendChild(createOrder);

            createOrder.addEventListener('click',async (e)=>{
                e.preventDefault();
                const order=await axios.get('http://localhost:3000/createOrder',{headers});
                if(order.status === 200)
                {
                    
                    alert(`created order successfully your order id is ${order.data.insertedId}`)
                    window.location.reload('./index.html');
                }
            })
        }else totalPriceText=document.createTextNode('No items in your cart');
       

        totalPriceDiv.appendChild(totalPriceText);
    }
    

})