{% for address in addressHistory %}
    <a href="#" onclick="loadAddress(
        streetNumber='{{ address.streetNumber }}',
            streetName='{{ address.streetName }}',
            postalCode='{{ address.postalCode }}')">
        {{ address.streetNumber }} {{ address.streetName }}
    </a>
    <br>
{% endfor %}