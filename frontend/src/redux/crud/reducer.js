import * as actionTypes from "./types";

const INITIAL_KEY_STATE = {
  result: null,
  current: null,
  isLoading: false,
  isSuccess: false,
};

const INITIAL_STATE = {
  current: {
    result: null,
  },
  list: {
    result: {
      items: [],
      pagination: {
        current: 1,
        pageSize: 10,
        total: 1,
      },
    },
    isLoading: false,
    isSuccess: false,
  },
  create: INITIAL_KEY_STATE,
  update: INITIAL_KEY_STATE,
  delete: INITIAL_KEY_STATE,
  read: INITIAL_KEY_STATE,
  search: { ...INITIAL_KEY_STATE, result: [] },
  searchString: "",
  createModalStatus: null,
  tagsDataStatus: null,
  tagsData: null,
};

const crudReducer = (state = INITIAL_STATE, action) => {
  const { payload, keyState } = action;
  switch (action.type) {
    case actionTypes.RESET_STATE:
      return INITIAL_STATE;
    case actionTypes.CURRENT_ITEM:
      return {
        ...state,
        current: {
          result: payload,
        },
      };
    case actionTypes.REQUEST_LOADING:
      return {
        ...state,
        [keyState]: {
          ...state[keyState],
          isLoading: true,
        },
      };
    case actionTypes.REQUEST_FAILED:
      return {
        ...state,
        [keyState]: {
          ...state[keyState],
          isLoading: false,
          isSuccess: false,
        },
      };
    case actionTypes.REQUEST_SUCCESS:
      return {
        ...state,
        [keyState]: {
          ...state[keyState],
          result: payload,
          isLoading: false,
          isSuccess: true,
        },
      };
    case actionTypes.CURRENT_ACTION:
      return {
        ...state,
        [keyState]: {
          ...INITIAL_KEY_STATE,
          current: payload,
        },
      };
    case actionTypes.RESET_ACTION:
      return {
        ...state,
        [keyState]: {
          ...INITIAL_STATE[keyState],
        },
      };
    case actionTypes.SET_SERACH_STRING:
      return {
        ...state,
        searchString: action.payload,
      };
    case actionTypes.SET_FILTER_STRING:
      return {
        ...state,
        filterString: action.payload,
      };
    case actionTypes.SET_CREATE_MODAL_OPEN:
      return {
        ...state,
        createModalStatus: true,
      };
    case actionTypes.SET_CREATE_MODAL_CLOSE:
      return {
        ...state,
        createModalStatus: false,
      };
    case actionTypes.TAGS_GET_SUCCESS:
      return {
        ...state,
        tagsDataStatus: true,
        tagsData: action.payload,
        isLoading:false
      };
    case actionTypes.TAGS_REQUEST_LOADING:
      return {
        ...state,
        tagsDataStatus: null,
        isLoading:true
        
      };
    case actionTypes.TAGS_GET_FAILURE:
      return {
        ...state,
        tagsDataStatus: false,
        tagsData: action.payload,
      };
      case actionTypes.TAG_CREATE:
      return {
        ...state,
        tagsCreateStatus: null,
        isLoading:null,
      };
      case actionTypes.TAG_CREATE_SUCCESS:
        return {
          ...state,
          tagsCreateStatus: action.payload,
          isLoading:true
        };
      case actionTypes.TAG_CREATE_FAILURE:
        return {
          ...state,
          tagsCreateStatus: action.payload,
          isLoading:false
        };
    default:
      return state;
  }
};

export default crudReducer;
