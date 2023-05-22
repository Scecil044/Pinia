<template>
  <div class="">
    <div class="max-w-7xl mx-auto mt-10">
      <header class="space-x-2">
        <router-link
          :to="{ name: 'createSkill' }"
          class="bg-indigo-800 text-white py-2 px-4"
          >Create skill</router-link
        >
        <router-link
          :to="{ name: 'editSkill' }"
          class="bg-indigo-800 text-white py-2 px-4"
          >edit skill</router-link
        >
      </header>

      <div class="relative overflow-x-auto mt-12">
        <div class="flex justify-end mt-2 p-5">
          <router-link
            :to="{ name: 'createSkill' }"
            class="bg-indigo-800 text-white py-2 px-4"
            >New Skill</router-link
          >
        </div>
        <table
          class="w-full text-sm text-left text-gray-500 dark:text-gray-400"
        >
          <thead
            class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
          >
            <tr>
              <th scope="col" class="px-6 py-3">id</th>
              <th scope="col" class="px-6 py-3">Title</th>
              <th scope="col" class="px-6 py-3">Slug</th>
              <th scope="col" class="px-6 py-3">Last Created</th>
              <th scope="col" class="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="skill in skills"
              :key="skill.id"
              class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            >
              <th
                scope="row"
                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {{ skill.id }}
              </th>
              <td class="px-6 py-4">{{ skill.title }}</td>
              <td class="px-6 py-4">{{ skill.slug }}</td>
              <td class="px-6 py-4">{{ skill.created_at }}</td>
              <td class="flex px-6 py-4 space-x-2">
                <router-link
                  :to="{ name: 'editSkill', params: { id: skill.id } }"
                  class="py-2 px-3 bg-indigo-600 text-white"
                  >Edit</router-link
                >
                <button
                  @click="deleteSkill(skill.id)"
                  type="submit"
                  class="bg-red-500 py-2 px-3 text-white"
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script setup>
import useSkills from "../../composables/skills";
import { onMounted } from "vue";

const { skills, getSkills, deleteSkill } = useSkills();

onMounted(() => getSkills());
</script>
<style scoped></style>
