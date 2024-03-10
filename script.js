// const api = axios.create({
//   baseURL: 'https://api.kedufront.juniortaker.com/item'
// });

async function call_api() {
  try {
      const response = await axios.get('https://api.kedufront.juniortaker.com/item/');
      const items = response.data;
      console.log(items);
      return items;
  } catch (error) {
      console.error(error);
  }
}

function pageItems(id) {
  axios.get('https://api.kedufront.juniortaker.com/item/')
    .then(function (response) {
      const items = response.data;
      const item = items[id];
      const container = document.getElementById('product-page-' + id)
      const productPage = document.createElement('div');
      productPage.className = 'product';
      productPage.innerHTML = `
          <div id="image-container-${item.image}"></div>
          <div class="item-info">
            <h1>${item.name}</h1>
            <p class="item-price">Prix: ${item.price}</p>
            <button class="add-cart">ajouter au panier</button>
            <p class="item-description">${item.description}</p>
          </div>
      `;
      container.appendChild(productPage);
      GetImage(item.image);
      })
    }

async function displayItems() {
    const items = await call_api()
    console.log(items);
    const container = document.getElementById('items-container'); // Assurez-vous que cet ID existe dans votre HTML
    items.forEach(item => {
        if (item._id == 1 || item._id == 3 || item._id == 4 || item._id == 6) {
          const itemDiv = document.createElement('div');
          itemDiv.className = 'item';
          itemDiv.innerHTML = `
              <a href="./${item.name}.html">
                <div id="image-container-${item.image}"></div>
                <h1>${item.name}</h1>
                <p>Prix: ${item.price}</p>
              </a>
          `;
          container.appendChild(itemDiv);
          GetImage(item.image);
        }
    });
}

async function displayAllItems() {
  const items = await call_api()
  console.log(items);
  const container = document.getElementById('items-container'); // Assurez-vous que cet ID existe dans votre HTML
  items.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'item';
        itemDiv.innerHTML = `
            <a href="./${item.name}.html">
              <div id="image-container-${item.image}"></div>
              <h1>${item.name}</h1>
              <p>Prix: ${item.price}</p>
            </a>
        `;
        container.appendChild(itemDiv);
        GetImage(item.image);
      })
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
