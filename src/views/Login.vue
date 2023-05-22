<template>
  <div
    class="login-page h-full flex items-center justify-center"
    :style="{ backgroundImage: `url(${randomImage})` }"
    v-cloak
  >
    <div class="">
      <div
        :class="{ hidden: !imagesLoaded }"
        class="content-container bg-white bg-opacity-90 p-5 w-[450px] mx-auto shadow-lg rounded"
      >
        <form @submit.prevent="login" method="POST">
          <h1 class="mb-3 text-lg font-light text-center">
            Login to your account
          </h1>
          <v-alert color="error" variant="elevated" v-if="errMsg">
            <div class="flex justify-between items-center">
              <small class="px-2">{{ errMsg }}</small>
              <div
                class="rounded-full cursor-pointer p-1 hover:bg-black/30"
                @click="errMsg = ''"
              >
                <XMarkIcon class="w-5" />
              </div>
            </div>
          </v-alert>

          <div class="mb-3">
            <CustomInput
              placeholder="Email"
              type="text"
              autocomplete="email"
              v-model="email"
              :error="inputError.email ? inputError.email[0] : ''"
            />
            <CustomInput
              placeholder="Password"
              type="password"
              v-model="password"
              :error="inputError.password ? inputError.password[0] : ''"
            />
            <div class="mb-3">
              <div class="flex items-center justify-between">
                <span class="text-indigo-600">
                  <input type="checkbox" v-model="remember" />
                  Remember me?
                </span>
                <router-link class="text-indigo-600" :to="{ name: 'login' }"
                  >Forgot password</router-link
                >
              </div>
            </div>
          </div>
          <button class="bg-indigo-800 text-white py-2 px-4 w-full">
            Login
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
<script setup>
import CustomInput from "../components/Globals/CustomInput.vue";
import { XMarkIcon } from "@heroicons/vue/20/solid";
import axios from "axios";
import { useUserStore } from "../store/UserStore";
import { ref, computed, onMounted } from "vue";

const userStore = useUserStore();

const errMsg = ref("");
const inputError = ref([]);
const password = ref("");
const email = ref("");
const remember = ref(false);
const imagesLoaded = ref(false);

const login = async () => {
  try {
    const res = await axios.post("http://localhost:8000/api/login", {
      password: password.value,
      email: email.value,
    });
    errMsg.value = res.data.message;

    userStore.setUserDetails(res);
  } catch (error) {
    inputError.value = error.response.data.errors;
  }
};

const imageUrls = ref([]);
const randomIndex = ref(0);

const randomImage = computed(() => {
  return imageUrls.value[randomIndex.value] || "";
});

onMounted(async () => {
  try {
    const response = await axios.get(
      "https://pixabay.com/api/?key=36592058-20762f8b5d69f9323a49c2662&category=backgrounds&orientation=horizontal&per_page=30"
    );
    imageUrls.value = response.data.hits.map((hit) => hit.largeImageURL);
    randomIndex.value = Math.floor(Math.random() * imageUrls.value.length);
    imagesLoaded.value = true;
  } catch (error) {
    console.error("Failed to fetch images:", error);
  }
});
</script>
<style scoped>
.login-page {
  background-repeat: no-repeat;
  background-size: cover;
  min-height: 100vh;
}
.content-container.hidden {
  display: none;
}
</style>
