<div class="row justify-content-center mt-4">
    <div class="col-4">
        <div class="card">
            <div class="card-header">
                <h3>Password Reset</h3>
            </div>
            <div class="card-body">
                {{ flashSession.output() }}
                <form action="/user/passwordReset" method="POST">
                    <input type="hidden" name="id" value="{{ id }}">
                    <div class="form-row">
                        <div class="form-group col-12">
                            <label for="user-registration-password">New Password</label>
                            <input type="password" id="user-registration-password" name="password" class="form-control" required>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-12">
                            <label for="user-registration-password-confirm">Confirm Password</label>
                            <input type="password" id="user-registration-password-confirm" name="password-confirm" class="form-control" required>
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