// Set your publishable key: remember to change this to your live publishable key in production
// See your keys here: https://dashboard.stripe.com/account/apikeys
//var stripe = Stripe('pk_test_hxDxa0Uyx6ehG7e1ZYWipw2A00w5kvSHTq');
var stripe = Stripe('pk_live_bhtaldfWx6CVuAy9j9pJEJv9006GFNsGvx');

var elements = stripe.elements();
console.log("loaded")
document.addEventListener("DOMContentLoaded", function() {

    loadAccountOptions();


  });
  function loadAccountOptions(){


  const form2 = document.getElementById('cancel-form');
  console.log(form2)
  form2.addEventListener('submit', async (event) => {
  event.preventDefault();
  cancelSubscription();
  });

function cancelSubscription() {
  console.log("cancel")

  $.ajax({
    method: "POST",
    url: "/stripe/cancelSubscription",
    data:"data"
}).done(function(data){
    //let response = JSON.parse(data);
   console.log(data)
   window.location.replace("/user");
 
}).fail(function(xhr, status, error) {

    if(xhr.status === 400) {
        alert("400");
        console.log(xhr)
        console.log(status)
        console.log(error)
       
    } else if(xhr.status === 201) {
        alert("201");
        
    } else {
        let response = JSON.parse(data);
   console.log(data)
        alert("An unknown error has occurred.  Please contact support if the problem persists");
        
    }
});

}
  }
  
function LoadCardForm(){
console.log("loadCardForm")
    var style = {
        base: {
          // Add your base input styles here. For example:
          fontSize: '16px',
          color: '#32325d',
          height: '120px',
          width: '375px'
        },
      };
    var classes ={
        base: 'form-control'
    };
    
      // Create an instance of the card Element.
      var card = elements.create('card',  {classes:classes});
      
      // Add an instance of the card Element into the `card-element` <div>.
      card.mount('#card-element');

// Create a token or display an error when the form is submitted.
const form = document.getElementById('payment-form');
form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const {token, error} = await stripe.createToken(card);

  if (error) {
    // Inform the customer that there was an error.
    const errorElement = document.getElementById('card-errors');
    errorElement.textContent = error.message;
  } else {
    // Send the token to your server.
    stripeTokenHandler(token);
  }
});
const stripeTokenHandler = (token) => {
    console.log("tokenhanlder")
    // Insert the token ID into the form so it gets submitted to the server
    const form = document.getElementById('payment-form');
    const hiddenInput = document.createElement('input');
    hiddenInput.setAttribute('type', 'hidden');
    hiddenInput.setAttribute('name', 'stripeToken');
    hiddenInput.setAttribute('value', token.id);
    form.appendChild(hiddenInput);
  
    // Submit the form
    savePaymentRunCharge()
  }
}


function savePaymentRunCharge() {
    console.log("charge")
    const form = document.getElementById('payment-form');
    var form_data = $(form).serialize(); //Encode form elements for submission
    console.log(form_data)
    $.ajax({
        method: "POST",
        url: "/stripe/savePaymentRunCharge",
        data : form_data
    }).done(function(data){
        //let response = JSON.parse(data);
       console.log(data)
       window.location.replace("/user");
     
    }).fail(function(xhr, status, error) {
    
        if(xhr.status === 400) {
            alert("400");
            console.log(xhr)
            console.log(status)
            console.log(error)
           
        } else if(xhr.status === 201) {
            alert("201");
            
        } else {
            let response = JSON.parse(data);
       console.log(data)
            alert("An unknown error has occurred.  Please contact support if the problem persists");
            
        }
    });
}

