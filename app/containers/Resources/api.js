import axios from 'axios';

// post van
export const postResource = (body) => axios.post('http://localhost:1337/resource', body).then(res => {
  console.log(res);
  return res.data.user.id;
})
