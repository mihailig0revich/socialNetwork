import * as axios from "axios";

let instance = axios.create({
    withCredentials: true,
    headers: {
        'API-KEY': 'ec60f1de-a2b2-4c79-9592-52195d4db1e8',
    },
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
});

export let userAPI = {
    getUsers(amountUsers) {
        return (
            instance.get(`users?count=${amountUsers}`).then((response) => {
                return response.data
            })
        );
    },
    getNewPageUsers(pageNumber) {
        return (
            instance.get(`users?page=${pageNumber}`).then((response) => {
                return response.data
            })
        );
    },
    followOnUser(userID) {
        return (
            instance.post(`follow/${userID}`).then((response) => {
                return response.data
            })
        )
    },
    unfollowOnUser(userID) {
        return (
            instance.delete(`follow/${userID}`).then((response) => {
                return response.data
            })
        )
    },
}

export const myAPI = {
    getMe () {
        return (
            instance.get('auth/me')
        )
    },
    saveAboutMe (profile) {
        return (
            instance.put('profile', profile)
        )
    },
    login (email, password, rememberMe = false, captcha = null) {
        return (
            instance.post('auth/login', {email, password, rememberMe, captcha})
        )
    },
    logout () {
        return (
            instance.delete('auth/login')
        )
    },
    savePhoto (photoFile) {
        const formData = new FormData();
        formData.append("image", photoFile)

        return (
            instance.put("profile/photo", formData, {
                headers: {
                    "content-type" : "multipart/form-data",
                }
            })
        )
    },
    capcha () {
        return (
            instance.get("security/get-captcha-url")
        );
    }
}
export const profileAPI = {
    getProfile(userId) {
        return (
            instance.get(`profile/${userId}`)
        )
    },
    getStatus(userId) {
        return (
            instance.get(`profile/status/${userId}`)
        )
    },
    updateStatus(status) {
        return (
            instance.put(`profile/status`, {status: status})
        )
    }
}