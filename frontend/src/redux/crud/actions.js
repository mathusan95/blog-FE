import * as actionTypes from "./types";
import { request } from "@/request";

export const crud = {
  resetState: () => async (dispatch) => {
    dispatch({
      type: actionTypes.RESET_STATE,
    });
  },
  resetAction: (actionType) => async (dispatch) => {
    dispatch({
      type: actionTypes.RESET_ACTION,
      keyState: actionType,
      payload: null,
    });
  },
  currentItem: (data) => async (dispatch) => {
    dispatch({
      type: actionTypes.CURRENT_ITEM,
      payload: { ...data },
    });
  },
  currentAction: (actionType, data) => async (dispatch) => {
    dispatch({
      type: actionTypes.CURRENT_ACTION,
      keyState: actionType,
      payload: { ...data },
    });
  },
  list:
    (entity, page, filters, searchString, sortingObj) => async (dispatch) => {
      dispatch({
        type: actionTypes.REQUEST_LOADING,
        keyState: "list",
        payload: null,
      });

      // console.log(entity, page, filters = "REGISTERED", searchString,"sortingObj>>>>>>")

      filters = filters && filters.length ? filters : null;
      searchString = searchString && searchString.length ? searchString : null;
      sortingObj = sortingObj ? sortingObj : null;

      let data = await request.list(entity, {
        page: page,
        limit: 20,
        filters,
        searchString,
        sortingObj,
      });
      if (data.success === true) {
        const result = {
          items: data.data,
          pagination: {
            current: page,
            pageSize: 20,
            total: data.totalCount,
          },
        };
        dispatch({
          type: actionTypes.REQUEST_SUCCESS,
          keyState: "list",
          payload: result,
        });
      } else {
        dispatch({
          type: actionTypes.REQUEST_FAILED,
          keyState: "list",
          payload: null,
        });
      }
    },
  create: (entity, jsonData) => async (dispatch) => {
    dispatch({
      type: actionTypes.REQUEST_LOADING,
      keyState: "create",
      payload: null,
    });
    console.log("jsonData action redux", jsonData);
    let data = await request.create(entity, jsonData);

    if (data.success === true) {
      dispatch({
        type: actionTypes.REQUEST_SUCCESS,
        keyState: "create",
        payload: data.result,
      });

      dispatch({
        type: actionTypes.CURRENT_ITEM,
        payload: data.result,
      });
    } else {
      dispatch({
        type: actionTypes.REQUEST_FAILED,
        keyState: "create",
        payload: null,
      });
    }
  },

  createTags: (entity,jsonData) => async (dispatch) => {

    console.log(entity,jsonData,"jjkkkss")
    dispatch({
      type: actionTypes.TAG_CREATE,
    });

    let data = await request.createTagsData(entity,jsonData);
    if (data.success) {
      dispatch({
        type: actionTypes.TAG_CREATE_SUCCESS,
        payload: true,
      });
      dispatch(crud.list(entity, 1, "", "", ""));
    } else {
      dispatch({
        type: actionTypes.TAG_CREATE_FAILURE,
        payload: false,
      });
    }
  },
  getTags: (entity) => async (dispatch) => {
    dispatch({
      type: actionTypes.TAGS_REQUEST_LOADING,
    });
    let data = await request.getTags(entity);

    console.log(data, ">>>>>");
    if (data.success === true) {
      dispatch({
        type: actionTypes.TAGS_GET_SUCCESS,
        payload: data,
      });
    } else {
      dispatch({
        type: actionTypes.TAGS_GET_FAILURE,
        payload: null,
      });
    }
  },
  read: (entity, itemId) => async (dispatch) => {
    dispatch({
      type: actionTypes.REQUEST_LOADING,
      keyState: "read",
      payload: null,
    });

    let data = await request.read(entity, itemId);

    if (data.success === true) {
      dispatch({
        type: actionTypes.CURRENT_ITEM,
        payload: data.result,
      });
      dispatch({
        type: actionTypes.REQUEST_SUCCESS,
        keyState: "read",
        payload: data.result,
      });
    } else {
      dispatch({
        type: actionTypes.REQUEST_FAILED,
        keyState: "read",
        payload: null,
      });
    }
  },
  update: (entity, itemId, jsonData) => async (dispatch) => {
    dispatch({
      type: actionTypes.REQUEST_LOADING,
      keyState: "update",
      payload: null,
    });

    let data = await request.update(entity, itemId, jsonData);

    if (data.success === true) {
      dispatch({
        type: actionTypes.REQUEST_SUCCESS,
        keyState: "update",
        payload: data.result,
      });
      dispatch({
        type: actionTypes.CURRENT_ITEM,
        payload: data.result,
      });
    } else {
      dispatch({
        type: actionTypes.REQUEST_FAILED,
        keyState: "update",
        payload: null,
      });
    }
  },

  delete: (entity, itemId) => async (dispatch) => {
    dispatch({
      type: actionTypes.REQUEST_LOADING,
      keyState: "delete",
      payload: null,
    });

    let data = await request.delete(entity, itemId);

    if (data.success === true) {
      dispatch({
        type: actionTypes.REQUEST_SUCCESS,
        keyState: "delete",
        payload: data.result,
      });
    } else {
      dispatch({
        type: actionTypes.REQUEST_FAILED,
        keyState: "delete",
        payload: null,
      });
    }
  },

  search: (entity, source, option) => async (dispatch) => {
    dispatch({
      type: actionTypes.REQUEST_LOADING,
      keyState: "search",
      payload: null,
    });

    source.cancel();

    source = request.source();
    let data = await request.search(entity, source, option);

    if (data.success === true) {
      dispatch({
        type: actionTypes.REQUEST_SUCCESS,
        keyState: "search",
        payload: data.result,
      });
    } else {
      dispatch({
        type: actionTypes.REQUEST_FAILED,
        keyState: "search",
        payload: null,
      });
    }
  },
  setSearch: (searchString) => async (dispatch) => {
    dispatch({
      type: actionTypes.SET_SERACH_STRING,
      keyState: "search",
      payload: searchString,
    });
  },

  createPost: (payload) => async (dispatch) => {
    await request.post("post", payload);
    // if (data.success) {
    //   dispatch(crud.toggleCreateModal(false));
    // }
  },
  setFilter: (filterString) => async (dispatch) => {
    dispatch({
      type: actionTypes.SET_FILTER_STRING,
      keyState: "filter",
      payload: filterString,
    });
  },
  toggleCreateModal: (status) => async (dispatch) => {
    dispatch({
      type: status
        ? actionTypes.SET_CREATE_MODAL_OPEN
        : actionTypes.SET_CREATE_MODAL_CLOSE,
      keyState: "filter",
      payload: status,
    });
  },
};
