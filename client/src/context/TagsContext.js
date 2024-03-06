import React, { createContext, useReducer, useContext } from 'react';

const initialState = {
  broaderTags: {
    PlantCareBasics: ['Watering Tips', 'Soil Health', 'Sunlight Requirements', 'Pruning Techniques', 'Repotting'],
    PlantHealthAndGardeningTechniques: ['Pest Management', 'Disease Prevention', 'Nutrient Management', 'Leaf Care', 'Root Care', 'Organic Gardening', 'Hydroponics', 'Vertical Gardening', 'Container Gardening', 'Companion Planting'],
    PlantTypes: ['Indoor Plants', 'Garden Plants', 'Edible Plants', 'Medicinal Plants', 'Ornamental Plants', 'Succulents', 'Cacti', 'Native Plants', 'Other Plants'],
    EnvironmentalConcerns: ['Sustainability Practices', 'Water Conservation', 'Composting', 'Biodiversity', 'Climate Adaptation'],
    CommunityAndEducation: ['Plant Swap', 'Gardening Events', 'Community Gardens', 'Gardening Clubs', 'Volunteer Opportunities', 'Gardening Workshops', 'Plant Identification', 'Horticultural Research', 'Gardening Books', 'Online Courses'],
    PlantAestheticsAndSpecialInterest: ['Landscape Design', 'Indoor Decor', 'Garden Art', 'Flower Arranging', 'Bonsai', 'Rare Plants', 'Exotic Plants'],
    SeasonalCare: ['Spring Gardening', 'Summer Maintenance', 'Fall Preparation', 'Winter Protection', 'Year-round Care'],
    ForumFunctionalityAndOtherConcerns: ['Seedle', 'Help'],
    }, 
  selectedTags: [],

  plantCategories: {
    HousePlants: ['African Violet', 'Anthurium', 'Areca Palm', 'Bird of Paradise', 'Boston Fern', 'Calathea', 'Chinese Money Plant', 'Croton', 'English Ivy', 'Fiddle Leaf Fig', 'Golden Pothos', 'Majesty Palm', 'Money Tree', 'Monstera Deliciosa', 'Peace Lily', 'Philodendron', 'Prayer Plant', 'Rubber Plant', 'Snake Plant', 'Spider Plant', 'Swiss Cheese Plant', 'ZZ Plant'],
    SucculentsAndCacti: ['Aloe Vera', 'Cactus', 'Jade Plant', 'Succulents'],
    Herbs: ['Basil', 'Bay Laurel', 'Borage', 'Catnip', 'Chives', 'Cilantro', 'Mint', 'Oregano', 'Parsley', 'Rosemary', 'Tarragon', 'Thyme'],
    GardenFlowers: ['Aster', 'Begonia', 'Black-eyed Susan', 'Bluebells', 'Cosmos', 'Crocus', 'Daffodil', 'Dahlia', 'Daisy', 'Geranium', 'Hibiscus', 'Hydrangea', 'Impatiens', 'Iris', 'Kalanchoe', 'Lily', 'Marigold', 'Morning Glory', 'Orchid', 'Pansy', 'Peony', 'Petunia', 'Poppy', 'Rose', 'Snapdragon','Sunflower', 'Sweet Pea', 'Tulip', 'Violet', 'Zinnia'],
    Ornamental: ['Azalea', 'Bamboo Palm', 'Bougainvillea', 'Camellia', 'Dracaena', 'Gardenia'],
    Medicinal: ['Chamomile', 'Echinacea', 'Lavender', 'Lemon Balm', 'Sage', 'St. Johns Wort', 'Valerian'],
    Other: ['Amaryllis', 'Bromeliads', 'Chrysanthemum', 'Cyclamen', 'Foxglove', 'Lily of the Valley', 'Pothos', 'Sago Palm'],
  }
};

export const TagsContext = createContext();

const actionTypes = {
    SET_SELECTED_TAGS: 'SET_SELECTED_TAGS',
    CLEAR_SELECTED_TAGS: 'CLEAR_SELECTED_TAGS',
    // Additional actions can be added here as needed
};

const tagsReducer = (state, action) => {
    switch (action.type) {
        case actionTypes.SET_SELECTED_TAGS:
            return {
                ...state,
                selectedTags: action.payload,
            };
        case actionTypes.CLEAR_SELECTED_TAGS:
            return {
                ...state,
                selectedTags: [],
            };
        default:
            return state;
    }
};

export const TagsProvider = ({ children }) => {
    const [state, dispatch] = useReducer(tagsReducer, initialState);

    // Action creators
    const setSelectedTags = (tags) => {
        dispatch({ type: actionTypes.SET_SELECTED_TAGS, payload: tags });
    };

    const clearSelectedTags = () => {
        dispatch({ type: actionTypes.CLEAR_SELECTED_TAGS });
    };

    return (
        <TagsContext.Provider value={{ state, setSelectedTags, clearSelectedTags }}>
            {children}
        </TagsContext.Provider>
    );
};

// Custom hook to consume the tags context
export const useTags = () => useContext(TagsContext);