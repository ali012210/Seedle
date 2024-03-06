import axios from 'axios';

// Assuming the base URL of your API and the endpoint for tags
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';
const POSTS_ENDPOINT = '/posts';

// Axios instance for making HTTP requests
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

// Tags are hardcoded, reflecting an unmodifiable set
const hardcodedTags = [
    'Watering Tips', 'Soil Health', 'Sunlight Requirements', 'Pruning Techniques', 'Repotting', 'Pest Management', 'Disease Prevention', 'Nutrient Management', 'Leaf Care', 'Root Care', 'Organic Gardening', 'Hydroponics', 'Vertical Gardening', 'Container Gardening', 'Companion Planting', 'Indoor Plants', 'Garden Plants', 'Edible Plants', 'Medicinal Plants', 'Ornamental Plants', 'Succulents', 'Cacti', 'Native Plants', 'Other Plants', 'Sustainability Practices', 'Water Conservation', 'Composting', 'Biodiversity', 'Climate Adaptation', 'Plant Swap', 'Gardening Events', 'Community Gardens', 'Gardening Clubs', 'Volunteer Opportunities', 'Gardening Workshops', 'Plant Identification', 'Horticultural Research', 'Gardening Books', 'Online Courses', 'Landscape Design', 'Indoor Decor', 'Garden Art', 'Flower Arranging', 'Bonsai', 'Rare Plants', 'Exotic Plants', 'Spring Gardening', 'Summer Maintenance', 'Fall Preparation', 'Winter Protection', 'Year-round Care', 'Seedle', 'Help', 'African Violet', 'Anthurium', 'Areca Palm', 'Bird of Paradise', 'Boston Fern', 'Calathea', 'Chinese Money Plant', 'Croton', 'English Ivy', 'Fiddle Leaf Fig', 'Golden Pothos', 'Majesty Palm', 'Money Tree', 'Monstera Deliciosa', 'Peace Lily', 'Philodendron', 'Prayer Plant', 'Rubber Plant', 'Snake Plant', 'Spider Plant', 'Swiss Cheese Plant', 'ZZ Plant', 'Aloe Vera', 'Cactus', 'Jade Plant', 'Succulents', 'Basil', 'Bay Laurel', 'Borage', 'Catnip', 'Chives', 'Cilantro', 'Mint', 'Oregano', 'Parsley', 'Rosemary', 'Tarragon', 'Thyme', 'Aster', 'Begonia', 'Black-eyed Susan', 'Bluebells', 'Cosmos', 'Crocus', 'Daffodil', 'Dahlia', 'Daisy', 'Geranium', 'Hibiscus', 'Hydrangea', 'Impatiens', 'Iris', 'Kalanchoe', 'Lily', 'Marigold', 'Morning Glory', 'Orchid', 'Pansy', 'Peony', 'Petunia', 'Poppy', 'Rose', 'Snapdragon','Sunflower', 'Sweet Pea', 'Tulip', 'Violet', 'Zinnia','Azalea', 'Bamboo Palm', 'Bougainvillea', 'Camellia', 'Dracaena', 'Gardenia', 'Chamomile', 'Echinacea', 'Lavender', 'Lemon Balm', 'Sage', 'St. Johns Wort', 'Valerian', 'Amaryllis', 'Bromeliads', 'Chrysanthemum', 'Cyclamen', 'Foxglove', 'Lily of the Valley', 'Pothos', 'Sago Palm'
];

export const tagsService = {
  // Function to get all tags
  fetchTags: async () => {
    // Directly return the hardcoded set of tags
    return Promise.resolve(hardcodedTags);
  },

  // Function to filter posts by tag
  // Assuming the backend supports filtering posts by tags through a query parameter
  fetchPostsByTag: async (tagName) => {
    try {
      const response = await axiosInstance.get(`${POSTS_ENDPOINT}?tag=${encodeURIComponent(tagName)}`);
      return response.data; // Assuming the data contains an array of posts filtered by the tag
    } catch (error) {
      throw error.response.data;
    }
  },

  // Since tags are hardcoded and unmodifiable, functions for creating, updating, or deleting tags are omitted.
};

