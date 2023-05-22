import axios from 'axios'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
    state: () => ({
        id: null,
        email: null,
        token: null,
        first_name: null,
        last_name: null,
        // image: null,
        // location: null,
        // description: null
    }),
    actions: {
        async setUserDetails(res) {
            this.$state.id = res.data.user.id
            this.$state.token = res.data.token
            this.$state.email = res.data.user.email
            this.$state.first_name = res.data.user.first_name
            this.$state.last_name = res.data.user.last_name
            // this.location = res.data.user.location
            // this.description = res.data.user.description
        },
        async fetchUser() {
            let res = await axios.get('http:localhost:8000/api/users/' + this.$state.id)

            this.$state.id = res.data.user.id
            this.$state.email = res.data.user.email
            this.$state.first_name = res.data.user.first_name
            this.$state.last_name = res.data.user.last_name
            this.$state.location = res.data.user.location
            this.$state.description = res.data.user.description
        },
        clearUser() {
            this.$state.id = null
            this.$state.token = null
            this.$state.email = null
            this.$state.first_name = null
            this.$state.last_name = null
            this.$state.location = null
            this.$state.description = null
        }
    },
    persist: true

})
