import axios from "axios";
const baseURL = "https://property-api-35.onrender.com/listings";

export const fetchProperties = async (props) => {
  const params = {
    county: props.county,
    listing_status: props.listing_status,
    _limit: props.limit,
  };

  const { data } = await axios({
    method: "GET",
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
    method: "GET",
    url: baseURL,
    params,
  });
  return data;
};

export const fetchSingleProperty = async (props) => {
  const response = await axios(`${baseURL}/${props.id}`);
  return response;
};

export const fetchMultipleProperty = async ({ savedIds }) => {
  const idQuery = savedIds.map((id) => `id=${id}`).join("&");
  const url = `${baseURL}?${idQuery}`;
  const response = await axios(url);
  return response;
};
