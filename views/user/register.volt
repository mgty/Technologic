<div class="row justify-content-center mt-4">
    <div class="col-md-5 col-sm-10 offset-sm-10 offset-md-1">
        <div class="card">
            <div class="card-header">
                <h3>New User Registration</h3>
            </div>
            <div class="card-body">
                {{ flashSession.output() }}
                <form action="/user/register" method="POST" id="user-registration-form">
                    <div class="form-row">
                       
                        <div class="form-group col-12">
                            <label for="user-registration-email">Email Address</label>
                            <input type="email" id="user-registration-email" name="login" class="form-control" required>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-6">
                            <label for="user-registration-first-name">First Name</label>
                            <input type="text" id="user-registration-first-name" name="firstName" class="form-control" required>
                        </div>
                        <div class="form-group col-6">
                            <label for="user-registration-first-last">Last Name</label>
                            <input type="text" id="user-registration-first-last" name="lastName" class="form-control" required>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-6">
                            <label for="user-registration-cell">Cell Phone</label>
                            <input type="tel" id="user-registration-cell" name="cell" class="form-control" required>
                        </div>
                        <div class="form-group col-6">
                            <label for="user-registration-password">Password</label>
                            <input type="password" id="user-registration-password" name="password" class="form-control" required>
                        </div>
{#                        <div class="form-group col-6">#}
{#                            <label for="user-registration-password-confirm">Confirm Password</label>#}
{#                            <input type="password" id="user-registration-password-confirm" name="password-confirm" class="form-control" required>#}
{#                        </div>#}
                    </div>
                    <div class="form-row">
                        <div class="form-group col-6">
                            <input type="submit" id="register" class="form-control btn btn-primary">
                        </div>
                        <div class="form-group col-6">
                            <a href="/user/login">
                                <button type="button" class="form-control btn btn-secondary">Return To Login</button>
                            </a>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
