<template>
  <input type="text" v-model="mypass"/>
  <button @click="savePasswordHandler"> submit password</button>
</template>

<script>
export default {
  name: 'PasswordInput',
  emits: ["changePassword"],
  data: function() {
    return {
      mypass: ''
    }
  },
  methods: {
    savePasswordHandler : function(){
      this.$emit("changePassword" , this.mypass)
    }
  }
}
</script>
