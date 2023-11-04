<template>
    <div id="about-view" class="scrollable-content">
      <div class="wrapper-header">
        <h1>ABOUT ME</h1>
        <div class="settings">
          <button id="btn-edit" v-if="!isEditing" @click="editForm" :disabled="isEditing">Edit Form</button>
          <button id="btn-save" v-if="isEditing" @click="saveForm(editedUser)" :disabled="!isEditing">Save Form</button>
          <button id="btn-cancel" v-if="isEditing" @click="cancelEdit" :disabled="!isEditing">Cancel</button>
        </div>
      </div>
      <form>
        <div class="wrapper-input">
          <label>NAME</label>
          <input
            id="input-name"
            v-if="isEditing"
            :disabled="!isEditing"
            :value="editedUser.name"
            @input="editUser('name', $event.target.value)"
          />
          <p id="txt-name" v-if="!isEditing">{{ user.name }}</p>
        </div>
        <div class="wrapper-input">
          <label>SURNAME</label>
          <input
            id="input-surname"
            v-if="isEditing"
            :disabled="!isEditing"
            :value="editedUser.surname"
            @input="editUser('surname', $event.target.value)"
          />
          <p id="txt-surname" v-if="!isEditing">{{ user.surname }}</p>
        </div>
        <div class="wrapper-input">
          <label>STUDENT CODE</label>
          <input
            id="input-code"
            v-if="isEditing"
            :disabled="!isEditing"
            :value="editedUser.code"
            @input="editUser('code', $event.target.value)"
          />
          <p id="txt-code" v-if="!isEditing">{{ user.code }}</p>
        </div>
        <div class="wrapper-songs" v-if="!isEditing">
          <label>FAVORITE SONGS</label>
          <ul v-if="user.favorite_songs.length > 0">
            <li v-for="songId in user.favorite_songs" :key="songId">
              <img id="img-album" :src="getAlbumImage(songId)" />
              <div class="song-info">
                <p id="txt-song" class="song-name">{{ getSongName(songId) }}</p>
                <p id="txt-artist" class="song-artists" style="font-size: 16px; font-weight: 600;">{{ getArtists(songId) }}</p>
              </div>
            </li>
          </ul>
          <div v-else id="txt-empty" class="empty">NO SONGS FOUND</div>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  import { useAuthStore } from '../stores/auth';
  import songsJS from '../data/songs';
  
  export default {
    data() {
      return {
        isEditing: false,
        editedUser: {},
        songs: songsJS,
      };
    },
    setup() {
      const user = useAuthStore().user;
      return {
        user,
      };
    },
    methods: {
      editForm() {
        this.isEditing = true;
        this.editedUser = { ...this.user };
      },
      saveForm(editedUser) {
        useAuthStore().setUserData(editedUser.name, editedUser.surname, editedUser.code);
        this.isEditing = false;
      },
      cancelEdit() {
        this.isEditing = false;
      },
      editUser(property, value) {
        this.editedUser[property] = value;
      },
      getAlbumImage(songId) {
        const song = this.findSongById(songId);
        return song ? song.album.images[0].url : '';
      },
      getSongName(songId) {
        const song = this.findSongById(songId);
        return song ? song.name : '';
      },
      getArtists(songId) {
        const song = this.findSongById(songId);
        return song ? song.artists.map(artist => artist.name).join(', ') : '';
      },
      findSongById(songId) {
        return this.songs.find(song => song.id === songId);
      },
    },
  };
  </script>
  
  <style scoped>
  .scrollable-content {
    overflow-y: auto;
    max-height: 500px;
  }
  </style>
  