<template>
  <div class="container text-center mt-5">
    <el-row>
      <el-col :span="8">
        <label>Filter By :</label>
        <el-select @change="onSelectedKey($event)" v-model="selectedKey">
          <el-option label="url" value="url">url</el-option>
          <el-option label="external_id" value="external_id"
            >external_id</el-option
          >
          <el-option label="name" value="name">name</el-option>
          <el-option label="alias" value="alias">alias</el-option>
          <el-option label="created_at" value="created_at"
            >created_at</el-option
          >
          <el-option label="active" value="active">active</el-option>
          <el-option label="verified" value="verified">verified</el-option>
          <el-option label="shared" value="shared">shared</el-option>
          <el-option label="locale" value="locale">locale</el-option>
          <el-option label="timezone" value="timezone">timezone</el-option>
          <el-option label="last_login_at" value="last_login_at"
            >last_login_at</el-option
          >
          <el-option label="email" value="email">email</el-option>
          <el-option label="phone" value="phone">phone</el-option>
          <el-option label="signature" value="signature">signature</el-option>
          <el-option label="organization_id" value="organization_id"
            >organization_id</el-option
          >
          <el-option label="tags" value="tags">tags</el-option>
          <el-option label="suspended" value="suspended">suspended</el-option>
          <el-option label="role" value="role">tags</el-option>
        </el-select>
      </el-col>
      <el-col :span="8">
        <div class="demo-">
          <div class="autosuggest-container-">
            <vue-autosuggest
              :suggestions="[
                {
                  data: filterUser,
                },
              ]"
              :input-props="{
                id: 'autosuggest__input',
                placeholder: 'Search User',
              }"
              @input="onInputChange"
              @selected="onSelected"
            >
              <template slot-scope="{ suggestion }">
                <span class="my-suggestion-item">{{
                  suggestion.item.name
                }}</span>
              </template>
            </vue-autosuggest>
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <el-button type="primary" @click="search" plain>Search</el-button>
        <el-button type="info" @click="reset" plain>Reset</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
//import { mapActions, mapState, mapMutations, mapGetters } from 'vuex'
import { mapState, mapActions } from "vuex";
import { VueAutosuggest } from "vue-autosuggest";
export default {
  namespaced: true,
  name: "SearchForm",
  components: {
    VueAutosuggest,
  },
  data() {
    return {
      timeoutRef: undefined,
      selectedKey: "name",
      query: "",
      selected: "",
      filterUser: [],
    };
  },
  computed: {
    ...mapState("User", ["users"]),
  },
  methods: {
    ...mapActions("User", ["getUsers", "setSelectedUser", "getAllUsers"]),
    onSelected(item) {
      this.selected = item.item;
    },
    reset() {
      this.getAllUsers({ reset: true });
    },
    debounce(callback, ms) {
      if (this.timeoutRef) {
        clearTimeout(this.timeoutRef);
      }
      this.timeoutRef = setTimeout(callback, ms);
    },
    onInputChange(text) {
      this.query = text;
      if (!text || text.length < 2) {
        return [];
      }

      this.debounce(() => {
        this.filterUser = this.users.filter(
          (user) =>
            user[this.selectedKey] &&
            String(user[this.selectedKey])
              .toLowerCase()
              .indexOf(text.toLowerCase()) > -1
        );
      }, 1000);
    },
    onSelectedKey(e) {
      console.log(e.target.value);
    },
    search() {
      if (this.selected) {
        this.getUsers({ userId: this.selected._id });
      } else {
        this.getUsers({ key: this.selectedKey, value: this.query });
      }
    },
  },
  created() {
    this.getAllUsers({ reset: false });
  },
};
</script>

<style>
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

#autosuggest__input {
  height: 40px;
  outline: none;
  position: relative;
  display: block;
  font-family: monospace;
  font-size: 15px;
  border: 1px solid #dcdfe6;
  color: #606266;
  padding: 10px;
  width: 100%;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
}

#autosuggest__input.autosuggest__input-open {
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

.autosuggest__results-container {
  position: relative;
  width: 100%;
}

.autosuggest__results {
  font-weight: 300;
  margin: 0;
  position: absolute;
  z-index: 10000001;
  width: 100%;
  border: 1px solid #e0e0e0;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  background: white;
  padding: 0px;
  overflow: scroll;
  max-height: 200px;
}

.autosuggest__results ul {
  list-style: none;
  padding-left: 0;
  margin: 0;
}

.autosuggest__results .autosuggest__results_item {
  cursor: pointer;
  padding: 15px;
}

#autosuggest ul:nth-child(1) > .autosuggest__results_title {
  border-top: none;
}

.autosuggest__results .autosuggest__results_title {
  color: gray;
  font-size: 11px;
  margin-left: 0;
  padding: 15px 13px 5px;
  border-top: 1px solid lightgray;
}

.autosuggest__results .autosuggest__results_item:active,
.autosuggest__results .autosuggest__results_item:hover,
.autosuggest__results .autosuggest__results_item:focus,
.autosuggest__results
  .autosuggest__results_item.autosuggest__results_item-highlighted {
  background-color: #ddd;
}
</style>
