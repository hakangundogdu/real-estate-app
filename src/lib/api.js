import axios from 'axios';
const baseURL = 'https://property-test.herokuapp.com/listings';

export const fetchProperties = async (props) => {
  const params = {
    county: props.county,
    listing_status: props.listing_status,
    _limit: props.limit,
  };

  const { data } = await axios({
    method: 'GET',
    url: baseURL,
    params,
  });
  return data;
};

export const fetchNoLocation = async (props) => {
  const params = {
    listing_status: props.listing_status,
  };

  const { data } = await axios({
    method: 'GET',
    url: baseURL,
    params,
  });
  return data;
};

export const fetchSingleProperty = async (props) => {
  const response = await axios(`baseUrl/${props.id}`);
  return response;
};
