$(function() {

    document.querySelector("#register").onclick = function(event) { 
        $('#register').prop('disabled', true);
        $('#spinner-container').toggleClass('sk-loading');
        event.currentTarget.submit()
     }
     
});
