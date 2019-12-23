import { combineReducers, createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import postsReducer from './store/posts';
import currentPostReducer from './store/currentPost';
import authReducer from './store/auth';

const rootReducer = combineReducers({
    posts: postsReducer,
    currentPost: currentPostReducer,
    user: authReducer
});

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
