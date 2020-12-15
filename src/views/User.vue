<template>
  <v-card elevation="2">
    <v-container>
      <v-row v-if="successMessage !== null">
        <v-col>
          <v-alert type="success" transition="scroll-y-transition">
            {{ successMessage }}
          </v-alert>
        </v-col>
      </v-row>
      <v-row v-if="errorMessages.length > 0" >
        <v-col>
          <v-alert
              type="error"
              dismissible
              transition="scroll-y-transition"
              v-for="(errorMessage, index) in errorMessages"
              :key="index"
              dense
          >
            {{ errorMessage }}
          </v-alert>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          Please enter your name and pick the Sectors you are currently involved in.
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field label="First name" filled v-model="firstName"/>
          <v-text-field label="Last name" filled v-model="lastName"/>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          Sectors:
          <v-treeview
              selectable
              :items="allSectors"
              hoverable
              v-model="selectedSectors"
              label="Sectors"
          >
          </v-treeview>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-checkbox
              v-model="hasAgreedToTerms"
              label="Agree to terms"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-btn
              color="primary"
              elevation="2"
              @click="save"
          >Save
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import {
  VForm,
  VTextField,
  VTreeview,
  VCard,
  VContainer,
  VCheckbox,
  VBtn,
    VAlert
} from "vuetify/lib";

export default {
  name: "User",

  components: {
    VTextField,
    VTreeview,
    VForm,
    VCard,
    VContainer,
    VCheckbox,
    VBtn,
    VAlert
  },

  props: {
    id: {
      type: String
    }
  },

  data() {
    return {
      firstName: '',
      lastName: '',
      selectedSectors: [],
      hasAgreedToTerms: false,

      allSectors: [],
      successMessage: null,
      errorMessages: [],
    }
  },

  mounted() {
    axios.get('/sectors')
        .then(response => response.data)
        .then(data => {
          this.allSectors = data;
        })
        .then(() => {
          if(this.id)
            this.fetchUser();
        })
  },

  methods: {
    fetchUser() {
      axios.get(`/users/${this.id}`)
          .then(response => response.data)
          .then(data => {
            this.firstName = data.firstName;
            this.lastName = data.lastName;

            this.selectedSectors = data.sectors.map(sector => {
              console.log(sector);
              return sector.id;
            });

            this.hasAgreedToTerms = data.hasAgreedToTerms;
          })
          .catch(error => {
            console.log('Loading user failed.');
          })
    },

    save() {
      this.errorMessages = [];

      if(this.hasValidId())
        this.update();
      else
        this.create();
    },

    create() {
      axios.post('/users', {
        firstName: this.firstName,
        lastName: this.lastName,
        sectorIds: this.selectedSectors,
        hasAgreedToTerms: this.hasAgreedToTerms
      })
        .then(response => {
          this.successMessage = "User successfully created.";

          let jwt = response.headers.authorization.replace("Bearer ", "");

          window.sessionStorage.setItem("jwt", jwt);

          setTimeout(() => {
            this.successMessage = null;
          }, 5000)

          this.$router.push({name: "user.edit", params: {id: response.data.id}})
        })
        .catch(this.handleError)
    },

    update() {
      let headers = {};

      let jwtToken = window.sessionStorage.getItem('jwt');

      if(jwtToken !== null)
        headers.Authorization = `Bearer ${jwtToken}`

      axios.put(`/users/${this.id}`, {
        firstName: this.firstName,
        lastName: this.lastName,
        sectorIds: this.selectedSectors,
        hasAgreedToTerms: this.hasAgreedToTerms
      }, {
        headers: headers
      }).then(response => response.data)
        .then(data => {
          this.successMessage = "User successfully updated.";

          setTimeout(() => {
            this.successMessage = null;
          }, 5000)
        })
        .catch(this.handleError)
    },

    handleError(error) {
      if(error.response.status === 400) {
        this.errorMessages.push(error.response.data.title);

        let violations = error.response.data.violations;
        violations.forEach(violation => {
          this.errorMessages.push(violation.title);
        })

      } else if(error.response.status === 500 || error.response.status === 403) {
        this.errorMessages.push(error.response.data.detail);
      }
    },

    hasValidId() {
      return this.id !== undefined;
    }
  }
}
</script>

<style scoped>

</style>
