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
    signUp = (id, pw, name, gender, email, quest, hint) => {
        return this.model.signUp(id, pw, name, gender, email, quest, hint);
    }
    exercise = (expart, times, btn) => {
        return this.model.exercise(expart, times, btn);
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
    makeboard = async(user_id, board_name) => {
        return await this.model.makeboard(user_id, board_name);
    }
    board_search = async(board_id) => {
        return await this.model.board_search(board_id);
    }
    board_update = async(board_id,board_name,user_id) => {
        return await this.model.board_update(board_id,board_name,user_id);
    }
    board_delete = async(user_id,board_id) => {
        return await this.model.board_delete(user_id,board_id);
    }
    boardpostlist = async(board_id) => {
        return await this.model.boardpostlist(board_id);
    }
    makepost = async(board_id,user_id,post_title,post_content) => {
        return await this.model.makepost(board_id,user_id,post_title,post_content);
    }
    postdetail = async(post_id) => {
        return await this.model.postdetail(post_id);
    }
    updatepost = async(post_id, user_id, post_title, post_content) => {
        return await this.model.updatepost(post_id, user_id, post_title, post_content);
    }
    deletepost = async(post_id, user_id) => {
        return await this.model.deletepost(post_id, user_id);
    }
    findid = async(email) => {
        return await this.model.findid(email);
    }
    findpw = async() => {
        return await this.model.findpw();
    }
}

export default ViewModel;