const fetch = require("node-fetch");

const getCourierSender = async (
  message: any,
  title: any,
  email: any,
  phone: any
): Promise<any> => {
  const courier_options = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + process.env.API_COURIER_KEY, // *we can get it from secrects manager for more security
    },
    body: JSON.stringify({
      message: {
        to: {
          email: email,
          phone_number: phone,
        },
        content: {
          title: title,
          body: message,
        },
        routing: {
          method: "all",
          channels: ["sms", "email"],
        },
      },
    }),
  };

  const apiCaller = await fetch("https://api.courier.com/send", courier_options)
    .then((response) => response.json())
    .then((response) => {
      return response;
    })
    .catch((err) => {
      return err;
    });

    console.info(apiCaller)
  if (apiCaller.requestId) {
    return {
      message: "Send successuly",
      requestId: apiCaller.requestId,
      code: 200,
    };
  } else {
    return { message: "An error occured please try again later", code: 500 };
  }

 
};
export { getCourierSender };
