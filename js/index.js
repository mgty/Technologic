$(function() {
    $('#search-history-list').load('/zillow/getHistory');
    let addressForm = {
        street_number: 'short_name',
        route: 'long_name',
        postal_code: 'short_name'
    };
    let options = {};
    let input = document.getElementById('search-box-address');

  //  var autocomplete = new google.maps.places.Autocomplete(input);
    let autocomplete = new google.maps.places.Autocomplete(input, options);
    $('#search-box-address').on('input', '[contenteditable=true]', function (e) {
        $('#primary-search-button').prop('disabled', true);
    })
  /*  $('#search-box-address').on('keyup', function(){
      
    });
*/
    google.maps.event.addDomListener(
        autocomplete,
        'place_changed',
        function() {
        $('#primary-search-button').prop('disabled', false);
    });
    google.maps.event.addDomListener(
        document.getElementById('primary-search-button'),
        'click',
        function() {
        populateAddressForm();
    });

    function populateAddressForm() {
        let place = autocomplete.getPlace();

        for (let element in addressForm) {
            $("#"+element).val('');
        }

        for (let i = 0; i < place.address_components.length; i++) {
            let addressType = place.address_components[i].types[0];
            if (addressForm[addressType]) {
                $("#"+addressType).val(place.address_components[i][addressForm[addressType]]);
            }
        }

    $('#primary-search-button').prop('disabled', false);
    }
    $('#primary-search-button').on('click', function(e) {
        $('#value-container').toggleClass('sk-loading');
        $('#property-condition-select').val('EMPTY');
        $('#comps-display-div').html('');
        $('#value-display-div').html('');
        loadImageAndPropertyData();
        $('#value-container').toggleClass('sk-loading');
    });

    $('#property-condition-select').on('change', function(e) {
        $('#value-container').toggleClass('sk-loading');
        $.ajax({
            method: "POST",
            url: "/zillow/getHomeValue",
            data: {
                addressId: $('#address-id').val(),
                conditionId: $("#property-condition-select").val(),
            }
        }).done(function(data){
            console.log(data)
            let lowOfferDefault = (data * 0.8);
            let highOfferDefault = (data * 1.1);
            let formattedLowOfferDefault = dollarFormat(lowOfferDefault);
            let formattedHighOfferDefault = dollarFormat(highOfferDefault);
            let lowOfferAggressive = (data * 0.9);
            let highOfferAggressive = (data * 1.2);
            let formattedLowOfferAggressive = dollarFormat(lowOfferAggressive);
            let formattedHighOfferAggressive = dollarFormat(highOfferAggressive);
            let lowOfferVeryAggresive = (data * 1.0);
            let highOfferVeryAggresive = (data * 1.3);
            let formattedLowOfferVeryAggresive = dollarFormat(lowOfferVeryAggresive);
            let formattedHighOfferVeryAggresive = dollarFormat(highOfferVeryAggresive);
            /* corrona effect*/
            let lowOfferDefaultCV = (lowOfferDefault * .9063);
            let highOfferDefaultCV = (highOfferDefault * .9063);
            let formattedLowOfferDefaultCV = dollarFormat(lowOfferDefaultCV);
            let formattedHighOfferDefaultCV = dollarFormat(highOfferDefaultCV);
            let lowOfferAggressiveCV = (lowOfferAggressive * .9063);
            let highOfferAggressiveCV = (highOfferAggressive * .9063);
            let formattedLowOfferAggressiveCV = dollarFormat(lowOfferAggressiveCV);
            let formattedHighOfferAggressiveCV = dollarFormat(highOfferAggressiveCV);
            let lowOfferVeryAggresiveCV = (lowOfferVeryAggresive * .9063);
            let highOfferVeryAggresiveCV = (highOfferVeryAggresive * .9063);
            let formattedLowOfferVeryAggresiveCV = dollarFormat(lowOfferVeryAggresiveCV);
            let formattedHighOfferVeryAggresiveCV = dollarFormat(highOfferVeryAggresiveCV);
             /* corrona effect*/
            $('#value-display-div').html('<strong class="h4" id="defaultOffer">'+formattedLowOfferDefault+' - '+formattedHighOfferDefault+'</strong><strong class="h4 d-none" id="aggresiveOffer">'+formattedLowOfferAggressive+' - '+formattedHighOfferAggressive+'</strong><strong class="h4 d-none" id="veryAggresiveOffer">'+formattedLowOfferVeryAggresive+' - '+formattedHighOfferVeryAggresive+'</strong>'+'<strong class="h4 d-none" id="defaultOfferCV">'+formattedLowOfferDefaultCV+' - '+formattedHighOfferDefaultCV+'</strong><strong class="h4 d-none" id="aggresiveOfferCV">'+formattedLowOfferAggressiveCV+' - '+formattedHighOfferAggressiveCV+'</strong><strong class="h4 d-none" id="veryAggresiveOfferCV">'+formattedLowOfferVeryAggresive+' - '+formattedHighOfferVeryAggresiveCV+'</strong>');
            $('#way-off-button').removeClass('d-none');
            $('#value-container').toggleClass('sk-loading');
            if ($('#comps-display-div').html() === '')
            {
                $('#comp-container').toggleClass('sk-loading');
                $.ajax({
                    method: "POST",
                    url: "/zillow/getComps",
                    data: {
                        addressId: $('#address-id').val()
                    }
                }).done(function(data) {
                    let limitCounter = 0;
                    for(let i = 0; i <= data.length; i++) {
                        if (typeof (data[i]) === 'object' && typeof (data[i].amount) !== 'object') {
                            if (limitCounter < 6) {
                                $('#comps-display-div').append(
                                    "<a href='" + data[i].link + "' target='_blank'>" + data[i].address + "</a><br>Sold for " + dollarFormat(data[i].amount * 1) + "<hr>"
                                );
                                limitCounter++;
                            }
                        }
                    }
                    $('#comps-display-div').append("<div class='text-center'><a href='http://www.zillow.com/'><img class='img img-fluid' src='/img/Zillowlogo.gif'></a></div>");
                    $('#comp-container').toggleClass('sk-loading');
                }).fail(function() {
                    $('#comps-display-div').append(
                        "<h3>Comp Data Not Available</h3>"
                    );
                    $('#comp-container').toggleClass('sk-loading');
                });
            }
        }).fail(function() {
            $('#value-container').toggleClass('sk-loading');
            alert("Unable to save home values, please try again");
            $('#property-condition-select').val('EMPTY');
        });
    });
});

