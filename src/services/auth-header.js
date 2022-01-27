export default function authHeader() {
    const user = JSON.parse(localStorage.getItem('key'));

    if (user && user.accessToken){
        return {Authorization: 'Barer'+ user.accessToken};
    } else{
        return {};
    }
}