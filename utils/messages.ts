export const returnRes = (
    statusCode : number,
    message: string,
    data?: Array<unknown> | object,
  ) => ({
    statusCode, 
    success: (statusCode === 200 || statusCode === 201), 
    message, 
    data,
  });

export const msgs = {
    noAccess: 'You have no permission.',
    jwt : {
        tokenExpired: "Token Expired",
        invalidToken : "Invalid Token",
        authMissing: "Authorization is not found",
        tokenMissing: "Auth token is not found"
    },
    emailExist : "emailExist",
    registered: "User registered",
    somethingWrong : "Something went Wrong"
}