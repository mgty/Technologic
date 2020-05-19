<div class="row justify-content-center mt-4">
    <div class="col-md-6 col-lg-4 col-sm-10 offset-sm-1" >
        <div class="card">
            <div class="card-header">
                <h3>Login</h3>
            </div>
            <div class="card-body">
                {{ flashSession.output() }}
                <form action="/user/login" method="POST" id="user-login-form">
                    <div class="form-row">
                        <div class="form-group col-12">
                            <label for="user-registration-email">Email Address</label>
                            <input type="email" id="user-registration-email" name="login" class="form-control" required>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-12">
                            <label for="user-registration-password">Password</label>
                            <input type="password" id="user-registration-password" name="password" class="form-control"
                                   required>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-12">
                            <input type="submit" value="Login" class="form-control btn btn-primary">
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-6">
                            <a href="/user/register">
                                <button type="button" class="form-control btn btn-secondary">
                                    Register Account
                                </button>
                            </a>
                        </div>
                        <div class="form-group col-6">
                            <a href="/user/initiatePasswordReset">
                                <button type="button" class="form-control btn btn-info">
                                    Forgot password?
                                </button>
                            </a>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>