import axios from "axios";
import { useQuery } from "react-query";

const fetchItems = () =>
  axios
    .get("https://www.swapi.tech/api/people")
    .then((response) => response.data.results);

export default function useItems() {
  return useQuery("users", fetchItems);
}
