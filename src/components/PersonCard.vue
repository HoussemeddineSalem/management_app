<template>
  <div>
    <button @click="fetchData">Show all Persons</button>
    <input
      type="text"
      placeholder="Filter by first fisrt name"
      v-model="filter.filterByName"
    />
    <input
      type="text"
      placeholder="Filter by last last name"
      v-model="filter.filterByLastName"
    />
    <input
      type="text"
      placeholder="Filter by email"
      v-model="filter.filterByEmail"
    />

    <table style="width: 100%">
      <tr>
        <th>ID</th>
        <th>FirstName</th>

        <th>LastName</th>
        <th>Email Adress</th>
      </tr>
      <tr v-for="item in filteredRows" :key="item.id">
        <td>{{ item.id }}</td>
        <td v-if="toggleEditButton || toggleFilterInput">{{ item.fname }}</td>
        <td v-if="!toggleEditButton && testId === item.id">
          <input v-model="editedData.fname" />
        </td>
        <td><input type="text" v-if="toggleFilterInput" /></td>
        <td v-if="toggleEditButton">{{ item.lname }}</td>
        <td v-if="!toggleEditButton && testId === item.id">
          <input v-model="editedData.lname" />
        </td>
        <td v-if="toggleEditButton">{{ item.email }}</td>
        <td v-if="!toggleEditButton && testId === item.id">
          <input v-model="editedData.email" />
        </td>

        <button @click="handleEdit(item.id)" v-if="toggleEditButton">
          Edit
        </button>
        <button @click="handleSaveAfterEdit(item.id)" v-if="!toggleEditButton">
          Save
        </button>
        <button @click="handleDelete(item.id)">Delete</button>
      </tr>
    </table>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      filter: { filterByName: '', filterByLastName: '', filterByEmail: '' },
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
    this.interval = setInterval(this.fetchData, 500);
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
      return this.usersData.filter((row) => {
        const fname = row.fname.toString().toLowerCase();
        const lname = row.lname.toString().toLowerCase();
        const email = row.email.toString().toLowerCase();

        const searchByName = this.filter.filterByName.toString().toLowerCase();
        const searchByLastName = this.filter.filterByLastName
          .toString()
          .toLowerCase();
        const searchByEmail = this.filter.filterByEmail
          .toString()
          .toLowerCase();
        return (
          fname.includes(searchByName) &&
          lname.includes(searchByLastName) &&
          email.includes(searchByEmail)
        );
      });
    },
  },
};
</script>
