<template>
  <div class="mb-4 mr-0">
    <!-- <button @click="fetchData">Show all Persons</button> -->

    <label class="text-sm font-sans text-gray-900 block mb-2">
      Search by Attribute ( FirstName, LastName, Email )
    </label>
    <input
      type="text"
      placeholder="Filter by first fisrt name"
      v-model="filter"
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
    <!-- <input
      type="text"
      placeholder="Filter by last last name"
      v-model="filterByLastName"
    /> -->
    <!-- <input type="text" placeholder="Filter by email" v-model="filterByEmail" /> -->

    <table class="lg:w-full border font-sans mt-8">
      <tr>
        <th class="text-center p-3 border border-blue-200 bg-gray-300 sm:w-min">
          ID
        </th>
        <th class="text-center p-3 border border-blue-200 bg-gray-300">
          FirstName
        </th>

        <th class="text-center p-3 border border-blue-200 bg-gray-300">
          LastName
        </th>
        <th class="text-center p-3 border border-blue-200 bg-gray-300">
          Email Adress
        </th>
      </tr>
      <tr v-for="item in filteredRows" :key="item.id">
        <td class="border border-blue-200 bg-gray-200 text-center">
          {{ item.id }}
        </td>
        <td class="border border-blue-200 bg-gray-200 text-center">
          <div v-if="toggleEditButton || toggleFilterInput">
            {{ item.fname }}
          </div>
          <div v-if="!toggleEditButton && testId === item.id">
            <input
              class="lg:w-full sm:w-16"
              v-model="editedData.fname"
              :placeholder="item.fname"
            />
          </div>
        </td>
        <td class="border border-blue-200 bg-gray-200 text-center">
          <!-- <div><input type="text" v-if="toggleFilterInput" /></div> -->
          <div v-if="toggleEditButton">{{ item.lname }}</div>
          <div v-if="!toggleEditButton && testId === item.id">
            <input
              class="lg:w-full sm:w-16"
              v-model="editedData.lname"
              :placeholder="item.lname"
            />
          </div>
        </td>
        <td class="border border-blue-200 bg-gray-200 text-center">
          <div v-if="toggleEditButton">{{ item.email }}</div>
          <div v-if="!toggleEditButton && testId === item.id">
            <input
              class="lg:w-full sm:w-16"
              v-model="editedData.email"
              :placeholder="item.email"
            />
          </div>
        </td>
        <div class="flex flex-row justify-around">
          <button
            @click="handleEdit(item.id)"
            v-if="toggleEditButton"
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
              mt-2
              mb-3
            "
          >
            Edit
          </button>
          <button
            @click="handleSaveAfterEdit(item.id)"
            v-if="!toggleEditButton"
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
              mt-2
              mb-3
            "
          >
            Save
          </button>
          <button
            @click="handleDelete(item.id)"
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
              mt-2
              mb-3
            "
          >
            Delete
          </button>
        </div>
      </tr>
    </table>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      filter: '',
      toggleEditButton: true,
      toggleFilterInput: false,
      testId: '',
      usersData: [],
      editedData: {
        fname: '',
        lname: '',
        email: '',
      },
      interval: null,
    };
  },
  created() {
    setInterval(this.fetchData, 500);
  },
  beforeUnmount() {
    clearInterval(this.interval);
  },
  methods: {
    fetchData() {
      axios
        .get('https://tcc-tech-test-default-rtdb.firebaseio.com/persons.json')
        .then((res) => {
          const data = res.data;
          const users = [];
          for (let key in data) {
            const user = data[key];
            user.id = key;
            users.push(user);
          }
          this.usersData = users;
          // this.filter.length === 0
          //   ? (this.usersData = users)
          //   : (this.usersData = this.usersData.includes(this.filter));
          // console.log(this.usersData.includes(this.filter));
        })
        .catch((err) => console.log(err));
    },
    handleEdit(id) {
      this.toggleEditButton = !this.toggleEditButton;
      this.testId = id;
    },
    handleSaveAfterEdit(id) {
      this.toggleEditButton = !this.toggleEditButton;
      axios
        .patch(
          `https://tcc-tech-test-default-rtdb.firebaseio.com/persons/${id}.json`,
          this.editedData
        )
        .then((response) => {
          console.log(response);
          this.editedData.fname = '';
          this.editedData.lname = '';
          this.editedData.email = '';
        })
        .catch((error) => {
          console.log(error);
        });
    },
    handleDelete(id) {
      console.log(id);
      axios
        .delete(
          `https://tcc-tech-test-default-rtdb.firebaseio.com/persons/${id}.json`
        )
        .then((response) => {
          console.log(response);
          const Index = this.usersData.findIndex((p) => p.id === id);
          this.usersData.splice(Index, 1);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    handleFilter() {
      this.toggleFilterInput = !this.toggleFilterInput;
    },
  },
  computed: {
    filteredRows() {
      const searchedWord = this.filter;
      return this.usersData.filter(function (el) {
        return (
          el.fname.includes(searchedWord) ||
          el.lname.includes(searchedWord) ||
          el.email.includes(searchedWord)
        );
      });
    },
  },
};
</script>