function loadAddress(streetNumber,streetName,postalCode) {
    $('#value-display-div').html('');
    $('#comps-display-div').html('');
    $('#property-condition-select').val('EMPTY');
    $('#street_number').val(streetNumber);
    $('#route').val(streetName);
    $('#postal_code').val(postalCode);
    $('#search-box-address').val(streetNumber+' '+streetName+', '+postalCode);
    loadImageAndPropertyData();
}

function fakeAlert() {
    alert("Thank you, we will look at this pricing!");
}

function loadImageAndPropertyData() {
    $('#search-history-content-container').toggleClass('sk-loading');
    $('#image-container').toggleClass('sk-loading');
    let addressString = encodeURI($("#street_number").val()+' '+$("#route").val()+", "+$("#postal_code").val());
    console.log('addressString !!!' + addressString)
    $.ajax({
        method: "POST",
        url: "/zillow/storeHomeValues",
        data: {
            streetNumber: $("#street_number").val(),
            streetName: $("#route").val(),
            postalCode: $("#postal_code").val()
        }
    }).done(function(data){
        console.log('Data !!__!' + data)
        let url = 'https://maps.googleapis.com/maps/api/streetview?size=600x300&location='+addressString+'&key='+apiKey;
        $('#address-id').val(JSON.parse(data));
        $('#property-image').attr('src', url);
        $('#image-container').toggleClass('sk-loading');
        $("#property-condition-select").removeClass("d-none");
        $("#about-condition").removeClass("d-none");
        $('#search-history-list').load('/zillow/getHistory');
        $('#search-history-content-container').toggleClass('sk-loading');
    }).fail(function(xhr, status, error) {
        console.log('Error !!!' + error)
        $('#search-history-content-container').toggleClass('sk-loading');
        $('#image-container').toggleClass('sk-loading');
        if(xhr.status === 400) {
            alert("There is not enough data available for this property to deliver an accurate offer range. Please try another property.");
            $('#property-image').removeAttr('src');
            $('#value-display-div').html('');
            $('#property-condition-select').val('EMPTY');
        } else if(xhr.status === 201) {
            alert("No value data available for this address.");
            $('#property-image').removeAttr('src');
            $('#value-display-div').html('');
            $('#property-condition-select').val('EMPTY');
        } else {
            alert("An unknown error has occurred.  Please contact support if the problem persists");
            $('#property-image').removeAttr('src');
            $('#value-display-div').html('')
            $('#property-condition-select').val('EMPTY');
        }
    });
}

function dollarFormat(number) {
    let newNumber = number.toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'USD',
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0
                });
    return newNumber;
}
function showVal(data){
    console.log(data);
    if (data == 'on'){
        data = document.getElementById('customRange3').value
        console.log(data);
    }
        var checked = false;
        let check = document.getElementById('customCheck1')
        console.log(check);
        let el0 = document.getElementById('defaultOffer');
        console.log(el0);
        let el1 = document.getElementById('aggresiveOffer');
        console.log(el1);
        let el2 = document.getElementById('veryAggresiveOffer');
        console.log(el2);
        let el3 = document.getElementById('defaultOfferCV');
        console.log(el3);
        let el4 = document.getElementById('aggresiveOfferCV');
        console.log(el4);
        let el5 = document.getElementById('veryAggresiveOfferCV');
        console.log(el5);
        if (check.checked) 
        {
            checked = true;
        } else {
            checked = false;
        }
        console.log(checked);
  
    if (data == 0){
        if (checked == false){
        
        el0.classList.remove('d-none');
        el1.classList.add('d-none');
        el2.classList.add('d-none');
        el3.classList.add('d-none');
        el4.classList.add('d-none');
        el5.classList.add('d-none');
        }
        else {
            el0.classList.add('d-none');
            el1.classList.add('d-none');
            el2.classList.add('d-none');
            el3.classList.remove('d-none');
            el4.classList.add('d-none');
            el5.classList.add('d-none');
        }
     
    }
      
    
    if (data == 1){
        if (checked == false){
        
            el0.classList.add('d-none');
            el1.classList.remove('d-none');
            el2.classList.add('d-none');
            el3.classList.add('d-none');
            el4.classList.add('d-none');
            el5.classList.add('d-none');
            }
            else{
                el0.classList.add('d-none');
                el1.classList.add('d-none');
                el2.classList.add('d-none');
                el3.classList.add('d-none');
                el4.classList.remove('d-none');
                el5.classList.add('d-none');
            }
    }
    if (data == 2){
        if (checked == false){
        
            el0.classList.add('d-none');
            el1.classList.add('d-none');
            el2.classList.remove('d-none');
            el3.classList.add('d-none');
            el4.classList.add('d-none');
            el5.classList.add('d-none');
            }
            else{
                el0.classList.add('d-none');
                el1.classList.add('d-none');
                el2.classList.add('d-none');
                el3.classList.add('d-none');
                el4.classList.add('d-none');
                el5.classList.remove('d-none');
            }
    }
}