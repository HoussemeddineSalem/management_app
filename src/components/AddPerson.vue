<template>
  <form>
    <label>Fisrt Name</label>
    <input type="text" v-model="fname" />
    <label>Last Name</label>
    <input type="text" v-model="lname" />
    <label>Email</label>
    <input type="text" v-model="email" />
    <button @click.prevent="handleSubmit">Submit</button>
  </form>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      name: '',
      phone: '',
      email: '',
    };
  },
  methods: {
    handleSubmit() {
      console.log(this.fname, this.lname, this.email);
      axios.post(
        'https://tcc-tech-test-default-rtdb.firebaseio.com/persons.json',
        {
          fname: this.fname,
          lname: this.lname,
          email: this.email,
        }
      );
      this.fname = '';
      this.lname = '';
      this.email = '';
    },
  },
};
</script>
