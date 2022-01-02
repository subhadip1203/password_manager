<template>
  <input type="text" v-model="mypass"/>
  <button @click="savePasswordHandler"> submit password</button>
</template>

<script>
export default {
  name: 'PasswordInput',
  props: {
    msg: String
  },
  data: function() {
    return {
      mypass: ''
    }
  },
  methods: {
    savePasswordHandler : function(){
      this.$$emit("changepassword" , this.mypass)
    }
  }
}
</script>
