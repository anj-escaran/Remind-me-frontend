<template>
  <div class="passport-dialog-wrapper">
    <v-dialog v-model="showDialog" persistent width="700">
      <!-- <template v-slot:dialogbody> -->
      <v-card elevation="0">
        <v-app-bar class="sub-bar" color="#ece5e5" dense elevation="0">
          <v-toolbar-title v-if="!isAdd">{{
            isEdit ? "Passport Info" : "Edit Passport Info"
          }}</v-toolbar-title>
          <v-toolbar-title v-else>New Passport Entry</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn class="sub-close" icon @click="close">
            <v-icon>mdi-close-box</v-icon>
          </v-btn>
        </v-app-bar>
        <v-card-title> </v-card-title>
        <v-card-text>
          <v-form ref="form" lazy-validation :disabled="isEdit">
            <v-row>
              <v-col xs="12" sm="12" md="6">
                <v-text-field
                  outlined
                  v-model="data.lastName"
                  label="Lastname"
                ></v-text-field>
              </v-col>
              <v-col xs="12" sm="12" md="6">
                <v-text-field
                  outlined
                  v-model="data.firstName"
                  label="Firstname"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col xs="12" sm="12" md="6">
                <v-text-field
                  outlined
                  v-model="data.email"
                  label="Email"
                ></v-text-field>
              </v-col>
              <v-col xs="12" sm="12" md="6">
                <v-text-field
                  outlined
                  v-model="data.cellNumber"
                  label="Cell No."
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col xs="12" sm="12" md="6">
                <v-text-field
                  outlined
                  v-model="data.passportNumber"
                  label="Passport No."
                ></v-text-field>
              </v-col>
              <v-col xs="12" sm="12" md="6">
                <v-dialog
                  ref="dialog"
                  v-model="modal"
                  :return-value.sync="date"
                  persistent
                  width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      outlined
                      :value="computedDateFormattedDatefns"
                      label="Valid Until"
                      prepend-inner-icon="mdi-calendar"
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="date" scrollable>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="modal = false">
                      Cancel
                    </v-btn>
                    <v-btn
                      text
                      color="primary"
                      @click="$refs.dialog.save(date)"
                    >
                      OK
                    </v-btn>
                  </v-date-picker>
                </v-dialog>
              </v-col>
            </v-row>
            <v-row>
              <v-col xs="12" sm="12" md="6">
                <v-row no-gutters>
                  <v-col md="7">
                    <v-text-field
                      outlined
                      type="number"
                      v-model="data.spanPriorExpi"
                      label="Renew before expires"
                    ></v-text-field>
                  </v-col>
                  <v-col md="5">
                    <v-select
                      outlined
                      v-model="data.spanCalendarType"
                      :items="items"
                    ></v-select>
                  </v-col>
                </v-row>
              </v-col>
              <v-col xs="12" sm="12" md="6">
                <v-switch
                  class="switch-status"
                  v-model="data.isAlarm"
                  color="success"
                  inset
                  :label="data.isAlarm | onOff"
                ></v-switch>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions style="justify-content: right">
          <v-btn
            class="btnSubmit"
            :color="isEdit ? 'primary' : 'success'"
            @click="handleSubmit"
            :loading="btnSubmitLoading"
            >{{ isEdit ? "Edit" : "Save" }}</v-btn
          >
          <v-btn
            class="btnSubmit"
            color="warning"
            v-if="isEdit"
            @click="handleDelete"
            :loading="btnDeleteLoading"
            >Delete</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogDelete" max-width="400px">
      <v-card>
        <v-card-title class="text-h7"
          ><p style="word-break: break-word">
            Are you sure you want to delete this item?
          </p></v-card-title
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialogDelete = false"
            >Cancel</v-btn
          >
          <v-btn color="blue darken-1" text @click="deleteItemConfirm"
            >OK</v-btn
          >
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { format, parseISO } from "date-fns";
import {
  updatePassportAPI,
  deletePassportAPI,
  addPassportListAPI,
} from "../../services/api.service";
export default {
  data() {
    return {
      showDialog: false,
      width: 500,
      modal: false,
      date: null,
      isEdit: true,
      isAdd: false,
      btnSubmitLoading: false,
      btnDeleteLoading: false,
      dialogDelete: false,
      data: {
        cellNumber: "",
        email: "",
        firstName: "",
        isAlarm: null,
        lastName: "",
        passportNumber: "",
        remindDate: "",
        spanCalendarType: "",
        spanPriorExpi: "",
        validUntil: "",
      },
      items: ["Day(s)", "Month(s)"],
    };
  },
  components: {},
  methods: {
    makeDialogShow(val) {
      this.showDialog = true;
      if (val) {
        this.data = val;
        this.date = new Date(val.validUntil).toISOString().substr(0, 10);
      } else {
        this.isAdd = true;
        this.isEdit = false;
      }
    },
    close() {
      this.isEdit = true;
      this.showDialog = false;
      this.isAdd = false;
      this.data = {
        cellNumber: "",
        email: "",
        firstName: "",
        isAlarm: null,
        lastName: "",
        passportNumber: "",
        remindDate: "",
        spanCalendarType: "",
        spanPriorExpi: "",
        validUntil: "",
      };
    },
    async handleSubmit() {
      if (this.isAdd) {
        this.handleAddEntry();
      } else {
        if (this.isEdit) {
          this.isEdit = false;
        } else {
          try {
            this.btnSubmitLoading = true;
            this.data.validUntil = new Date(this.data.validUntil)
              .toISOString()
              .substr(0, 10);
            await updatePassportAPI(this.data);
            this.$emit("saved");
            this.close();
          } catch (error) {
            console.log(error);
          } finally {
            this.btnSubmitLoading = false;
          }
        }
      }
    },
    async handleAddEntry() {
      try {
        this.btnSubmitLoading = true;
        delete this.data["remindDate"];
        this.data.validUntil = new Date(this.data.validUntil)
          .toISOString()
          .substr(0, 10);
        await addPassportListAPI(this.data);
        this.$emit("added");
            this.close();
      } catch (error) {
        console.log(error);
      } finally {
        this.btnSubmitLoading = false;
      }
    },
    handleDelete() {
      this.dialogDelete = true;
    },
    async deleteItemConfirm() {
      try {
        this.dialogDelete = false;
        this.btnDeleteLoading = true;
        await deletePassportAPI(this.data.id);
        this.$emit("deleted");
        this.close();
      } catch (error) {
        console.log(error);
      } finally {
        this.btnDeleteLoading = true;
      }
    },
  },
  watch: {
    date: function (val) {
      this.data.validUntil = format(parseISO(val), "PP");
    },
  },
  computed: {
    computedDateFormattedDatefns() {
      return this.date ? format(parseISO(this.date), "PP") : "";
    },
  },
};
</script>

<style lang="scss">
.passport-dialog-wrapper {
}
.switch-status {
  width: 140px;
  margin: auto;
  margin-top: 10px;
}
.btnSubmit {
  width: 150px;
}
</style>
