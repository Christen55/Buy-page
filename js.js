
function openPopup() {
  document.querySelector(".popup").style.display = "flex";
}

function closePopup() {
  document.querySelector(".popup").style.display = "none";
}


function increaseNumber(ID) {
    number=document.getElementById(ID).textContent ;
    number++;
    document.getElementById(ID).textContent = number;
    price=document.getElementById(ID.replace('number', 'price')).textContent;
    console.log(price);
    console.log(ID.replace('number', 'price'));
    price=Number(price.slice(1));
    price+=681;
    
    document.getElementById(ID.replace('number', 'price')).textContent = '$'+price;
}

function decreaseNumber(ID) {
    
    if (number>0){
        number=document.getElementById(ID).textContent ;
        number--;
        document.getElementById(ID).textContent = number;
        price=document.getElementById(ID.replace('number', 'price')).textContent;
        console.log(price);
        console.log(ID.replace('number', 'price'));
        price=price.slice(1);
        price-=681;
        document.getElementById(ID.replace('number', 'price')).textContent = '$'+price;
    }
}
let isAdding='';
function summ(ID){
    isAdding=String(isAdding) +(String(ID.replace(/[a-z]/g, '')));
    console.log(isAdding);

    let sum;
    console.log(sum);
    let num=[0,0,0];    
    for(let k in isAdding){
        console.log('price'+isAdding[k]);
        console.log(k);
        num[isAdding[k]-1]=Number(document.getElementById('price'+isAdding[k]).textContent.slice(1));
        console.log(num)
        sum=0;
        for(let k=0; k<3; k++){
            sum+=num[k]
        }
        console.log(sum);
    }

    
    tax=Number(document.getElementById('tax').textContent.slice(1));
    sumTax=0;
    if(sum>0){
      sumTax=sum+tax;
    }

    document.getElementById('subtotal').textContent ='$'+ sum;
    document.getElementById('total').textContent ='$'+ sumTax;
    document.getElementById('totalSum').textContent ='$'+ sumTax;   
    
   


}


const cardNumberInput = document.getElementById('cardNumber');

cardNumberInput.addEventListener('input', function(event) {
    let value = this.value.replace(/\s/g, ''); 
    value = value.replace(/[^0-9]/g, '');
    if (value.length > 16) {
        value = value.substring(0, 16);
    }

    let formattedValue = '';
    for (let i = 0; i < value.length; i++) {
        if (i > 0 && (i % 4) === 0) {
          formattedValue += ' ';
        }
        formattedValue += value[i];
    }

    this.value = formattedValue;
});


const dateInput = document.getElementById('date');

dateInput.addEventListener('input', function(event) {
    let value = this.value.replace(/\s/g, ''); 
    value = value.replace(/[^0-9]/g, '');
    if ((Number(value.slice(0,2))>12 || (Number(value.slice(2,4))>(new Date().getFullYear()-2000+5))) && ( Number(value.slice(2,4))>1 && Number(value.slice(2,4))<(new Date().getFullYear()-2000))){
        value='';
    }


    if (value.length > 4) {
        value = value.substring(0, 4);
        this.value = formattedValue;
    }


    let formattedValue = ''; 
    for (let i = 0; i < value.length; i++) {
        if (i > 0 && (i % 2) === 0) {
          formattedValue += '/';
        }
        formattedValue += value[i];
    }
    this.value = formattedValue;

    

    

    
});


const CVV = document.getElementById('CVV');

CVV.addEventListener('input', function(event) {
    let value = this.value.replace(/[^0-9]/g, '');
    if (value.length > 3) {
        value = value.substring(0, 3);
    }

    this.value = value;
});



// Открываем соединение с базой данных
const request = window.indexedDB.open('myDatabase', 1);

// Обработчик события открытия соединения
request.onupgradeneeded = function(event) {
  const db = event.target.result;

  // Создаем хранилище для товаров
  const store = db.createObjectStore('products', { keyPath: 'id' });

  // Добавляем индекс по названию
  store.createIndex('name', 'name', { unique: false });
};

// Обработчик события успешного открытия соединения
request.onsuccess = function(event) {
  const db = event.target.result;

  // Добавляем товары в базу данных
  const products = [
    { id: 1, name: 'pizza', price: 681 },
    { id: 2, name: 'combo', price: 681 },
    { id: 3, name: 'rice', price: 681 }
  ];

  const transaction = db.transaction('products', 'readwrite');
  const store = transaction.objectStore('products');

  // Добавляем каждый товар
  products.forEach(product => {
    store.add(product);
  });

  // Обработчик события завершения транзакции
  transaction.oncomplete = function() {
    // Получаем информацию о товарах
    getProducts(db);
  };
};

// Функция для получения информации о товарах
function getProducts(db) {
  const transaction = db.transaction('products');
  const store = transaction.objectStore('products');

  // Получаем все товары
  const request = store.getAll();

  // Обработчик события получения данных
  request.onsuccess = function(event) {
    const products = event.target.result;

    // Выводим информацию о товарах
    products.forEach(product => {
      console.log( product.id,  product.name, product.price);
    });
  };
}


  // Обработчик события для кнопки "Добавить в корзину"
  document.getElementById("combo").addEventListener("click", function() {
    addToCart("combo", 681);
    console.log("Товар добавлен в корзину!");
  });