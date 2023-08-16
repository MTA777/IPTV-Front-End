import axios from "axios";

function getGenres() {
  const [genres, setGenres] = useState([]);
  const token = localStorage.getItem("jwtToken");
  const baseUrl = "https://long-cyan-elephant-sari.cyclic.app";

  useEffect(() => {
    // Fetch genres from the API with Bearer token
    async function fetchGenres() {
      try {
        const response = await axios.get(`${baseUrl}/api/genre`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // console.log({ token, baseUrl, genres });
        console.log(response.data.data);

        setGenres(response.data.data);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    }

    fetchGenres();
  }, [token]); // Include the token in the dependency array
}

export default getGenres;
