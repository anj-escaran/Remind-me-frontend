<template>
  <div class="wrapper">
    <div class="passport-action">
      <v-btn class="btn-add" color="primary" @click="addNewEntry"
        ><v-icon>mdi-plus</v-icon>Add New Entry</v-btn
      >
    </div>
    <v-data-table
      :headers="headers"
      :items="passports"
      :items-per-page="5"
      class="elevation-1 passport_table"
      :loading="tableLoading"
      loading-text="Loading data... Please wait"
      @click:row="handleClick"
    >
      <template v-slot:[`item.isAlarm`]="{ item }">
        <v-switch
          v-model="item.isAlarm"
          color="success"
          hide-details
          :disabled="switchDisable"
        ></v-switch>
      </template>
      <template v-slot:[`item.validUntil`]="{ item }">
        <span>{{ item.validUntil | dateformat }}</span>
      </template>
      <template v-slot:[`item.renew`]="{ item }">
        <span>{{ item | renewFormat }}</span>
      </template>
    </v-data-table>
    <snackbar
      :snackbar="snackbar"
      :color="color"
      :message="message"
      @close="snackbar = false"
    />
    <PassportDialog
      ref="refPassportDialog"
      @saved="passportSaved"
      @deleted="deleteSaved"
      @added="addedSaved"
    />
  </div>
</template>
<script>
import PassportDialog from "./passportDialog";
import Snackbar from "../../Snackbar";
import { getPassportListAPI } from "../../services/api.service";
import _cloneDeep from "lodash/cloneDeep";
export default {
  components: { PassportDialog, Snackbar },
  data() {
    return {
      headers: [
        {
          text: "",
          align: "start",
          value: "isAlarm",
        },
        {
          text: "Lastname",
          align: "start",
          value: "lastName",
        },
        { text: "Firstname", value: "firstName" },
        { text: "Email", value: "email" },
        { text: "Cell No.", value: "cellNumber" },
        { text: "Passport No.", value: "passportNumber" },
        { text: "Valid Until", value: "validUntil" },
        { text: "Renew before expires", value: "renew", width: "100" },
      ],
      passports: [],
      switchDisable: true,
      tableLoading: false,
      snackbar: false,
      message: "",
      color: "success",
    };
  },
  methods: {
    handleClick(val) {
      this.$refs.refPassportDialog.makeDialogShow(_cloneDeep(val));
    },
    addNewEntry() {
      this.$refs.refPassportDialog.makeDialogShow();
    },
    async getPassports() {
      try {
        this.tableLoading = true;
        const data = await getPassportListAPI();
        this.passports = data.data;
      } catch (error) {
        console.log(error);
      } finally {
        this.tableLoading = false;
      }
    },
    passportSaved() {
      this.color = "success";
      this.message = "Passport successfully updated.";
      this.snackbar = true;
      this.getPassports();
    },
    addedSaved() {
      this.color = "success";
      this.message = "Passport successfully added.";
      this.snackbar = true;
      this.getPassports();
    },
    deleteSaved() {
      this.color = "success";
      this.message = "Passport successfully deleted.";
      this.snackbar = true;
      this.getPassports();
    },
  },
  mounted() {
    this.getPassports();
  },
};
</script>

<style lang="scss">
.passport-action {
  text-align: right;
  .btn-add {
    width: 180px;
  }
}
.passport_table {
  margin-top: 20px;
  tr {
    cursor: pointer;
  }
  .v-input--selection-controls {
    margin-top: 0 !important;
    padding-top: 0 !important;
  }
}
</style>
