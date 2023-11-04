import { defineStore } from 'pinia'

export const usePlayerStore = defineStore('player', {
    state: () => ({
        playlist   : [],
        now_playing: {}
    }),
    getters: {
        getNextSong(){
            let index = 0;
            for (index; index < this.playlist.length; index++) {
                if (this.playlist[index].id === this.now_playing.id) break;
            }
            if (index === (this.playlist.length + 1)) index = -1;
            return this.playlist[index + 1];
        },
        getPreviousSong() {
            let index = 0;
            for (index; index < this.playlist.length; index++) {
                if (this.playlist[index].id === this.now_playing.id) break;
            }
            if (index === 0) index = this.playlist.length;
            return this.playlist[index - 1];
        },
        getNowPlayingSongId() {
            return this.now_playing?.id;
        },
        getNowPlaying() {
            return this.now_playing;
        },
        getNowPlayingAlbumID() {
            return this.now_playing?.album?.id ?? null;
        },
        getNowPlayingSongName() {
            return this.now_playing?.name ?? '';
        },
        getNowPlayingSongImage() {
            return this.now_playing?.album?.images[1].url ?? '';
        },
        getNowPlayingArtists() {
            return this.now_playing?.artists?.map(artist => artist.name).join(', ');
        },
        getNowPlayingSongPreview() {
            return this.now_playing?.preview_url;
        }
    },
    actions: {
        setPlaylist(songs) {
            this.playlist = songs;
        },
        setNowPlaying(song) {
            this.now_playing = song;
        },
        resetNowPlaying() {
            this.now_playing = {};
        },
    }
})
