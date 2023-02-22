if (process.env.ENVIRONMENT !== "production") require("dotenv").config();

const {
  CLIENT_SECRET_KEY = "XXXXXXX", //key dropbox from gestion de secret
  SHARED_SECRET_KEY = "XXXXXX", //happeo-shared-secret from gestion de secret
  KMS_LOCATION = "europe-west1", //kms manager location
  PROJECT_NAME = "XXXXXXX", //Project name 
  KEYRING_NAME = "XXXXXX", //keyringname
  OAUTH_CALLBACK_URL = "http://localhost:8081/auth", //Callback Url dropbox
} = process.env;

//link project from kms
const SECRETS_PROJECT = `projects/${PROJECT_NAME}`;
//link keyring address from kms
const KEYRING_ADDRESS = `projects/${PROJECT_NAME}/locations/${KMS_LOCATION}/keyRings/${KEYRING_NAME}`;


const FUN_TRANSLATION_URL = "https://api.funtranslations.com/translate/morse.json"

//search allowed params   
enum SearchQueryParams {
  message = "message",
  code = "code",
}

//name secret from kms
const TOKEN_HASH_SECRET_NAME = "XXXXXX"; 
//Expiration JWT
const EXPIRES_IN = "900min";
export {
  SearchQueryParams,
  EXPIRES_IN,
  FUN_TRANSLATION_URL,
  SHARED_SECRET_KEY
};
