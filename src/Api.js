const api = new Api({
    baseUrl: 'https://api.react-learning.ru',
    headers: {
      authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjJmOTk5MmFlNWM0MGMxMGMxMWRmZTQiLCJpYXQiOjE2NDcyODY2ODEsImV4cCI6MTY3ODgyMjY4MX0.WHKXAErKZtY445yXecOFZsx981MuXicJti-okSY-tac',
      'Content-Type': 'application/json'
    },
      groupId: '/v2/group-10'
  });


class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }
  _onResponse(res) {
    return res.ok ? res.json() : Promise.reject({...res, message: 'error'});
  }

  fetch('https://api.react-learning.ru/v2/group-7/posts', {
  headers: {
    authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjJmOTk5MmFlNWM0MGMxMGMxMWRmZTQiLCJpYXQiOjE2NDcyODY2ODEsImV4cCI6MTY3ODgyMjY4MX0.WHKXAErKZtY445yXecOFZsx981MuXicJti-okSY-tac'
  }
})
  .then(res => res.json())
  .then((result) => {
    console.log(result);
  });
  }
  getInitialPost() {
// ...
  }

// другие методы работы с API
}

