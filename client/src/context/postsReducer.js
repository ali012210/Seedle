export const postsReducer = (state, action) => {
    switch(action.type) {
        case 'FETCH_POSTS':
            return {
                ...state,
                posts: [...state.posts, ...action.payload.posts],
                hasMore: action.payload.hasMore,
                isLoading: false,
            };
        case 'START_LOADING':
            return {
                ...state,
                isLoading: true,
            };
        case 'ERROR':
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };
        case 'LIKE_POST':
            return {
                ...state,
                posts: state.posts.map((post) => 
                    post.id === action.payload.postId ? { ...post, seeds: post.seeds + 1 } : post
                ),
            };
        case 'UNLIKE_POST':
            return {
                ...state,
                posts: state.posts.map((post) => 
                    post.id === action.payload.postId ? { ...post, seeds: Math.max(post.seeds - 1, 0) } : post
                ),
            };
        case 'INCREMENT_COMMENT_COUNT':
            return {
                ...state,
                posts: state.posts.map((post) => 
                    post.id === action.payload.postId ? { ...post, commentCount: post.commentCount + 1 } : post
                ),
            };
        default:
            return state;
    }
};