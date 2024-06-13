const headers={
    'Authorization':localStorage.getItem('shops_token')
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
    const id=document.getElementById('id').value;

    const newProduct={
        title, price, description, imageUrl, id
    };

    const addProduct=await axios.post('http://localhost:3000/addProduct',newProduct,{headers});
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
        function getQueryParams() {
            const params = new URLSearchParams(window.location.search);
            return {
                id: params.get('id')
            };
        }
        const {id}=getQueryParams();
    if(!id) return;
    else 
    {
        const existingProduct= await axios.get(`http://localhost:3000/getProduct/${id}`,{headers});

        document.getElementById('title').value=existingProduct.title;
        document.getElementById('price').value=existingProduct.price;
        document.getElementById('description').value=existingProduct.description;
        document.getElementById('imageUrl').value=existingProduct.imageUrl;
        document.getElementById('id').value=existingProduct.id;

    }
    }catch(err)
    {
        console.log(err);
    }
    
});