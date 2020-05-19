document.addEventListener("DOMContentLoaded", function() {

    initiateResetForm();


  });
  function initiateResetForm(){


  const form = document.getElementById('initiate-password-reset');
  console.log(form)
  form.addEventListener('submit', async (event) => {
  event.preventDefault();
  sendResetEmail();
  });

    function sendResetEmail() {

    const form = document.getElementById('initiate-password-reset');
    var form_data = $(form).serialize(); 
    console.log(form_data)
    $.ajax({
        method: "POST",
        url: "/email/sendResetEmail",
        data:form_data
    }).done(function(data){
        //let response = JSON.parse(data);
    console.log(data)
    const cardBody = document.getElementById('card-header');
    const messageDiv = document.createElement('div');
    messageDiv.setAttribute('class', 'alert alert-success');
    messageDiv.textContent = data;
    cardBody.appendChild(messageDiv);

    //window.location.replace("/user");
    
    }).fail(function(xhr, status, error) {
        console.log(xhr)
        if(xhr.status === 400) {
            const cardBody = document.getElementById('card-header');
            const messageDiv = document.createElement('div');
            messageDiv.setAttribute('class', 'alert alert-danger');
            messageDiv.textContent = xhr.responseText;
            cardBody.appendChild(messageDiv);
            /*
            alert("400");
            console.log(xhr)
            console.log(status)
            console.log(error)
        */
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
  