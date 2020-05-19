<div class="row mt-3">
    <div class="col-12 justify-content-center">
        {{ flashSession.output() }}
    </div>
</div>
<div class="row">
    <div class="col-3 d-none d-md-block">
        <div class="card">
            <div class="card-header">
                <h4>Search History:</h4>
            </div>
            <div id="search-history-content-container" class="card-body spinner-container">
                <div class="sk-spinner sk-spinner-double-bounce">
                    <div class="sk-double-bounce1"></div>
                    <div class="sk-double-bounce2"></div>
                </div>
                <div id="search-history-list">
                </div>
            </div>
        </div>
    </div>
    <div class="col-md-5 col-sm-10 offset-sm-1 offset-md-0  mb-3">
        <div class="card">
            <div class="card-header">
                <h3>Enter Address:</h3>
            </div>
            <div class="card-body">
                <form id="primary-search-form" method="post">
                    <input type="hidden" id="address-id" value="">
                    <input type="hidden" name="streetNumber" id="street_number" value="">
                    <input type="hidden" name="streetName" id="route" value="">
                    <input type="hidden" name="zip" id="postal_code" value="">
                    <div class="form-row">
                        <div class="form-group col-12">
                            <label for="search-box-address">Address</label>
                            <input class="form-control" type="text" name="addressAutocomplete" id="search-box-address">
                        </div>
                    </div>
                    <div class="form-row">
                        
                        <div class="form-group col-8">
                            <select id="property-condition-select" class="form-control d-none">
                                <option value="EMPTY" selected>Select Condition...</option>
                                {% for condition in conditions %}
                                    <option value="{{ condition.id }}">{{ condition.name }}</option>
                                {% endfor %}
                            </select>
                           
                        </div>
                        
                        <div class="form-group col-4">
                            <button class="btn btn-primary" disabled="true" type="button" id="primary-search-button">Search!</button>
                        </div>
                        <div class="form-group col-12">
                            <a href="#" data-toggle="modal" data-target="#exampleModal" class="d-none" id="about-condition"> <p class="text-monospace text-center">About Condtions</p></a>
                         </div>
                    </div>
                </form>
                <div id="image-container" class="spinner-container">
                    <div class="sk-spinner sk-spinner-double-bounce">
                        <div class="sk-double-bounce1"></div>
                        <div class="sk-double-bounce2"></div>
                    </div>
                    <img id="property-image" class="img img-fluid" />
                </div>
            </div>
        </div>
    </div>
    <div class="col-md-4 col-sm-10 offset-sm-1 offset-sm-1 offset-md-0">
        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header">
                        <h3>Sweet Spot</h3>
                    </div>
                    <div id="value-container" class="card-body spinner-container">
                        
                          
                         <div class="sk-spinner sk-spinner-double-bounce">
                            <div class="sk-double-bounce1"></div>
                            <div class="sk-double-bounce2"></div>
                        </div>
                        <div id="value-display-div" class="text-center"></div>
                        <div class="form-group col-10 offset-1 mt-2">
                            
                            <p class="text-center">Market Aggression Toggle</p>
                      
                                <form>
                        <input type="range" class="custom-range" min="0" max="2" step="1" id="customRange3" value="0" oninput="showVal(this.value)" onchange="showVal(this.value)">
                        </div>
                        <table class="table" style="font-size: .75em;">
                            <thead class="text-center">
                              <tr>
                           
                                <th scope="col">Conservative</th>
                                <th scope="col">Aggressive</th>
                                <th scope="col">Very Aggressive</th>
                              </tr>
                            </thead>
                        </table>    
                        <div class="custom-control custom-checkbox">
                            <input type="checkbox" class="custom-control-input" id="customCheck1" onchange="showVal(this.value)">
                            <label class="custom-control-label" for="customCheck1">Corona Effect</label>
                          </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-12 mt-3">
                <div class="card">
                    <div class="card-header">
                        <h3>Comps</h3>
                    </div>
                    <div id="comp-container" class="card-body spinner-container">
                        <div class="sk-spinner sk-spinner-double-bounce">
                            <div class="sk-double-bounce1"></div>
                            <div class="sk-double-bounce2"></div>
                        </div>
                        <div id="comps-display-div"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
{{ assets.outputJs('footer_google') }}
<script>
    var apiKey = '{{ apiKey }}';
</script>

  
  <!-- Modal -->
  <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">About Conditons</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
            <table class="table">
                <thead>
                  <tr>
                   
                    <th scope="col">Condition</th>
                    <th scope="col">Description</th>
                    <th scope="col">Video</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">Great</th>
                     <td>The condition of this house is perfect. It has been updated in the last 12 months and has no defects whatsoever.</td>
                    <td><a href="https://www.youtube.com/watch?v=P5YmGeOaGT0">Video</a></td>
                 
                  
                  
                  </tr>
                  <tr>
                    <th scope="row">Good</th>
          
                    <td>This category of house has no major defects. All major systems(HVAC, Electrical, Plumbing, Roof, and Exterior) are in good condidtion. Kitchen and bathrooms need updating, but no major repairs.</td>
                    
                    <td><a href="https://www.youtube.com/watch?v=o5XnDJzyE50&feature=youtu.be">Video</a></td>
                  </tr>
                  <tr>
                    <th scope="row">Ok</th>
          
                     <td>Houses in this condition have outdated kitchens and bathrooms. Most of the major systmes(HVAC, Electrical, Plumbing, Roof, and Exterior) are in good condidtion, but some repairs are needed for them to work perfectly. There is no structural damage or water damage.</td>
                     <td><a href="https://www.youtube.com/watch?v=8ncGf__51yw">Video</a></td>
                  </tr>
           
                  <tr>
                    <th scope="row">Poor</th>
             
                    <td>The easiest way to put a house in this category is to ask, "Is this house ready for someone to have a family living in it?" If the answer is NO, then this would be considered a house in poor condition. One or more of the major systems needs to be replaced and the house needs a major remodel.</td>
                    <td> <a href=" https://www.youtube.com/watch?v=2WdpYc2qq4Q">Video</a></td>
                  <tr>
                  </tr>
                  <tr>
                    <th scope="row">Lot Value</th>
              
                    <td>These houses have major structural issues. It might have been condemned by the local code enforcement. The flooring is uneven, and the roof is actively leaking. It's probably been vacant for a while. </td>
                    <td> <a href="https://www.youtube.com/watch?v=DdrDmmzJOlQ">Video</a></td>
                  </tr>
                 


                </tbody>
            </table>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
      
        </div>
      </div>
    </div>
  </div>