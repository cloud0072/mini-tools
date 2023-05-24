<template>
  <a-row :gutter="20" style="height: 100%">
    <a-col :span="14">
      <div class="form-action">
        <a-space>
          <a-button size="large" @click="encodeBase64">Base64编码</a-button>
          <a-button size="large" @click="decodeBase64">Base64解码</a-button>
          <a-button size="large" @click="encodeURL">URL编码</a-button>
          <a-button size="large" @click="decodeURL">URL解码</a-button>
        </a-space>
      </div>
      <a-form layout="vertical">
        <a-form-item label="输入">
          <a-textarea v-model:value="text1" v-bind="textareaProps"></a-textarea>
        </a-form-item>
        <a-form-item label="输出">
          <a-textarea v-model:value="text2" v-bind="textareaProps"></a-textarea>
        </a-form-item>
      </a-form>
    </a-col>

    <a-col :span="10">
      <div class="history-list">
        <div class="history-wrapper">
          <div class="history-title">
            历史记录
            <a-button type="link" @click="handleDelAll()">清空全部</a-button>
          </div>
          <div class="history-item" v-for="(item, i) in historyList" :key="item.key">
              <div class="history-option">
                {{ item.key }}
                <a-button type="link" @click="handleDel(i)">
                  <DeleteOutlined />
                </a-button>
              </div>
              <a-textarea :value="item.value" :rows="3"></a-textarea>
          </div>
        </div>
      </div>
    </a-col>
  </a-row>
</template>

<script>
import {reactive, toRefs} from "vue";
import {Base64} from "js-base64";
import {DeleteOutlined} from "@ant-design/icons-vue";

export default {
  name: "ToolBase64",
  components: {
    DeleteOutlined
  },
  setup() {
    const state = reactive({
      text1: '',
      text2: '',
      autoIndex: 1,
      historyList: []
    })

    const textareaProps = {
      rows: 8,
      autoSize: {
        minRows: 8, maxRows: 8
      }
    }

    const encodeBase64 = () => {
      const value = Base64.encode(state.text1);
      state.text2 = value;
      state.historyList.unshift({key: '历史' + state.autoIndex++, value});
      console.log('encodeBase64', state.text1);
    }

    const decodeBase64 = () => {
      const value = Base64.decode(state.text1);
      state.text2 = value;
      state.historyList.unshift({key: '历史' + state.autoIndex++, value});
      console.log('decodeBase64', state.text1);
    }

    const encodeURL = () => {
      const value = encodeURIComponent(state.text1);
      state.text2 = value;
      state.historyList.unshift({key: '历史' + state.autoIndex++, value});
      console.log('encodeBase64', state.text1);
    }

    const decodeURL = () => {
      const value = decodeURIComponent(state.text1);
      state.text2 = value;
      state.historyList.unshift({key: '历史' + state.autoIndex++, value});
      console.log('decodeBase64', state.text1);
    }

    const handleDel = (index) => {
      state.historyList.splice(index, 1)
    }
    const handleDelAll = () => {
      state.historyList = []
    }

    return {
      ...toRefs(state),
      textareaProps,
      encodeBase64,
      decodeBase64,
      encodeURL,
      decodeURL,
      handleDel,
      handleDelAll
    }
  }
}
</script>

<style lang="less">
.history-list {
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.history-title {
  display: flex;
  justify-content: space-between;
  padding: 8px 16px;
  flex-shrink: 0;
}
.history-item {
  position: relative;
  padding: 8px 16px;
}
.history-option {
  display: flex;
  justify-content: space-between;
  padding: 8px 0 ;
}
</style>
