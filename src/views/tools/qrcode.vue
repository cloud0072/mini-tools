<template>
  <a-row :gutter="[20, 20]">
    <a-col :span="24">
      <a-space>
        <a-button size="large" @click="encode2qrcode">转换</a-button>
      </a-space>
    </a-col>
    <a-col :span="12">
      <a-form layout="vertical">
        <a-form-item label="输入">
          <a-textarea v-model:value="text1" v-bind="textareaProps"></a-textarea>
        </a-form-item>
      </a-form>
    </a-col>
    <a-col :span="12">
      <a-form layout="vertical">
        <a-form-item label="输出">
          <img v-if="image1" class="image-upload" :src="image1" alt="">
        </a-form-item>
      </a-form>
    </a-col>
    <a-col :span="12">
      <a-form layout="vertical">
        <a-form-item label="输入">
          <a-upload
            v-model:file-list="fileList"
            name="avatar"
            list-type="picture-card"
            class="avatar-uploader"
            :show-upload-list="false"
            :before-upload="() => false"
            @change="decode2qrcode"
          >
            <img class="image-upload" v-if="image2" :src="image2" alt="avatar"/>
            <div v-else>
              <loading-outlined v-if="loading"></loading-outlined>
              <plus-outlined v-else></plus-outlined>
              <div class="ant-upload-text">Upload</div>
            </div>
          </a-upload>
        </a-form-item>
      </a-form>
    </a-col>
    <a-col :span="12">
      <a-form layout="vertical">
        <a-form-item label="输出">
          <a-textarea v-model:value="text2" v-bind="textareaProps"></a-textarea>
        </a-form-item>
      </a-form>
    </a-col>
  </a-row>
</template>

<script>
import {reactive, ref, toRefs} from "vue";
import QRCode from 'qrcode';
import jsQR from 'jsqr';
import {DeleteOutlined, LoadingOutlined, PlusOutlined} from "@ant-design/icons-vue";

export default {
  name: "ToolQrCode",
  components: {
    DeleteOutlined,
    LoadingOutlined,
    PlusOutlined,
  },
  setup() {
    const state = reactive({
      text1: '',
      image1: '',
      text2: '',
      image2: '',
      autoIndex: 1,
      historyList: [],
      width: 280,
      height: 280,
    })
    const fileList = ref([]);
    const loading = ref(false);

    const textareaProps = {
      rows: 6,
      autoSize: {
        minRows: 6, maxRows: 6
      }
    }

    const encode2qrcode = () => {
      QRCode.toDataURL(state.text1, {
        errorCorrectionLevel: "H",
        width: state.width,
        version: 7
      }).then(base64 => {
        state.image1 = base64
      }).catch((err) => {
        console.error(err);
      });

    };

    const data2url = (base64) => {
      return new Promise((resolve => {
        const image = new Image();
        image.src = base64;
        image.onload = () => {
          const htmlCanvasElement = document.createElement('canvas');
          const context = htmlCanvasElement.getContext('2d');
          context.drawImage(image, 0, 0, image.width, image.height)
          const imageData = context.getImageData(0, 0, image.width, image.height)
          const result = jsQR(imageData.data, imageData.width, imageData.height)
          console.log('jsQR', result)
          resolve(result?.data)
        }
      }));
    }

    const decode2qrcode = ({file}) => {
      console.log('handleUpload file', file)
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file)
      fileReader.onload = () => {
        state.image2 = fileReader.result;
        data2url(state.image2).then(data => {
          console.log('handleUpload data2url', data)
        })
      }
    }

    return {
      ...toRefs(state),
      textareaProps,
      fileList,
      loading,
      encode2qrcode,
      decode2qrcode,
    }
  }
}
</script>

<style lang="less">

.avatar-uploader > .ant-upload {
  width: 142px;
  height: 142px;
}

.image-upload {
  width: 140px;
  height: 140px;
}

.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>
