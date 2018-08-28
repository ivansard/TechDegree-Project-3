document.addEventListener('DOMContentLoaded', () => {

 const firstInputField = document.querySelector('#name');
 const jobSelectField = document.querySelector('#title');
 const jobFieldSet = document.querySelector('.job');


//Focus first input field on page load

  firstInputField.focus();

//Hide other job description text-area

  function initialHideOfTextArea(){
      document.querySelector('#other-title').style.display = 'none';
  }
  initialHideOfTextArea();


  jobSelectField.addEventListener('change', (event) =>{
    //If 'other' is clicked, display the job descirption textarea
    //If a option which is not 'other' is chosen, hide the textarea

    if(event.target.value === 'other'){
      document.querySelector('#other-title').style.display = '';
    } else{
      document.querySelector('#other-title').style.display = 'none';
      document.querySelector('#other-title').value = '';
      document.querySelector('#other-title').placeholder = 'Your job role';
    }

   })

  // T-Shirt Info” section
  // For the T-Shirt "Color" menu, only display the color options that match the design selected in the "Design" menu.
  // If the user selects "Theme - JS Puns" then the color menu should only display "Cornflower Blue," "Dark Slate Grey," and "Gold."
  // If the user selects "Theme - I ♥ JS" then the color menu should only display "Tomato," "Steel Blue," and "Dim Grey."
  // When a new theme is selected from the "Design" menu, the "Color" field and drop down menu is updated.

  // Hide the "Color" label and select menu until a T-Shirt design is selected from the "Design" menu

  //Initial hiding of the color label
  const colorDiv = document.querySelector('#colors-js-puns');
  colorDiv.style.display = 'none';

  //Adding classes to the color elements based on their design
  const colorSelectField = document.querySelector('#color')
  const colors = colorSelectField.children;
  for (var i = 0; i < colors.length; i++) {
    if(colors[i].textContent.includes(`I \u2665 JS`)){
      colors[i].className = "heart js";
    } else if(colors[i].textContent.includes('JS Puns')){
      colors[i].className = "js puns";
    }
  }

  // Based on the selected value of the design option, appropriate colors
  // are available in the color select option
  const designSelectField = document.querySelector('#design');
  designSelectField.addEventListener('change', (event) =>{

    switch (event.target.value) {
      case "js puns":
        colorDiv.style.display = 'block';
        for (var i = 0; i < colors.length; i++) {
          if(colors[i].className !== event.target.value){
            colors[i].style.display = 'none';
          } else{
            colors[i].style.display = '';
            colorSelectField.value = colors[i].value;
          }
        }
      break;
      case "heart js":
        colorDiv.style.display = 'block';
        for (var i = 0; i < colors.length; i++) {
          if(colors[i].className !== event.target.value){
            colors[i].style.display = 'none';
          } else{
            colors[i].style.display = '';
            colorSelectField.value = colors[i].value;
          }
        }
      break;
      default:
      for (var i = 0; i < colors.length; i++) {
        if(colors[i].className !== event.target.value){
            colors[i].style.display = '';
            colorSelectField.value = '';
        }
      }
      break;
    }
  });


  //Function that returns the day and time of an activity
  function getDayAndTimeOfActivity(activityCheckbox){
    return activityCheckbox.parentNode.textContent.split('—')[1];
  }


  const activitiesFieldset = document.querySelector('.activities');
  const activityCheckboxes = document.querySelectorAll('.activities label input');

  //Creating variables for the total payout amount, and the adequate message
  let totalPayout = 0;
  const payoutMessage = document.createElement('p');

  //Initial hiding of the message, and appending it to the activity fieldset
  function createAndAppendPayoutMessage(){
    payoutMessage.textContent = `Your total amount is: $${totalPayout}`;
    payoutMessage.style.display = 'none';
    activitiesFieldset.appendChild(payoutMessage);
  }

  createAndAppendPayoutMessage();

  //Event listener when a checkbox is checked
  activitiesFieldset.addEventListener('change', (event) =>{
    const checkbox =  event.target;
    const checked =  checkbox.checked;

    const dayAndTimeOfActivity = getDayAndTimeOfActivity(checkbox);
    const activity = checkbox.parentNode.textContent;
    const priceOfActivity = activity.split('$')[1];
    //If checked, find all checkboxes with the same time and disable them
    //If unchecked, find all checkboxes with the same time and enable them
    if(checked){

      //Updating and displaying the amount and message
      totalPayout += parseInt(priceOfActivity);
      payoutMessage.textContent = `Your total amount is:  $${totalPayout}`
      payoutMessage.style.display = 'block';
      //Disabling activities which are at the same time
      for (var i = 0; i < activityCheckboxes.length; i++) {
        if(getDayAndTimeOfActivity(activityCheckboxes[i]) === dayAndTimeOfActivity && activityCheckboxes[i] !== checkbox){
          activityCheckboxes[i].disabled = true;
          activityCheckboxes[i].parentNode.style.color = 'grey';
          }
        }
      } else{
      //Updating amount and message, and if amount is 0 no message is displayed
      totalPayout -= parseInt(priceOfActivity);
      payoutMessage.textContent = `Your total amount is: $${totalPayout}`
      if(totalPayout === 0){
        payoutMessage.style.display = 'none';
      }
      //Enabling activities which had been disabled
      for (var i = 0; i < activityCheckboxes.length; i++) {
        if(getDayAndTimeOfActivity(activityCheckboxes[i]) === dayAndTimeOfActivity && activityCheckboxes[i] !== checkbox){
          activityCheckboxes[i].disabled = false;
          activityCheckboxes[i].parentNode.style.color = '#000';
        }
      }
    }
  });


  //Setting credit card to be displayed
    function setCreditCardSectionAsDefault(){
      const paymentSelectField = document.querySelector('#payment');
      paymentSelectField.value = 'credit card';
      const payPalSection = document.querySelector('#pay-pal');
      payPalSection.style.display = 'none';
      const bitcoinSection = document.querySelector('#bitcoin');
      bitcoinSection.style.display = 'none';
    };

    setCreditCardSectionAsDefault();

    //Disabling the 'select payment method' option
    function disableSelectPaymentOption(){
      const selectPaymentMethod = document.querySelector('#payment');
      const selectPaymentMethodOption = document.querySelector("option[value='select_method']");
      selectPaymentMethodOption.disabled = true;
    };

    disableSelectPaymentOption();

    function displayBlockElement(element){
      element.style.display = 'block';
    }
    function hideBlockElements(element1, element2){
      element1.style.display = 'none';
      element2.style.display = 'none';
    }

    //Saving the selected method to a variable, it will be needed later for validation
    const selectPaymentMethod = document.querySelector('#payment');
    let selectedMethod = 'credit card';

    //Adding event listener to the payment method select element
    selectPaymentMethod.addEventListener('change', (event) =>{
      //Based on the chosen option, display it, and hide the others
      const creditCardSection = document.querySelector('#credit-card');
      const payPalSection = document.querySelector('#pay-pal');
      const bitcoinSection = document.querySelector('#bitcoin');
      selectedMethod = event.target.value;
      switch (selectedMethod) {
        case 'credit card':
            displayBlockElement(creditCardSection);
            hideBlockElements(payPalSection, bitcoinSection);
            break;
        case 'paypal':
            displayBlockElement(payPalSection);
            hideBlockElements(creditCardSection, bitcoinSection);
            break;
        case 'bitcoin':
            displayBlockElement(bitcoinSection);
            hideBlockElements(payPalSection, creditCardSection);
            break;
        default:
            break;
      }
    });

    //Validation of name field
    function validateNameField(){
      const nameField = document.querySelector('#name');
      const name = nameField.value;
      const nameLabel = document.querySelector("label[for='name']");

      return validateInputWithLabelAndField(nameField, name, nameLabel,name.length === 0 || !name.trim()
      , 'Name:', 'Name can not be blank');
    }

    //Validation of email field
    function validateEmailField(){
      const emailField = document.querySelector('#mail');
      const email = emailField.value;
      const emailLabel = document.querySelector("label[for='mail']");


      return validateInputWithLabelAndField(emailField, email, emailLabel,!email.match(/[a-z0-9._-]+@[a-z]+.com/)
      , 'Email:', 'Must be a valid email address');
    }

    //Validation of activity checkboxes
    function validateAcivityCheckboxes(){
      const activityLegend = document.querySelector(".activities legend");
      return validateCheckBoxesWithLabel(activityCheckboxes, activityLegend, 1,
              'Register for Activities', 'At least one activity must be chosen');
    };

    //Function which validates checkboxes
    function validateCheckBoxesWithLabel(checkboxes, label, minimumNeededToBeChecked,
            message, errorMessage){
      let numberChecked = 0;
      for (var i = 0; i < checkboxes.length; i++) {
        if(checkboxes[i].checked){
          numberChecked++;
        }
      }
      //If the number of checked checkboxes is less than the minimum required
      //display and error message and add invalid class, if not remove the invalid class
      //and display the adequate message
      if(numberChecked < minimumNeededToBeChecked){
        label.textContent = errorMessage;
        label.classList.add('invalid');
        return false;
      } else {
        label.textContent = message;
        label.classList.remove('invalid');
        return true;
      }
    }



    //Function which sets the invalid class to an element, and displays the adeqate message
    function setInvalidClassAndErrorMessage(inputField, label, errorMessage){
        label.textContent = errorMessage;
        label.classList.add('invalid');
        inputField.classList.add('invalid');
        return false;
    }
    //Function which removes the invalid class to an element, and displays the adeqate message
    function removeInvalidClassAndErrorMessage(inputField, label, message){
        label.textContent = message;
        label.classList.remove('invalid');
        inputField.classList.remove('invalid');
        return true;
    }

    //Function which validates an input field
    function validateInputWithLabelAndField(inputField, inputValue, label, condition, message, errorMessage){
         if(condition){
           return setInvalidClassAndErrorMessage(inputField, label, errorMessage);
         } else {
           return removeInvalidClassAndErrorMessage(inputField, label, message);
         }
    }



    //Validating credit card info

    function validateCreditCardInfo(){


      //Valinating zip code input
      const zipCodeInput = document.querySelector('#zip');
      const zipCodeLabel = document.querySelector("label[for='zip']");
      const zipCode = document.querySelector('#zip').value;

      const validatedZip = validateInputWithLabelAndField(zipCodeInput, zipCode, zipCodeLabel,!zipCode.match(/[0-9]{5}/) ||  zipCode.length > 5
      , 'Zip Code:', 'Must be 5 digits');

      //Validating cvv input
      const cvvInput = document.querySelector('#cvv');
      const cvvLabel = document.querySelector("label[for='cvv']");
      const cvv = document.querySelector('#cvv').value;

      const validatedCVV = validateInputWithLabelAndField(cvvInput, cvv, cvvLabel,!cvv.match(/[0-9]{3}/) ||  cvv.length > 3
      , 'CVV:', 'Must be 3 digits');


      const creditCardInput = document.querySelector('#cc-num');
      const creditCardLabel = document.querySelector("label[for='cc-num']");
      const creditCardNumber = creditCardInput.value;

      const validatedCreditCard = validateInputWithLabelAndField(creditCardInput, creditCardNumber, creditCardLabel,
      !creditCardNumber.match(/[0-9]{13,16}/) || creditCardNumber.match(/[^0-9]/) || creditCardNumber.length > 16,
       'Card Number:', 'Invalid credit card number!');

      return validatedZip && validatedCVV && validatedCreditCard;
    }



    //Real time validation for credit card field (As I understood the tasks)
    function realTimeErrorForCreditCard(){
      const creditCardInput = document.querySelector('#cc-num');
      const creditCardLabel = document.querySelector("label[for='cc-num']");
      creditCardInput.addEventListener('keyup', (event) =>{
        const creditCardNumber = event.target.value;
        if(creditCardNumber.match(/[^0-9]+/)){
          creditCardLabel.textContent = 'Card number must contain only digits';
          creditCardLabel.classList.add('invalid');
          creditCardInput.classList.add('invalid');
        } else if(creditCardNumber.length < 13){
          creditCardLabel.textContent = 'Card number must have at least 13 digits';
          creditCardLabel.classList.add('invalid');
          creditCardInput.classList.add('invalid');
        } else if (creditCardNumber.length > 16){
          creditCardLabel.textContent = 'Card number cannot have more than 16 digits';
          creditCardLabel.classList.add('invalid');
          creditCardInput.classList.add('invalid');
        } else{
          creditCardLabel.textContent = 'Credit Card:';
          creditCardLabel.classList.remove('invalid');
          creditCardInput.classList.remove('invalid');
        }
    });
  }


//Form submition and validation

    realTimeErrorForCreditCard();

    const form = document.querySelector('form');
    form.addEventListener('submit', (event) =>{
      event.preventDefault();
      const validatedName = validateNameField();
      const validatedEmail = validateEmailField();
      const validatedActivites = validateAcivityCheckboxes();
      let validatedCreditCard = true;
      if(selectedMethod === 'credit card'){
          validatedCreditCard = validateCreditCardInfo();
      }
      if(validatedName && validatedEmail && validatedActivites && validatedCreditCard){
        form.submit();
      }
    });

});
