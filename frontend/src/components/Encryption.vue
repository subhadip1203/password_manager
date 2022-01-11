<template>
  <br>
  <button @click="encrypt"> encrypt </button>
  <br>
  {{encryptedData}}
  <br>
  <br>
  <button @click="decrypt"> decrypt </button>
  <br>
  {{decryptingData}}
</template>

<script>
import CryptoJS from 'crypto-js'

export default {
  name: 'Encryption',
  
  data: function() {
    return {
      myData: 'ok ok',
      encryptedData : '',
      decryptingData: '',
      mySecret : 'secret key 123'
    }
  },
  methods: {
    encrypt : function(){
      this.encryptedData = CryptoJS.AES.encrypt(this.myData, this.mySecret ).toString();
    },
    decrypt : function(){
      var bytes  = CryptoJS.AES.decrypt(this.encryptedData, this.mySecret );
      this.decryptingData = bytes.toString(CryptoJS.enc.Utf8);
    }
  }
  
}
</script>
