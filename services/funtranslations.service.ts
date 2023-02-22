const fetch  = require("node-fetch");

const {
  FUN_TRANSLATION_URL,
} = require("../constants");



  const getMorseTranslation = async (

    messageInput: any
  ): Promise<  any >  =>{
    const morse_options = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };

    const original_message = messageInput;
    let message : String = "";
    let code = 200;
    try {
      const morse_endpoint =
      FUN_TRANSLATION_URL+"?text=" +
        original_message;

      const morse_response = await fetch(morse_endpoint, morse_options);
      // .then(response => response.json())
      // .then(response => console.log(response.contents.translated))
      // .catch(err => console.error(err));
      const translation = await morse_response.json();
      message = translation.contents.translated;
    } catch (error:any) {
      message = "error api transaltion: " + error.message;
      code = 500;
    }

    return {message,code};
  
}
export { getMorseTranslation };
