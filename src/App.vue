<template>
  <section>
    <h2>
      Tcc Technical Test
      <br />
      person management app
    </h2>
    <add-person></add-person>
    <person-card></person-card>
  </section>
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
