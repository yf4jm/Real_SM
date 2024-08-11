import Api from "../AxiosInstance";

const toggleLike = async (post_id, post_type) => {
  try {
    const response = await Api.post(`http://127.0.0.1:8000/api/${post_type}/${post_id}/like/`)
    return response.data;
  } catch (error) {
    console.error("Error toggling like:", error);
  }
};
export default toggleLike
