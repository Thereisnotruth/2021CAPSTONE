class HomeViewModel {
    constructor(homeStore) {
        this.store = homeStore;
    }
    exerciseend(expart,times){
        this.store.exerciseend(expart,times);
    }
}

export default HomeViewModel;