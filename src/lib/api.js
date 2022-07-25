import axios from 'axios';
const baseURL = 'https://property-test.herokuapp.com/listings';

export const fetchProperties = async (props) => {
  const params = {
    county: props.county,
    order_by: 'id',
    ordering: 'ascending',
    listing_status: props.listing_status,
    _limit: props.limit,
  };

  const { data } = await axios({
    method: 'GET',
    url: baseURL,
    params,
  });
  console.log(data);
  return data;
};

export const fetchNoLocation = async (props) => {
  const params = {
    order_by: 'id',
    ordering: 'ascending',
    listing_status: props.listing_status,
    _limit: props.limit,
  };

  const { data } = await axios({
    method: 'GET',
    url: baseURL,
    params,
  });
  console.log(data);
  return data;
};

export const fetchSingleProperty = async (props) => {
  const params = {
    county: props.county,
    order_by: 'id',
    ordering: 'ascending',
    listing_status: props.listing_status,
    _limit: props.limit,
  };

  const { data } = await axios({
    method: 'GET',
    url: baseURL,
    params,
  });
  console.log(data);
  return data;
};
