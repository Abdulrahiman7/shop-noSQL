const headers={
    'Authorization':localStorage.getItem('shops_token')
}

function displayOrders(title, price, quantity, ul)
{
    const li= document.createElement('li');
    const h4=document.createElement('h4');
    h4.textContent=title;
    li.appendChild(h4);

    const quantityText= document.createTextNode(`quantity: ${quantity}`);
    const priceText= document.createTextNode(`price/qty: ${price}`);
    li.appendChild(quantityText);
    li.appendChild(priceText);
    ul.appendChild(li);
}

document.addEventListener('DOMContentLoaded',async ()=>{
    try{
        const orderList=await axios.get('http://3.87.122.85/getOrders',{headers});
        const ordersUl=document.getElementById('my-orders');
        const orders=orderList.data.orders;
        for(const order of orders)
        {
            const ul=document.createElement('ul');
            const h3=document.createElement('h3');
            h3.textContent=`Order # ${order._id.toString()}`;
            ul.appendChild(h3);
            const products=order.products;
            for(const product of products)
            {
                displayOrders(product.productData.title, product.productData.price, product.quantity, ul);
            }
            ordersUl.appendChild(ul);
        }
    }catch(err)
    {
        console.log(err);
    }
});