import axios from 'axios';

const homeBlogData = async (profile_id) => {
  try {
    const blogResponse = await axios.get(`http://127.0.0.1:8000/api/blogs?profile_id=${profile_id}`);
    return blogResponse.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

export default homeBlogData;
