<template>
    <div id="app">
    <nav id="nav-main" class="wrapper-navigation">
        <ol>
            <li v-for="item in navItems" :key="item.id">
                <router-link :to="item.link" >{{ item.label }}</router-link>
            </li>
        </ol>
    </nav>
    </div>
</template>

<script>
export default {
    name: 'NavigationComponent',
    data() {
        return {
            navItems: [
                { id: 1, label: 'SONGS', link: '/' },
                { id: 2, label: 'ALBUMS', link: '/albums' },
                { id: 3, label: 'ABOUT', link: '/about' },
            ]
        };
    }
};
</script>

<style scoped>
.router-link-active {
      background-color: #666;
      color: white;
    }
</style>