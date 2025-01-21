const config = {
    baseUrl: 'https://nomoreparties.co/v1/apf-cohort-202',
    headers: {
      authorization: '29f13756-599a-460c-806b-0c0ac71744cb',
      'Content-Type': 'application/json'
    }
  }
  
const getInitialCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
      method: 'GET',
      headers: config.headers
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }})
      .catch((err) => {
        console.log(err); 
       });  
       return Promise.reject(`Ошибка: ${res.status}`);
  } 

const getUserInfo = () => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'GET',
        headers: config.headers
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }})
      .catch((err) => {
        console.log(err); 
       });
       return Promise.reject(`Ошибка: ${res.status}`);
  } 

  const updateUserImage = (userImage) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
          avatar: userImage
        })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }})
      .catch((err) => {
        console.log(err); 
       });
       return Promise.reject(`Ошибка: ${res.status}`);
  } 

  const updateUserInfo = (userName, userAbout) => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
          name: userName,
          about: userAbout
        })
    })
    .then(res => {
        if (res.ok) {
          return res.json();
        }})
      .catch((err) => {
        console.log(err); 
       }); 
       return Promise.reject(`Ошибка: ${res.status}`);
  } 

  const addNewCard = (cardName, cardUrl) => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
          name: cardName,
          link: cardUrl
        })
    })
    .then(res => {
        if (res.ok) {
          return res.json();
        }})
      .catch((err) => {
        console.log(err); 
       }); 
       return Promise.reject(`Ошибка: ${res.status}`);
  } 

  const deleteCard = (cardID) => {
    return fetch(`${config.baseUrl}/cards/${cardID}`, {
        method: 'DELETE',
        headers: config.headers
    })
    .then(res => {
        if (res.ok) {
          return res;
        }})
      .catch((err) => {
        console.log(err); 
       }); 
       return Promise.reject(`Ошибка: ${res.status}`);
  } 

  const putLike = (cardID) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardID}`, {
        method: 'PUT',
        headers: config.headers,
    })
    .then(res => {
        if (res.ok) {
          return res.json();
        }})
    .catch((err) => {
      console.log(err); 
      }); 
      return Promise.reject(`Ошибка: ${res.status}`);
  } 

  const deleteLike = (cardID) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardID}`, {
        method: 'DELETE',
        headers: config.headers,
    })
    .then(res => {
        if (res.ok) {
          return res.json();
        }})
    .catch((err) => {
      console.log(err); 
      }); 
      return Promise.reject(`Ошибка: ${res.status}`);
  } 

  export { config, getInitialCards, getUserInfo, updateUserInfo, addNewCard, deleteCard, putLike, deleteLike, updateUserImage };