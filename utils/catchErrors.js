function catchErrors(error, displayError) {
    let errorMsg;
    if (error.response) {
        //The request was made  and the server  responded with a status code that is not a range of 2xx
        errorMsg = error.response.data;

        console.error("Error Response", errorMsg)

        //For cloudinary Image Upload
        if (error.response.data.error) {
            errorMsg = error.response.data.error.message
        }
    } else if (error.request) {
        //The request was made bot no resposne received
        errorMsg = error.response
        console.error("Error Request", errorMsg)

    } else {
        //Something  else happened in making  the request  taht trigerred an error
        errorMsg = error.message
        console.error("Error Message", errorMsg)
    }
    displayError(errorMsg)
}

export default catchErrors