class SignupViewModel {
    constructor(SignupStore) {
        this.store = SignupStore;
    }

    Signup(id, pw, cpw, name,gender) {
        this.store.Signup(id, pw, cpw, name,gender);
    }
    IdCheck(id){
        this.store.IdCheck(id);
    }
}

export default SignupViewModel;