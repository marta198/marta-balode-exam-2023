<template>
    <div id="album-view" class="scrollable-content">
        <div class="wrapper-header">
            <h1>ALBUMS</h1>
            <div class="settings">
                <button id="btn-grid" @click="setAlbumLayout('grid')" :class="{ active: albumLayout === 'grid' }">
                    <IconGrid />
                </button>
                <button id="btn-list" @click="setAlbumLayout('list')" :class="{ active: albumLayout === 'list' }">
                    <IconList />
                </button>
            </div>
        </div>
        <ul id="list-albums" :class="{ grid: albumLayout === 'grid' }">
            <li class="album" v-for="albumItem in albums" :key="albumItem.album.id" @dblclick="selectAlbum(albumItem.songs)"
                :class="{ active: albumItem.album.id === nowPlayingAlbumId }">
                <img id="img-album" :src="albumItem.album.images[0].url" />
                <div class="album-info">
                    <h4 id="txt-album-name">{{ albumItem.album.name }}</h4>
                    <p id="txt-album-artists">{{ getArtists(albumItem.album.artists) }}</p>
                    <div class="album-year">
                        <p id="txt-album-year">{{ getYear(albumItem.album.release_date) }}</p>
                        <p id="txt-album-tracks">{{ getTrackCountText(albumItem.songs.length) }}</p>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>
  
  
<script>
import IconGrid from "@/components/icons/IconGrid.vue";
import IconList from "@/components/icons/IconList.vue";
import songs from '../data/songs';
import { usePlayerStore } from "../stores/player";

export default {
    components: {
        IconGrid,
        IconList,
    },
    data() {
        return {
            albumLayout: "grid",
            usePlayerStore: usePlayerStore()
        };
    },
    computed: {
        albums() {
            const albumMap = new Map();

            songs.forEach((song) => {
                const albumId = song.album.id;

                if (!albumMap.has(albumId)) {
                    albumMap.set(albumId, {
                        album: song.album,
                        songs: [song],
                    });
                } else {
                    albumMap.get(albumId).songs.push(song);
                }
            });

            return Array.from(albumMap.values());
        },
        nowPlayingAlbumId() {
            return usePlayerStore().getNowPlayingAlbumId;
        },
    },
    methods: {
        switchToGridLayout() {
            this.albumLayout = "grid";
        },
        switchToListLayout() {
            this.albumLayout = "list";
        },
        selectAlbum(songs) {
            usePlayerStore().setPlaylist(songs);
            usePlayerStore().setNowPlaying(songs[0]);
        },
        getArtists(artists) {
            return artists.map((artist) => artist.name).join(", ");
        },
        getYear(releaseDate) {
            return new Date(releaseDate).getFullYear();
        },
        getTrackCountText(trackCount) {
            if (trackCount === 1) {
                return "1 song";
            } else {
                return `${trackCount} songs`;
            }
        },
        setAlbumLayout(layout) {
            this.albumLayout = layout;
        },
    }
};
</script>
  
<style scoped>
.scrollable-content {
    overflow-y: auto;
    max-height: 500px;
}

.active {
    max-height: 500px;
}
</style>