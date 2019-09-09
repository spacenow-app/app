const config = {
  env: process.env.ENV,
  port: process.env.PORT,
  google_maps_key: process.env.REACT_APP_GOOGLE_MAPS_KEY,
  graphQlHost: process.env.REACT_APP_GRAPH_HOST,
  legacy: process.env.REACT_APP_LEGACY,
  token_name: 'id_token',
  admin_email: 'admin@spacenow.com',
  facebook_app_id: process.env.REACT_APP_FACEBOOK_APP_ID,
  google_app_id: process.env.REACT_APP_GOOGLE_APP_ID
}

export default config
