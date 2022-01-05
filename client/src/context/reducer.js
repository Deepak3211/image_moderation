import {SET_POSTS, SET_USER} from './action.types';

export const initialState = {
  user: JSON.parse(sessionStorage.getItem('userData')) || null,
  posts : []
};

const reducer = (state, action) =>{
  // console.log(action);
  // console.log('state',state);
  switch(action.type){
    case SET_USER:
      return {
        ...state,
        user: action.user
      }
    case SET_POSTS:
      return {
        ...state,
        posts: action.posts
      }
      default:
        return state;
  }
};
export default reducer;

