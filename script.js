// const api = axios.create({
//   baseURL: 'https://api.kedufront.juniortaker.com/item'
// });


axios.get('https://api.kedufront.juniortaker.com/item/')
    .then(function (response) {
      const items = response.data;
      displayItems(items);
      // GetImage(item.image);
      console.log(data);
      })
      .catch(function (error) {
      console.error(error);
  });


  function displayItems(items) {
    const container = document.getElementById('items-container'); // Assurez-vous que cet ID existe dans votre HTML
    container.innerHTML = '';

    items.forEach(item => {
        if (item._id == 1 || item._id == 3 || item._id == 4 || item._id == 6) {
          const itemDiv = document.createElement('div');
          itemDiv.className = 'item';
          itemDiv.innerHTML = `
              <div id="image-container-${item.image}"></div>
              <h1>${item.name}</h1>
              <p>Price: ${item.price}</p>
          `;
          container.appendChild(itemDiv);
          console.log(item.image);
          GetImage(item.image);
        }
    });
}

function GetImage(id) {
  axios.get(`https://api.kedufront.juniortaker.com/item/picture/${id}`, {
    responseType: 'blob'})
  .then(response => {
      const imageUrl = URL.createObjectURL(response.data);

      const imageContainer = document.getElementById(`image-container-${id}`);
      if (imageContainer) {
          const imageElement = document.createElement('img');
          imageElement.src = imageUrl;
          imageElement.alt = 'Item Image';

          imageContainer.appendChild(imageElement);
      } else {
          console.error(`Image container for item ${id} not found`);
      }
  })
  .catch(error => {
      console.error(`Error fetching image for item ${id}:`, error);
  });
}
