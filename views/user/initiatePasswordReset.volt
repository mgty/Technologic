<div class="row justify-content-center mt-4">
    <div class="col-4">
        <div class="card">
            <div class="card-header"  id="card-header">
                <h3>Enter Your Email To Reset Your Password</h3>
            </div>
            <div class="card-body">
                {{ flashSession.output() }}
                <form action="/user/initiatePasswordReset" method="POST" id="initiate-password-reset">
                 
                    <div class="form-row">
                        <div class="form-group col-12">
                            <label for="user-reset-email">Enter Email</label>
                            <input type="email" id="user-reset-email" name="user-reset-email" class="form-control" required>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-12">
                            <label for="user-reset-email-confirm">Confirm Email</label>
                            <input type="email" id="user-reset-email-confirm" name="user-reset-email-confirm" class="form-control" required>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-6">
                            <input type="submit" class="form-control btn btn-primary">
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
{{ assets.outputJs('password_reset') }}