<template>
  <div class="mb-4">
    <input
      :type="type"
      :placeholder="placeholder"
      class="w-full form-input border-b focus:border-black"
      v-model="computedInput"
      :autocomplete="autocomplete"
    />
    <small class="text-red-500">{{ error }}</small>
  </div>
</template>
<script setup>
import { computed } from "vue";

const props = defineProps({
  placeholder: String,
  type: String,
  modelValue: String,
  error: String,
  autocomplete: String,
});

const emit = defineEmits(["update:modelValue"]);

const computedInput = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});
</script>
