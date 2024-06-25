const headers={
    'Authorization':localStorage.getItem('shops_token')
}

function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        id: params.get('id')
    };
}

const form=document.getElementById('form');
form.addEventListener('submit',addProduct);
async function addProduct(e)
{
    try{
        e.preventDefault();
    const title=document.getElementById('title').value;
    const price=document.getElementById('price').value;
    const description=document.getElementById('description').value;
    const imageUrl=document.getElementById('imageUrl').value;


    const newProduct={
        title, price, description, imageUrl
    };
    const {id} = getQueryParams();
    let addProduct;
    if(id)
    {
        newProduct.id= id;
         addProduct=await axios.post('http://3.87.122.85:3000/postEditProduct',newProduct,{headers});
    }else{
         addProduct=await axios.post('http://3.87.122.85:3000/addProduct',newProduct,{headers});
    }
    
    if(addProduct.status===200)
    {
        window.location.href='./admin.html';
    }
    }catch(err)
    {
        console.log(err);
    }
    
}

document.addEventListener('DOMContentLoaded',async ()=>{
    try{
        const {id}=getQueryParams();
    if(!id) return;
    else 
    {
        const existingProduct= await axios.get(`http://3.87.122.85:3000/getProduct/${id}`,{headers});

        document.getElementById('title').value=existingProduct.data.title;
        document.getElementById('price').value=existingProduct.data.price;
        document.getElementById('description').value=existingProduct.data.description;
        document.getElementById('imageUrl').value=existingProduct.data.imageUrl;
      

    }
    }catch(err)
    {
        console.log(err);
    }
    
});