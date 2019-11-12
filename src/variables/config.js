const config = {
  env: process.env.ENV,
  port: process.env.PORT,
  domain: process.env.REACT_APP_DOMAIN,
  google_maps_key: process.env.REACT_APP_GOOGLE_MAPS_KEY,
  graphQlHost: process.env.REACT_APP_GRAPH_HOST,
  static: process.env.REACT_APP_STATIC_PAGES,
  token_name: 'id_token',
  admin_email: 'admin@spacenow.com',
  facebook_app_id: process.env.REACT_APP_FACEBOOK_APP_ID,
  google_app_id: process.env.REACT_APP_GOOGLE_APP_ID,
  assetsAPI: process.env.REACT_APP_ASSETS_API_HOST
}

export default config
