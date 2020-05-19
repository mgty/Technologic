<div class="row justify-content-center mt-4">
    <div class="col-sm-10 offset-sm-1 col-md-7 offset-md-1">
        
    </br>
    {%- if 0 === isNew -%}
 
                <div class="card mb-3 CardAccount">
                    <div class="card-header">
                        {{ flashSession.output() }}
                    <h4>Your Information </h4>
                    </div>
                    <div class="card-body">                    
                        <h5>Name:</h5><p> {{firstName}} {{lastName}}</p>
                        <h5>Email:</h5><p>{{email}}</p>
                        <h5> Cell Phone:</h5><p>{{cell}}</p>
                        <br>
                       
                            <div class="form-group col-8 offset-3">
                                <button  data-toggle="modal" data-target="#editInfoModal" class="btn btn-primary float-right">Edit Information</button>
                            </div>        
                     
                    </div>
                    
                </div>
                
                <div class="card CardAccount">
                    <div class="card-header">
                    <h4>Your Subscription</h4>
                    </div>
                    <div class="card-body"> 
                        <h5>Plan:</h5><p>{{planName}} ({{planStatus}})</p>
             {% if activated is defined %}
                           <h5>Date Activated:</h5><p>{{activated}} </p>
                           <h5>Billing Date:</h5><p> {{planAnchor}}</p>
                        <h5>Card On File:  </h5><p>{{brand}} {{last4}}</p>
                        <form action="#" method="post" id="cancel-form">
                            <div class="form-group col-8 offset-3">
                                <button class="btn btn-primary float-right">Cancel Subscription</button>
                            </div>        
                        </form>
                        {{ assets.outputJs('footer_stripe') }}
                        {{ assets.outputJs('footer_stripe_user') }}
                       
            {%- else -%}
                        {{ assets.outputJs('footer_stripe') }}
                       
                        {{ assets.outputJs('footer_stripe_new_user') }}
                        <form action="/charge" method="post" id="payment-form">
                            <div class="form-group col-m-8 offset-m-2 col-sm-10 offset-sm-1">
                       
                                <div class="form-row" style="padding-top:1.5em; padding-bottom:1.5em;">
                                
                                    <label for="card-element">
                                        Credit or debit card
                                    </label>
                                <div id="card-element">
                                
                                    <!-- A Stripe Element will be inserted here. -->
                                </div>
                                   <!-- Used to display Element errors. -->
                                <div id="card-errors" role="alert"></div>
                                </div>
                                <div class="form-row">
                                 
                                </div>
                               
                            </div>
                            <div class="form-group col-m-8 offset-m-2 col-sm-10 offset-sm-1">
                                <button class="btn btn-primary float-right">Submit Payment</button>
                                <div id="spinner-container" class="spinner-container">
                                    <div class="sk-spinner sk-spinner-double-bounce">
                                        <div class="sk-double-bounce1"></div>
                                        <div class="sk-double-bounce2"></div>
                                    </div>
                                </div>    
                            </div>    
                            
                    </form>
                {% endif %}
                        
                        
                        {{ flashSession.output() }}
                        
                       
                 
                    </div>
                    
                </div>
             
               
    {%- else -%}
  
    <script>
      
        const coupons =JSON.parse('{{coupons | json_encode}}')
        
        //console.log(coupons)
     
     </script>   
                
                {{ flashSession.output() }}
                <div class="card">
                    <div class="card-header">
                    <h3>New Account</h3>
                  
                   
                  
                    </div>
                    <div class="card-body">
                        
                      
                        <h4>Thank you for creating your account.</h4>
                        <h5> Please enter payment info to begin your 7 day free trial.</h5> 
                      
                       
                           
                    <form action="/charge" method="post" id="payment-form">
                        <div class="form-group col-m-8 offset-m-2 col-sm-12">
                   
                            <div class="form-row" style="padding-top:1.5em; padding-bottom:1.5em;">
                            
                                <label for="card-element">
                                    Credit or debit card
                                </label>
                            <div id="card-element">
                            
                                <!-- A Stripe Element will be inserted here. -->
                            </div>
                               <!-- Used to display Element errors. -->
                            <div id="card-errors" role="alert"></div>
                            </div>
                            <div class="form-row">
                             
                            </div>
                           
                        </div>
                        <div class="form-row">
                        <div class="form-group col-m-4  offset-m-2  col-sm-5 ">
                            
                                <label for="user-registration-email">Total</label>
                                <br>
                                <label for="user-registration-email" id="total">$39.99</label>
                        </div>
                        <div class="form-group col-m-4 col-sm-5  offset-m-2  offset-sm-1">
                           
                                <label for="user-registration-email">Coupon Code</label>
                                <input type="text" id="coupon-code" name="coupon-code" class="form-control">
                              
                        </div>
                        </div>
                        <div class="form-group col-m-8 offset-m-2 col-sm-10 offset-sm-1">
                            <button class="btn btn-primary float-right">Submit Payment</button>
                            <div id="spinner-container" class="spinner-container">
                                <div class="sk-spinner sk-spinner-double-bounce">
                                    <div class="sk-double-bounce1"></div>
                                    <div class="sk-double-bounce2"></div>
                                </div>
                            </div>    
                        </div>    
                        
                </form>
                    </div>
                    
                </div>
                {{ assets.outputJs('footer_stripe') }}
                {{ assets.outputJs('footer_stripe_new_user') }}
              
    {%- endif -%}

     
       
    </div>
</div>
  <!-- Modal -->
  <div class="modal fade" id="editInfoModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Edit Your Information</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
            <form action="#" method="post" id="edit-form">
                <div class="col-md-5 col-sm-10 offset-sm-10 offset-md-1">
               
                            {{ flashSession.output() }}
                            <form action="/user/edit" method="POST" id="user-update-form">
                                
                                <div class="form-row">
                                    <div class="form-group col-12">
                                        <label for="user-registration-email">Email Address</label>
                                        <input type="email" id="user-registration-email" name="login" class="form-control">
                                    </div>
                                    <div class="form-group col-6">
                                        <label for="user-registration-first-name">First Name</label>
                                        <input type="text" id="user-registration-first-name" name="firstName" class="form-control">
                                    </div>
                                    <div class="form-group col-6">
                                        <label for="user-registration-last-name">Last Name</label>
                                        <input type="text" id="user-registration-first-last" name="lastName" class="form-control">
                                    </div>
                                </div>
                                <div class="form-row">
                         
                                    <div class="form-group col-6">
                                        <label for="user-registration-first-cell">Cell Phone</label>
                                        <input type="text" id="user-registration-last" name="cell" class="form-control">
                                    </div>
                                </div>                           
                                <div class="form-row">
                                   
                                    <div class="form-group col-6">
                             
                                    </div>
                                    <div class="form-group col-6">
                                        <input type="submit" id="register" class="form-control btn btn-primary">
                                    </div>
                                </div>
                            </form>
                        </div>
               
            </form>    
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
      
        </div>
      </div>
    </div>
  </div>