import axios from 'axios';

const API_KEY = process.env.REACT_APP_ZOOPLA_API_KEY;

export const fetchListings = async () => {
  const { data } = await axios({
    method: 'GET',
    url: 'https://zoopla.p.rapidapi.com/properties/list',
    params: {
      area: 'London',
      category: 'residential',
      order_by: 'age',
      ordering: 'descending',
      page_number: '1',
      page_size: '20',
      listing_status: 'sale',
    },
    headers: {
      'x-rapidapi-host': 'zoopla.p.rapidapi.com',
      'x-rapidapi-key': API_KEY,
    },
  });

  console.log(data);

  return data;
};
