<template>
  <div class="max-w-lg mx-auto mb-9">
    <form class="flex flex-col border bg-blue-100">
      <p
        class="
          mb-2
          text-center
          font-medium
          text-2xl
          italic
          tracking-wide
          underline
        "
      >
        Add a person
      </p>
      <div class="mb-6">
        <label class="text-sm font-medium text-gray-900 block mb-2">
          Fisrt Name
        </label>
        <input
          type="text"
          v-model="fname"
          class="
            bg-gray-50
            border border-gray-300
            text-gray-900
            sm:text-sm
            rounded-lg
            focus:ring-blue-500 focus:border-blue-500
            block
            w-full
            p-2.5
          "
        />
      </div>
      <div class="mb-6">
        <label class="text-sm font-medium text-gray-900 block mb-2">
          Last Name
        </label>
        <input
          type="text"
          v-model="lname"
          class="
            bg-gray-50
            border border-gray-300
            text-gray-900
            sm:text-sm
            rounded-lg
            focus:ring-blue-500 focus:border-blue-500
            block
            w-full
            p-2.5
          "
        />
      </div>
      <div class="mb-6">
        <label class="text-sm font-medium text-gray-900 block mb-2">
          Email
        </label>
        <input
          type="text"
          v-model="email"
          class="
            bg-gray-50
            border border-gray-300
            text-gray-900
            sm:text-sm
            rounded-lg
            focus:ring-blue-500 focus:border-blue-500
            block
            w-full
            p-2.5
          "
        />
      </div>
      <div class="flex justify-center">
        <button
          @click.prevent="handleSubmit"
          class="
            text-white
            bg-green-900
            hover:bg-green-600
            focus:ring-4 focus:ring-blue-300
            font-medium
            rounded-lg
            text-sm
            px-5
            py-2.5
          "
        >
          Submit
        </button>
      </div>
    </form>
  </div>
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
      //handle Submit is for posting the input data into the database
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
