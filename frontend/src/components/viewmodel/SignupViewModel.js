class SignupViewModel {
    constructor(SignupStore) {
        this.store = SignupStore;
    }

    Signup(id, pw, name,gender) {
        this.store.Signup(id, pw, name,gender);
    }
    IdCheck(id){
        this.store.IdCheck(id);
    }
}

export default SignupViewModel;