import { defineStore } from "pinia"
import router from '../router'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: {
            name: 'NAME',
            surname: 'SURNAME',
            code: 'IT1234',
            email: 'marta.balode@va.lv',
            password: '123456',
            favorite_songs: []
        },
        authenticated: false
    }),
    getters: {
        is_authenticated() {
            return localStorage.getItem('is_authenticated') || this.authenticated;
        },
        getFavoriteSongs() { 
            return this.user.favorite_songs;
        }
    },
    actions: {
        setUserData(name, surname, code) { 
            this.user.name = name;
            this.user.surname = surname;
            this.user.code = code;
        },
        authenticate(email, password) { 
            if (this.user.email == email && this.user.password == password) {
                localStorage.is_authenticated = true;
                this.authenticated = true;
                router.push('/');
            }
        },
        logout() {
            localStorage.clear();
            this.authenticated = false;
            router.push('/login');
        },
        toggleFavorite(songID) { 
            if (this.user.favorite_songs.indexOf(songID) === -1) {
                this.user.favorite_songs.push(songID);
            } else {
                this.user.favorite_songs.splice(this.user.favorite_songs.indexOf(songID), 1);
            }
            localStorage.favorite_songs = this.user.favorite_songs;
        },
        updateFavoriteSongs(favoriteSongs) {
            this.user.favorite_songs = favoriteSongs;
        }
    }
})