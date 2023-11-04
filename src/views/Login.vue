<template>
    <div id="login-view">
        <form class="login-form" @submit="submitForm">
            <div class="wrapper-logo">
                <img src="@/assets/logo.svg" />
                <div>KRAKEN.FM</div>
            </div>
            <input id="input-email" v-model="email" placeholder="E-mail" />
            <input id="input-password" v-model="password" type="password" placeholder="Password" />
            <button id="btn-submit" type="submit" :disabled="isSubmitDisabled">LOGIN</button>
        </form>
    </div>
</template>
  
<script>
import { useAuthStore } from '../stores/auth';

export default {
    data() {
        return {
            email: '',
            password: ''
        };
    },
    computed: {
        isSubmitDisabled() {
            return !this.email || !this.password || this.password.length < 6;
        },
    },
    methods: {
        submitForm() {
            if (!this.isSubmitDisabled) {
                useAuthStore().authenticate(this.email, this.password);
            }
        },
    },
};
</script>
  