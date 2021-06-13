//1.유저정보를 받아와서 {Auth}에 저장
//2.유저정보를 {Auth}에서 받아와 페이지별로 전달
import { Auth } from '../stores';

const useStore = () => ({ Auth });

export default useStore;