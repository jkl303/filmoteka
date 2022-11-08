import { Notify } from 'notiflix';
export const notifyParams = Notify.init({
    width: '200px',
    borderRadius: '2px',
    position: 'center-top',
    distance: '40px',
    useIcon: false,
    fontFamily: 'Roboto',
    fontSize: '13px',
    cssAnimationStyle: 'from-bottom',
    failure: {
        background: '#FF001B'
}
});