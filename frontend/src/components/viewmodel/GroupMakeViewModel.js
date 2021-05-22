class GroupMakeViewModel {
    constructor(GroupStore) {
        this.store = GroupStore;
        console.log(this.store)
        this.Group = this.Study.bind(this);
    }

    MakeStudy(user,study,capacity) {
        console.log('test', this.store);
        this.store.MakeStudy(user,study,capacity);
    }
}

export default GroupMakeViewModel;