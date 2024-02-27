axios.get('https://api.kedufront.juniortaker.com/item/')
  .then(function (response) {
    var data = response.data;
    item = data[0];
    // for (item in data) {
      var content = '<h1>' + item.name + '</h1>' + '<p>' + item.description + '</p>' + '<img src="' + item.image + '" alt=""></img>';
      var container = document.getElementById('data-container');
      container.innerHTML = content;
    // }
    console.log(data);
  })
  .catch(function (error) {
    console.error(error);
  });