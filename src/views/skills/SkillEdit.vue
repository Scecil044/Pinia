<template>
  <div class="mt-16 p-5 max-w-7xl mx-auto">
    <form
      @submit.prevent="updateSkill($route.params.id)"
      method="POST"
      class="max-w-md bg-white shadow-md p-4 mx-auto"
    >
      <div class="mb-4">
        <div class="mb-2">
          <label for="title">Title</label>
        </div>
        <input
          id="title"
          type="text"
          placeholder="Title"
          class="w-full"
          v-model="skill.title"
        />
        <div v-if="errors.title">
          <span class="text-sm text-red-500 mt-1">{{ errors.title[0] }}</span>
        </div>
      </div>

      <div class="mb-4">
        <div class="mb-2">
          <label for="description">Description</label>
        </div>
        <input
          id="description"
          type="text"
          placeholder="Description"
          class="w-full"
          v-model="skill.description"
        />
        <div v-if="errors.description">
          <span class="text-sm text-red-500 mt-1">{{
            errors.description[0]
          }}</span>
        </div>
      </div>

      <div class="mb-4">
        <button
          type="submit"
          class="py-2 px-4 bg-indigo-800 text-white rounded hover:bg-indigo-600"
        >
          Save
        </button>
      </div>
    </form>
  </div>
</template>
<script setup>
import useSkills from "../../composables/skills";
import { onMounted } from "vue";

const { skill, updateSkill, getSkill, errors } = useSkills();

const props = defineProps({
  id: {
    required: true,
    id: String,
  },
});
onMounted(() => getSkill(props.id));
</script>
