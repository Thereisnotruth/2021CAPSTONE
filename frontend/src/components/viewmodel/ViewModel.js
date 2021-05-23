class ViewModel {
    constructor(models) {
        this.store = models;
        this.MakeStudy = this.MakeStudy.bind(this);
        this.exerciseend = this.exerciseend.bind(this);
        this.login = this.login.bind(this);
        this.SignUp = this.SignUp.bind(this);
    }
    MakeStudy(user,study,capacity) {
        console.log('test', this.store);
        this.store.MakeStudy(user,study,capacity);
    }
    exerciseend(expart,times){
        this.store.exerciseend(expart,times);
    }
    login(id, pw) {
        return this.store.Lmodel.login(id, pw);
    }
    SignUp(id, pw, name,gender) {
        console.log('test', this.store);
        this.store.Signup(id, pw, name, gender);
    }
}

export default ViewModel;