import axios from "axios";
const baseUrl = "https://kaaleppi.herokuapp.com/";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then(response => response.data);
};

const create = ne => {
  const request = axios.post(baseUrl, {'text': ne});
  return request.then(response => response.data);
};

const getNewQuote = () => {
  const request = axios.get(baseUrl+'dailyQuote')
  return request;
  /*let oikea = request.then((response) => {
    console.log(response.data[3].text)
    return(response.data[3].text)
  })*/
  
};

export default {
  getAll,
  create,
  getNewQuote,
};