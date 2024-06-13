
const headers={
    'Authorization':localStorage.getItem('shops_token')
}

const ul=document.getElementById('products');
async function displayProducts(title, price, description, imageUrl, id, ul) {
    try{
    const li=document.createElement('li');
    li.setAttribute('class','adminProducts');
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
  
    const EditItem=document.createElement('button');
    EditItem.textContent='Edit Item';
    li.appendChild(EditItem);
    
    EditItem.addEventListener('click',editProduct);

    const DeleteItem=document.createElement('button');
    DeleteItem.textContent='Delete Item';
    li.appendChild(DeleteItem);
    
    DeleteItem.addEventListener('click',deleteProduct);
    ul.appendChild(li);
    
    async function deleteProduct(e)
{
    try{
    e.preventDefault();
    const id=this.parentElement.id;
    const deleteOperation=await axios.delete(`http://localhost:3000/deleteProduct/${id}`,{headers});
    if(deleteOperation.status==200)
    {
        ul.removeChild(this.parentElement);
    }else throw new Error();
    }catch(err)
    {
        console.log(err);
    }
}
    }catch(err)
    {
        console.log(err);
    }

    async function editProduct(e)
    {
        e.preventDefault();
        const id=this.parentElement.id;
        window.location.href = `../views/addProduct.html?id=${id}`;
    } 
}
document.addEventListener('DOMContentLoaded',async()=>{
    try{
        const productsUl=document.createElement('ul');
        const response=await axios.get('http://localhost:3000/fetchProducts',{headers});
        const productsList=response.data;
        if(productsList.length)
        {
            productsList.forEach(element => {
                displayProducts(element.title, element.price, element.description, element.imageUrl, element._id, productsUl)
            });
            console.log(productsList);
        document.getElementById('products').appendChild(productsUl);
        }else throw new Error();
    }catch(err)
    {
        console.log(err);
    }
    

})