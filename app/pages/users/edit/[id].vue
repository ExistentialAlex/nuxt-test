<script lang="ts" setup>
import { FetchError } from 'ofetch';
import { updateUserSchema, type UpdateUserSchema } from '~~/shared/schemas';

definePageMeta({
  middleware: ['authenticated'],
  breadcrumbs: [
    {
      to: '/users',
      label: 'users.breadcrumbs.list',
    },
    {
      to: '',
      label: 'users.breadcrumbs.edit',
      params: { id: (route) => route.params.id as string },
    },
  ],
});

const toast = useToast();

const { id } = useRoute().params;
const { data, error } = await useAsyncData('user:data', () => $fetch(`/api/users/${id}`));

watch(error, (err) => {
  if (err) {
    toast.add({
      title: 'Error Fetching User Data',
      description:
        (err.data as FetchError).message || 'An error occurred while fetching user data.',
      color: 'error',
    });
  }
});

const model = reactive<UpdateUserSchema>({
  name: data.value?.name || '',
  jobTitle: data.value?.jobTitle || '',
});

const onSubmit = async () => {
  console.log('Submitting user update:', model);

  try {
    const data = await $fetch(`/api/users/${id}`, {
      method: 'PATCH',
      body: model,
    });

    toast.add({
      title: 'User Updated Successfully',
      description: `User ${data.name} has been updated.`,
      color: 'success',
    });

    navigateTo(`/users/${data.id}`);
  } catch (err) {
    toast.add({
      title: 'Error Updating User',
      description: (err as FetchError).message || 'An error occurred while updating user data.',
      color: 'error',
    });
  }
};
</script>

<template>
  <div class="p-4">
    <UForm class="flex flex-col gap-4" :state="model" :schema="updateUserSchema" @submit="onSubmit">
      <UFormField label="Name" name="name">
        <UInput v-model="model.name" class="w-full" />
      </UFormField>
      <UFormField label="Job Title" name="jobTitle">
        <UInput v-model="model.jobTitle" class="w-full" />
      </UFormField>
      <UButton type="submit" class="justify-center">Save</UButton>
    </UForm>
  </div>
</template>
