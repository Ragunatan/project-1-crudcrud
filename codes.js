      
   function submitButton(){
    event.preventDefault();
    let Items = {
        price : document.getElementById('price').value,
        names : document.getElementById('name').value,
        category : document.getElementById('category').value,
    }
   localStorage.setItem(Items.names,JSON.stringify(Items))
   let List = document.createElement('li')
   let Deletebtn = document.createElement('button')
   Deletebtn.textContent = "Delete"
   
   //displaying values on screen
   List.textContent = `${Items.price}` +'--' + `${Items.names}` + '--' + `${Items.category}` 
    if(Items.category === "electronics"){
        let electronicsList = document.querySelector('.electronics')
        electronicsList.append(List)
        List.appendChild(Deletebtn)
    }
    if(Items.category === "food"){
        let electronicsList = document.querySelector('.food')
        electronicsList.append(List)
        List.appendChild(Deletebtn)
    }
    if(Items.category === "skincare"){
        let electronicsList = document.querySelector('.skincare')
        electronicsList.append(List)
        List.appendChild(Deletebtn)
    }

    // Posting data to the backend
    axios
    .post(`https://crudcrud.com/api/054a8b7408f44c92ac958b7f118691dd/${Items.category}`,Items)
    .then(res => console.log("Data saved to crud"))
    .catch(err => console.log(err))
 

    Deletebtn.addEventListener('click', (event) => {
        event.preventDefault();
    
        // Remove the item from the UI
        List.remove();
    
        // Access the values directly from the Items object to identify the item to delete
        let deleteValue = Items.names;       // Item name to be deleted
        let deleteCategory = Items.category; // Item category to be deleted from
    
        // Fetch items from the backend to locate the specific item by its name
        axios.get(`https://crudcrud.com/api/054a8b7408f44c92ac958b7f118691dd/${deleteCategory}`)
            .then((response) => {
                // Find the item to delete using its name (or other unique identifier if needed)
                let itemToDelete = response.data.find(item => item.names === deleteValue);
                
                if (itemToDelete) {
                    // Delete the item using its unique _id
                    axios.delete(`https://crudcrud.com/api/054a8b7408f44c92ac958b7f118691dd/${deleteCategory}/${itemToDelete._id}`)
                        .then(res => console.log("Item deleted successfully"))
                        .catch(err => console.log(err));
                } else {
                    console.log("Item not found on the server.");
                }
            })
            .catch(err => console.log(err));
    });
    
   }