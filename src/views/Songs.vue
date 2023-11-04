<template>
  <div id="songs-view" class="scrollable-content" @scroll="handleScroll">
    <div class="wrapper-header">
      <h1>SONGS</h1>
      <div class="wrapper-search">
        <input id="input-search" v-model="searchQuery" placeholder="Search by title..." />
      </div>
      <div class="wrapper-settings">
        <button id="btn-show-favorites" @click="toggleShowFavorites" :class="{ active: showFavorites }">Show
          Favorites</button>
      </div>
    </div>
    <div class="wrapper-songs">
      <table cellspacing="0" cellpadding="0">
        <tr ref="header">
          <th id="th-id">#</th>
          <th id="th-title" @click="sortBy('name')" :class="{ active: sortType.name !== 0 }">Title
            <IconCaretUp v-if="sortType.name !== 0" color="purple" :class="{ 'flip-vertical': sortType.name === -1 }"/>
          </th>
          <th id="th-artist">Artist</th>
          <th id="th-album">Album</th>
          <th id="th-duration" @click="sortBy('duration_ms')" :class="{ active: sortType.duration_ms !== 0 }">Duration
            <IconCaretUp v-if="sortType.duration_ms !== 0" color="purple" :class="{ 'flip-vertical': sortType.duration_ms === -1 }"/>
          </th>
        </tr>
        <tr class="song" v-for="(song, index) in filteredSongs" :key="song.id" @dblclick="selectSong(song)">
          <td id="td-index">
            <IconPlay v-if="song.id == currentlyPlayingId" class="black-to-white"/>
            <span id="txt-index" v-if="song.id != currentlyPlayingId">{{ index + 1 }}</span>
          </td>
          <td id="td-title">
            <img id="img-album" :src="song.album.images[0].url" alt="Album Cover" class="album-cover centered-cell" />
            {{ song.name }}
          </td>
          <td id="td-artist" >{{ song.album.artists.map(artist => artist.name).join(', ') }}</td>
          <td id="td-album">{{ song.album.name }}</td>
          <td id="td-duration" >{{ formatDuration(song.duration_ms) }}</td>
          <td class="centered-cell">
            <IconHeart @click="toggleFavorite(song.id)" :class="{ 'active-heart': !isFavorite(song.id) }" /> 
          </td>
                   
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import songsJS from '../data/songs'
import IconHeart from '../components/icons/IconHeart.vue'
import IconPlay from '../components/icons/IconPlay.vue'
import IconCaretUp from '../components/icons/IconCaretUp.vue'
import { useAuthStore } from '../stores/auth'
import { usePlayerStore } from '../stores/player'

export default {
  data() {
    return {
      searchQuery: '',
      showFavorites: false,
      sortType: {
        name: 0, 
        duration_ms: 0,
      },
      currentlyPlayingId: null,
      songs: songsJS,
      favorites: useAuthStore().user.favorite_songs,
    };
  },
  components: {
    IconHeart,
    IconPlay,
    IconCaretUp
  },
  computed: {
    filteredSongs() {
      let filtered = [...this.songs];

      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();
        filtered = filtered.filter((song) => {
          return (
            song.name.toLowerCase().includes(query) ||
            song.album.artists.some((artist) => artist.name.toLowerCase().includes(query))
          );
        });
      }

      if (this.showFavorites) {
      filtered = filtered.filter(song => this.isFavorite(song.id));
      }

      if (this.sortType.name === 1) {
        filtered.sort((a, b) => a.name.localeCompare(b.name));
      } else if (this.sortType.name === -1) {
        filtered.sort((a, b) => b.name.localeCompare(a.name));
      } else if (this.sortType.duration_ms === 1) {
        filtered.sort((a, b) => a.duration_ms - b.duration_ms);
      } else if (this.sortType.duration_ms === -1) {
        filtered.sort((a, b) => b.duration_ms - a.duration_ms);
      }

      return filtered;
    },
  },
  methods: {
    sortBy(type) {
      if (type === 'name') {
        this.sortType.duration_ms = 0; 
        if (this.sortType.name === 0) {
          this.sortType.name = 1;
        } else if (this.sortType.name === 1) {
          this.sortType.name = -1;
        } else {
          this.sortType.name = 0;
        }
      } else if (type === 'duration_ms') {
        this.sortType.name = 0;
        if (this.sortType.duration_ms === 0) {
          this.sortType.duration_ms = 1;
        } else if (this.sortType.duration_ms === 1) {
          this.sortType.duration_ms = -1;
        } else {
          this.sortType.duration_ms = 0; 
        }
      }
    },
    selectSong(song) {
      usePlayerStore().setNowPlaying(song);
      this.currentlyPlayingId = song.id;
    },
    toggleFavorite(songId) {
      if (this.isFavorite(songId)) {
        this.favorites = this.favorites.filter((id) => id !== songId);
      } else {
        this.favorites.push(songId);
      }
      useAuthStore().updateFavoriteSongs(this.favorites);
    },
    toggleShowFavorites() {
      this.showFavorites = !this.showFavorites;
    },
    isFavorite(songId) {
      return this.favorites.includes(songId);
    },
    formatDuration(durationMs) {
      const minutes = Math.floor(durationMs / 60000);
      const seconds = ((durationMs % 60000) / 1000).toFixed(0);
      return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    },
  },
};
</script>

<style scoped>
.scrollable-content {
  overflow-y: auto;
  max-height: 500px;
}

.centered-cell {
  text-align: center;
  vertical-align: middle;
}

.active {
  font-weight: bold;
}

.active-heart {
  opacity: 0.1;
}

.album-cover {
  max-width: 100px;
  max-height: 100px;
  width: auto;
  height: auto;
}

.black-to-white {
  filter: invert(100%);
}

.flip-vertical {
  transform: scaleY(-1);
}
</style>
