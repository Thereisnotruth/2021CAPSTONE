class ViewModel {
    constructor(model) {
       this.model = model;
       this.login = this.login.bind(this);
    }
    makeStudy = (user, study, capacity) => {
        return this.model.makeStudy(user, study, capacity);
    }
    login = (id, pw) => {
        return this.model.login(id, pw);
    }
    signUp = (id, pw, name, gender) => {
        return this.model.signUp(id, pw, name, gender);
    }
    exercise = (expart, times) => {
        return this.model.exercise(expart, times);
    }
    join = () => {
        return this.model.join();
    }
}

export default ViewModel;