<template>
    <div>
       <h3 class="ticket-heading">Ticket Details</h3>
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="Assigned Tickets" name="assigned">
              <el-table :data="assignedTickets" style="width: 10ß0%">
                <el-table-column prop="subject" label="Subject" width="180">
                </el-table-column>
                <el-table-column prop="status" label="Status" width="180">
                </el-table-column>
                <el-table-column prop="priority" label="priority">
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="Submited Tickets" name="submitted">
              <el-table :data="submitedTickets" style="width: 100%">
                <el-table-column prop="subject" label="Subject" width="180">
                </el-table-column>
                <el-table-column prop="status" label="Status" width="180">
                </el-table-column>
                <el-table-column prop="priority" label="Priority">
                </el-table-column>
              </el-table>
            </el-tab-pane>
          </el-tabs>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: 'TicketDetails',
  data() {
    return {
      activeName: "assigned",
    };
  },
  computed: {
    ...mapState("User", [
      "assignedTickets",
      "submitedTickets",
    ]),
  },
  methods:{
      ...mapActions("User", ["getUsers", "setSelectedUser"]),
       handleClick(tab, event) {
      console.log(tab, event);
    },
  },
  

}
</script>
<style>
.ticket-heading{
  margin-top: 22px;
}
</style>