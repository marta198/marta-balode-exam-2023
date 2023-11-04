<template>
    <div id="app">
      <Header v-if="isAuthenticated" > </Header>

      <div id="section-body">
        <NavigationComponent v-if="isAuthenticated"/>
        <router-view />
      </div>

      <div id="section-player" v-if="isAuthenticated">
        <AudioPlayer />
      </div>

    </div>
  </template>
  
  <script>
  import { useAuthStore } from "@/stores/auth";
  import Header from "@/components/HeaderComponent.vue";
  import AudioPlayer from "@/components/AudioPlayerComponent.vue";
  import NavigationComponent from "@/components/NavigationComponent.vue";
  
  export default {
    components: {
      Header,
      AudioPlayer,
      NavigationComponent
    },
    computed: {
      isAuthenticated() {
        return useAuthStore().is_authenticated;
      },
    },
    methods: {
        isloggedin() {
            return useAuthStore().is_authenticated;
        }
    }
  };
  </script>
  