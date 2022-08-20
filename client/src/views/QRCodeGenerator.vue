<template>
  <div>
    <form>
      <input
        class="form-control border m-4"
        height="200"
        type="text"
        v-model="value"
        placeholder="Enter your text"
      />
    </form>
    <qrcode-vue
      v-if="value !== ''"
      :value="value"
      :size="size"
      level="H"
      class="m-4"
      id="qr-gen"
    />

    <button type="button" @click="downloadQRCode" class="bg-orange-500 p-4 m-4">
      Download QR Code
    </button>
  </div>
</template>
<script>
import QrcodeVue from "qrcode.vue";

export default {
  data() {
    return {
      value: "",
      size: 300,
    };
  },
  components: {
    QrcodeVue,
  },
  methods: {
    downloadQRCode() {
      const canvas = document.getElementById("qr-gen");
      const pngUrl = canvas
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");
      let downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = "qrcode.png";
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    },
  },
};
</script>
