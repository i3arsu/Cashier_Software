import axios from "axios";
import { useQuery } from "react-query";

const fetchUsers = () =>
  axios
    .get("https://www.swapi.tech/api/people")
    .then((response) => response.data.results);

export default function useUsers() {
  return useQuery("users", fetchUsers);
}
