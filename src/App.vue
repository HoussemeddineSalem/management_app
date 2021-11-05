<template>
  <div class="bg-blue-100 lg:w-full sm:w-full">
    <section class="ml-28 mr-28">
      <div
        class="
          bg-green-600
          mb-20
          rounded-2xl
          h-20
          flex
          justify-center
          items-center
        "
      >
        <p class="font-sans lg:text-5xl sm:text-2xl text-white tracking-widest">
          Tcc Technical Test Management App
        </p>
      </div>

      <add-person></add-person>
      <person-card></person-card>
    </section>
    <div class="flex flex-col items-center justify-around bg-green-300 h-24">
      <p>
        Made with Love
        <span>&#128512;</span>
      </p>
      <p>Houssem eddine Salem</p>
    </div>
  </div>
</template>

<script>
import AddPerson from './components/AddPerson.vue';
import PersonCard from './components/PersonCard.vue';
export default {
  components: {
    AddPerson,
    PersonCard,
  },
};
</script>
