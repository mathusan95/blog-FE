console.log(
  "process env REACT_APP_DEV_REMOTE",
  process.env.REACT_APP_DEV_REMOTE
)

export const API_BASE_URL ="http://localhost:8888/api/"
export const API_BASE_URL2 = "https://dmyl03jc0l.execute-api.us-east-2.amazonaws.com/dev"
  // process.env.NODE_ENV == "production" ||
  // process.env.REACT_APP_DEV_REMOTE == "remote"
  //   ? "https://starter-mern.herokuapp.com/api/"
  //   : "http://localhost:8888/api/"

// export const API_BASE_URL = "https://starter-mern.herokuapp.com/api/";
export const ACCESS_TOKEN_NAME = "x-auth-token"
