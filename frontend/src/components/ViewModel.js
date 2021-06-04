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
    join = (user,study) => {
        return this.model.join(user,study);
    }
    disjoin = (user,study) => {
        return this.model.disjoin(user,study);
    }
    list = async() => {
        return await this.model.list();
    }
    member = async(study_id) => {
        return await this.model.member(study_id);
    }
    study_detail = async(study_id) => {
        return await this.model.study_detail(study_id);
    }
    boardlist = async() => {
        return await this.model.boardlist();
    }
}

export default ViewModel;