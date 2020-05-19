// Set your publishable key: remember to change this to your live publishable key in production
// See your keys here: https://dashboard.stripe.com/account/apikeys
//var stripe = Stripe('pk_test_hxDxa0Uyx6ehG7e1ZYWipw2A00w5kvSHTq');
var stripe = Stripe('pk_live_bhtaldfWx6CVuAy9j9pJEJv9006GFNsGvx');


var elements = stripe.elements();
console.log("loaded")
document.addEventListener("DOMContentLoaded", function() {


    LoadCardForm();
    LoadLinkMink();
    LoadCouponListener();

  });
  
  
function LoadCardForm(){
console.log("loadCardForm")
    var style = {
        base: {
          // Add your base input styles here. For example:
          fontSize: '16px',
          color: '#32325d',
          height: '220px',
          width: '375px'
        },
      };
    var classes ={
        base: 'form-control'
    };
    
      // Create an instance of the card Element.
      var card = elements.create('card',  {
          classes:classes,
          style: style
                 });
      
      // Add an instance of the card Element into the `card-element` <div>.
      card.mount('#card-element');

// Create a token or display an error when the form is submitted.
const form = document.getElementById('payment-form');
form.addEventListener('submit', async (event) => {
  event.preventDefault();
  $('#spinner-container').toggleClass('sk-loading');
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
function LoadLinkMink(){
  const lmref = lmFinished()
  console.log(lmref)
  const form = document.getElementById('payment-form');
  const hiddenInput2 = document.createElement('input');
  hiddenInput2.setAttribute('type', 'hidden');
  hiddenInput2.setAttribute('name', 'linkMink');
  hiddenInput2.setAttribute('value', lmref);
  form.appendChild(hiddenInput2);


}
function LoadCouponListener(){
  console.log(coupons.data);

  
  function checkCode(e) {
  
    const result =  coupons.data.find(function(value, index) {
      // Delete element 5 on first iteration
      if (e.target.value.indexOf(value.id) > -1) {
        
          return (value)
       
        }
      
      
      });
   

      //console.log('Visited index ', index, ' with value ', value); 

    if (result != undefined) {
      if(result.amount_off != null){

        var amountOff = result.amount_off
        var oldTotal = 3999
        var newTotal = oldTotal - amountOff
        var newTotal = newTotal * .01
        var newTotal = newTotal.toFixed(2) 
        document.getElementById('total').innerHTML = '<p><strike>$39.99</strike> $' + newTotal + '<p>';
        const form = document.getElementById('payment-form');
        const hiddenInput3 = document.createElement('input');
        hiddenInput3.setAttribute('type', 'hidden');
        hiddenInput3.setAttribute('name', 'couponCode');
        hiddenInput3.setAttribute('value', e.target.value);
        form.appendChild(hiddenInput3);
      

    }
    else if(result.percent_off != null){

      var amountOff = result.percent_off
      var oldTotal = 3999
      var newTotal = (oldTotal * (amountOff * .01)) -oldTotal
      var newTotal = newTotal * .01
      var newTotal = newTotal.toFixed(2) 
      document.getElementById('total').innerHTML = '<p><strike>$39.99</strike> $' + newTotal + '<p>';
      const form = document.getElementById('payment-form');
      const hiddenInput3 = document.createElement('input');
      hiddenInput3.setAttribute('type', 'hidden');
      hiddenInput3.setAttribute('name', 'couponCode');
      hiddenInput3.setAttribute('value', e.target.value);
      form.appendChild(hiddenInput3);
    }
  }
  else{
    total.textContent = '$39.99'
  }
   
}
  const couponCode = document.getElementById('coupon-code');
  const total = document.getElementById('total');
  couponCode.addEventListener('input', checkCode);


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
       console.log('done data' + data)
      window.location.replace("/search");
     
    }).fail(function(xhr, status, error) {
      console.log('fail' + status + error + xhr)
        if(xhr.status === 400) {
            alert("400 - " + xhr.responseText);
            console.log(xhr.responseText)
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

