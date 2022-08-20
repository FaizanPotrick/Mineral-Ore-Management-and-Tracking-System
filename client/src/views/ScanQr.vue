<template>
  <div class="container p-2">
    <div class="flex flex-col items-center justify-items-center" >
    <p class="error">{{ error }}</p>

    <p class="decode-result">Receipt Id: <b>{{ result }}</b></p>

    <qrcode-stream class="scan-box" @decode="onDecode" @init="onInit" />
  </div></div>
</template>

<script>
import { QrcodeStream } from 'vue3-qrcode-reader';
import axios from 'axios';
export default {

  components: { QrcodeStream },

  data () {
    return {
      result: '',
      error: ''
    }
  },

  methods: {
    onDecode (result) {
      this.result = result;
      verifyHash();
    },

    async onInit (promise) {
      try {
        await promise
      } catch (error) {
        if (error.name === 'NotAllowedError') {
          this.error = "ERROR: you need to grant camera access permission"
        } else if (error.name === 'NotFoundError') {
          this.error = "ERROR: no camera on this device"
        } else if (error.name === 'NotSupportedError') {
          this.error = "ERROR: secure context required (HTTPS, localhost)"
        } else if (error.name === 'NotReadableError') {
          this.error = "ERROR: is the camera already in use?"
        } else if (error.name === 'OverconstrainedError') {
          this.error = "ERROR: installed cameras are not suitable"
        } else if (error.name === 'StreamApiNotSupportedError') {
          this.error = "ERROR: Stream API is not supported in this browser"
        } else if (error.name === 'InsecureContextError') {
          this.error = 'ERROR: Camera access is only permitted in secure context. Use HTTPS or localhost rather than HTTP.';
        } else {
          this.error = `ERROR: Camera error (${error.name})`;
        }
      }
    },
    async verifyHash(){
      const checkpoint_id = this.$cookies.get('checkpoint_id');
      const body = {
        checkpoint_id: checkpoint_id,
        transaction: this.result
      };
      const response = await axios.get(`/api/verify_qr/${body}`);
      if(response.data.success){
        this.$router.push('/transaction_details:id', {id: this.result.transaction_id});
      }
    }
  }
}
</script>

<style scoped>
.scan-box{
width: 500px;
margin: 3em;
}


.error {
  font-weight: bold;
  color: red;
}
</style>