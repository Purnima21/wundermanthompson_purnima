<template>
  <div class="container-fluid text-center mt-5">
    <el-row>
      <el-button type="primary" v-on:click="goback">Back</el-button>
    </el-row>
    <div class="row user-detail-row">
      <div class="col-12">
        <div
          v-if="Object.keys(selectedUser).length"
          style="padding-top:10px; width: 100%;"
        >
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <h3>User: {{ selectedUser.name }}</h3>
            </div>
            <div
              v-for="(value, propertyName, index) in selectedUser"
              :key="index"
              class="text item"
            >
              <div>{{ propertyName }}</div>
              <div>{{ value }}</div>
            </div>
          </el-card>
          <br />
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <h3>Organization {{ selectedUserOrg.id }}</h3>
            </div>
            <div
              v-for="(value, propertyName, index) in selectedUserOrg"
              :key="index"
              class="text item"
            >
              <div>{{ propertyName }}</div>
              <div>{{ value }}</div>
            </div>
          </el-card>
          <ticket-details></ticket-details>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import TicketDetails from "./TicketDetails.vue";

export default {
  components: {
    TicketDetails,
  },
  data() {
    return {
      selectedKey: "name",
      query: "",
      selected: "",
    };
  },
  computed: {
    ...mapState("User", [
      "users",
      "organization",
      "selectedUser",
      "selectedUserOrg",
    ]),
  },
  methods: {
    ...mapActions("User", ["getUsers", "setSelectedUser"]),
    clickHandler() {
      // event fired when clicking on the input
    },
    goback() {
      this.$router.push({ path: `/` })
    },
    onSelected(item) {
      console.log(this);
      this.selected = item.item;
      this.setSelectedUser({ selectedUser: item.item });
    },
    onInputChange(text) {
      if (!text || text.length < 2) {
        return [];
      }
      return this.getUsers({ key: this.selectedKey, value: text });
    },
    getSuggestionValue(suggestion) {
      return suggestion.item.name;
    },
    onSelectedKey(e) {
      console.log(e.target.value);
    },
    async _goToHome() {
      this.$router.push({ path: `/` });
    },
  },
  created() {
    this.setSelectedUser({ selectedUserId: this.$route.params.id });
  },
};
</script>

<style scoped>
.user-detail-row {
  padding: 3em;
}
.thead-vue {
  background: #35495e !important;
  color: #fff;
}

.btn-reload {
  text-decoration: none;
}

.btn-reload .ti-reload {
  font-weight: bold;
  font-size: 24px;
}

.demo {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}

input {
  width: 260px;
  padding: 0.5rem;
}

ul {
  width: 100%;
  color: rgba(30, 39, 46, 1);
  list-style: none;
  margin: 0;
  padding: 0.5rem 0 0.5rem 0;
}
li {
  margin: 0 0 0 0;
  border-radius: 5px;
  padding: 0.75rem 0 0.75rem 0.75rem;
  display: flex;
  align-items: center;
}
li:hover {
  cursor: pointer;
}

.autosuggest-container {
  display: flex;
  justify-content: center;
  width: 280px;
}

#autosuggest {
  width: 100%;
  display: block;
}
.autosuggest__results-item--highlighted {
  background-color: rgba(51, 217, 178, 0.2);
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #f3f0ed2b;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
</style>
