class SignupViewModel {
    constructor(SignupStore) {
        this.store = SignupStore;
        console.log(this.store)
        this.SignUp = this.SignUp.bind(this);
    }

    SignUp(id, pw, name,gender) {
        console.log('test', this.store);
        this.store.Signup(id, pw, name, gender);
    }
    IdCheck(id){
        this.store.IdCheck(id);
    }
}

export default SignupViewModel;