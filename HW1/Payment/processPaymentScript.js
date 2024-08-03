import {GetProductToPurchase} from '../Utils/generalScripts.js';
import * as consts from "../Utils/consts.js";

document.addEventListener('DOMContentLoaded', function() {

    //update payment amount according to chosen product id:
    let product = GetProductToPurchase();
    document.getElementById('paymentAmount').textContent = consts.CURRENCY + product.discounted_price;

    //wait for submittion
    creditCardForm.addEventListener('submit', function(event) {
        event.preventDefault(); //disables the natural behavior of the submit action in form (which is to move to another page)

        // Validate form fields
        const cardOwnerName = document.getElementById('CardHolderName').value;
        const cardNumber = document.getElementById('cardNumber').value; //value is a field of input-form element.
        const expiryDate = document.getElementById('expiryDate').value;
        const cvv = document.getElementById('cvv').value;

        let tryAgain = false;

        if (!cardOwnerName || !cardNumber || !expiryDate || !cvv) {
            // If any field is empty, show an alert
            showAlert('All fields are required.');
            return;
        }

        let CardNameStatus = isValidCardHolderName(cardOwnerName);
        if(!CardNameStatus.isValid) 
        {
            // If name on card is not valid, show an error message
            showError(CardNameStatus.errorMsg, document.getElementById("error_cardHolderName"))
            tryAgain = true;
        }
        else
        {
            clearErrorMsg(document.getElementById("error_cardHolderName"));
        }

        let cardNumberStatus = isValidCardNumber(cardNumber);
        if (!cardNumberStatus.isValid) {
            showError(cardNumberStatus.errorMsg, document.getElementById("error_cardNumber"));
            tryAgain = true;
        }
        else
        {
            clearErrorMsg(document.getElementById("error_cardNumber"));
        }

        let cardExpirationStatus = isValidExpirationDate(expiryDate);
        if (!cardExpirationStatus.isValid) {
            showError(cardExpirationStatus.errorMsg, document.getElementById("error_expirtyDate"));
            tryAgain = true;
        }
        else
        {
            clearErrorMsg(document.getElementById("error_expirtyDate"));
        }

        let cardCvvStatus = isValidCVV(cvv);
        if (!cardCvvStatus.isValid) {
            showError(cardCvvStatus.errorMsg, document.getElementById("error_cvv"));
            tryAgain = true;
        }
        else
        {
            clearErrorMsg(document.getElementById("error_cvv"));
        }

        if(tryAgain)
        {
            return;
        }
        // If all validations pass, redirect to the thank you page
        const thankYouPageUrl = './ThankYouPage.html?productIndex=' + product.id;
        window.location.href = thankYouPageUrl;
    });

    function isValidCardHolderName(cardHolderName) {
        //expects to receive 1 word with english letters only, and then potentially receive space char and another word.
        let ccName = new RegExp('^[a-zA-Z]+( [a-zA-Z]+)?$'); 
        let isValidFormat = ccName.test(cardHolderName);
        return {isValid: isValidFormat, errorMsg: "Invalid input: Should consist of English letters only in format \"John\" or \"John Smith\"."}
    }

    function isValidCardNumber(cardNumber) {
        // check valid card number has 16 digits
        let ccNumRegex = new RegExp('^\\d{' + consts.CC_DIGITS + '}$');
        let isValidFormat = ccNumRegex.test(cardNumber);
        return {isValid: isValidFormat, errorMsg: "Invalid card number: Should consist of 16 digits."};
    }

    function isValidExpirationDate(expiryDate) {
        let resObj = {isValid: true, errorMsg: ""};

        // check valid date has the format MM/YY
        let ccExpRegex = new RegExp('^\\d{' + consts.CC_EXP_DIGITS + '}\/\\d{' + consts.CC_EXP_DIGITS +'}$');
        let isValidFormat = ccExpRegex.test(expiryDate);

        if (isValidFormat)
        {
            let month = expiryDate.substring(0,2);
            let year = expiryDate.substring(3,5);
            let givenDateString = "20" + year + "-" + month + "-" + "31";
            
            if(parseInt(month) > 12)
            {
                //invalid month number
                resObj.isValid = false;
                resObj.errorMsg = "Invalid value: Month isn't valid. ";
                return resObj;
            }

            let currDate = new Date();
            let givenDate = new Date(givenDateString);

            if(givenDate < currDate)
            {
                //invalid date - we passed it already.
                resObj.isValid = false;
                resObj.errorMsg = "Invalid value: Date has passed.";
                return resObj;
            }
            return resObj;
        }
        resObj.isValid = false;
        resObj.errorMsg = "Invalid date format: Should enter MM/YY."
        return resObj;
    }

    function isValidCVV(cvv) {
        // check valid cvv number has 3 digits
        let ccCvvRegex = new RegExp('^\\d{' + consts.CC_CVV_DIGITS + '}$');
        return {isValid: ccCvvRegex.test(cvv), errorMsg: "Invalid CVV: Should consist of 3 digits."};
    }

    function showAlert(message) {
        alert(message);
    }

    function showError(message, ErrorElement)
    {
        ErrorElement.textContent = message;
    }

    function clearErrorMsg(ErrorElement)
    {
        ErrorElement.textContent = "";
    }
});
