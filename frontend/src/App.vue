<template>
  <PasswordInput @changePassword="changePassword"/>
  <Encryption />
</template>

<script>
import PasswordInput from './components/PasswordInput.vue'
import Encryption from './components/Encryption.vue'

export default {
  name: 'App',
  components: {
    PasswordInput,
    Encryption
  },
  data: function() {
    return {
      mypassword: null
    }
  },
  watch: {
    mypassword: function(newval){
      console.log(newval);
    }
  },
  methods: {
    changePassword: function(payload){
      if(payload){
        this.mypassword = payload
      }
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
