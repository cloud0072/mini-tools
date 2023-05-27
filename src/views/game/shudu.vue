<template>
  <div class="game-container">
    <div class="game-panel">
      <div class="game-title">数独</div>
      <div class="panel-border">
        <div class="panel-wrapper">
          <div ref="cellRefs" class="panel-cell" :class="getCellBorderClassName(i)" v-for="(cell, i) in cellList" @mousedown="onSelect(i)" :key="i">
            {{ cell ? cell : ' ' }}
          </div>
        </div>
      </div>
    </div>
    <div class="game-actions">
      <div class="btn-wrapper">
        <div style="width: 100%;margin-bottom: 24px">
          <div class="btn-cell action-cell" @click="init">重置棋盘</div>
        </div>
        <div class="btn-cell" :class="cell.disabled ? 'btn-disabled' : ''" v-for="(cell, i) in numberList" @click="onFilled(cell)" :key="i">
          {{ cell.value }}
        </div>
        <div class="btn-cell action-cell" @click="onFilled(0)">清空</div>
      </div>
    </div>
    <div class="game-doc">
      <div>教学视频:</div>
      <a href="https://www.bilibili.com/video/BV1Mx411z7uq" target="_blank">https://www.bilibili.com/video/BV1Mx411z7uq</a>
    </div>
  </div>
</template>

<script>
import {computed, reactive, ref, toRefs, watch} from "vue";
import {DeleteOutlined, PlusOutlined, RightCircleOutlined} from '@ant-design/icons-vue';

export default {
  name: "ShuDu",
  components: {
  },
  setup() {
    const initList = [
      0, 1, 0,  0, 0, 0,  0, 0, 0,
      0, 0, 0,  0, 0, 0,  0, 5, 0,
      3, 0, 2,  0, 0, 1,  0, 0, 0,

      0, 0, 0,  0, 0, 0,  0, 6, 0,
      0, 0, 0,  0, 4, 0,  0, 9, 0,
      0, 0, 3,  0, 0, 0,  0, 0, 0,

      0, 0, 0,  7, 2, 0,  0, 0, 0,
      0, 0, 4,  0, 0, 0,  6, 0, 0,
      0, 8, 0,  0, 0, 5,  0, 0, 0,
    ]
    const state = reactive({
      cellList: [],
      selected: null
    });
    const numberList = computed(() => {
      return new Array(9).fill(0).map((n, i) => ({
        value: i + 1,
        disabled: state.cellList.filter(cell => cell === i+1).length >= 9,
      }));
    })
    const onSelect = (index) => {
      state.selected = index;
    };
    const onFilled = (cell) => {
      const notInit = initList[state.selected] === 0;
      const numAct = !cell.disabled;
      if (numAct && notInit) {
        state.cellList.splice(state.selected, 1, cell.value)
      }
    };

    // const validCell = () => {
    //
    // }

    const getCellBorderClassName = (index) => {
      const style = {
        'cell-border-top': Math.floor(index / 9) === 0,
        'cell-border-right': index % 9 === 2 || index % 9 === 5 || index % 9 === 8,
        'cell-border-bottom': Math.floor(index / 9) === 2 || Math.floor(index / 9) === 5 || Math.floor(index / 9) === 8,
        'cell-border-left': index % 9 === 0,
        'cell-wrapper-selected' : state.selected === index,
        'cell-none-editable': initList[index] !== 0,
      }
      return Object.keys(style).filter(key => style[key])
    }

    const init = () => {
      state.cellList = [...initList]
    }

    //
    init()

    return {
      ...toRefs(state),
      numberList,
      // cellRefs,
      getCellBorderClassName,
      onSelect,
      onFilled,
      init,
    }
  }
}
</script>

<style lang="less" scoped>
@num-color: #0014e0;
@btn-color: #1890ff;
@danger-color: #ed3434;
@border-color: #999;
@border-bold-color: #333;

@font-size: 32px;
@cell-size: 60px;

.game-container {
  display: flex;
  padding: 12px;
}

.game-panel {
  //width: 50%;
  width: 600px;
}

.game-title {
  width: 100%;
  line-height: 48px;
  margin-bottom: 24px;
  font-size: 24px;
  font-weight: 600;
  text-align: center;
}
.panel-border {
  width: @cell-size * 9 + 4px + 2px;
  height: @cell-size * 9 + 4px + 2px;
  border: 2px solid #333;
  padding: 1px;
  box-sizing: content-box;
}
.panel-wrapper {
  display: flex;
  flex-wrap: wrap;
  width: @cell-size * 9 + 4px;
  height: @cell-size * 9 + 4px;
  border: 1px solid @border-bold-color;
  box-sizing: content-box;
}

.panel-cell {
  width: @cell-size - 2px;
  height: @cell-size - 2px;
  line-height: @cell-size - 2px;
  text-align: center;
  font-size: @font-size;
  font-weight: 600;
  color: @num-color;
  border: 1px solid @border-color;
  box-sizing: content-box;
  background: white;
}

.cell-none-editable {
  color: @border-bold-color;
}

.cell-border-top {
  border-top: 2px solid @border-bold-color;
}

.cell-border-right {
  border-right: 2px solid @border-bold-color;
}

.cell-border-bottom {
  border-bottom: 2px solid @border-bold-color;
}

.cell-border-left {
  border-left: 2px solid @border-bold-color;
}

.cell-wrapper-selected {
  background: lightcyan;
}

.game-actions {
  //width: 50%;
  width: 600px;
}

.btn-wrapper {
  display: flex;
  flex-wrap: wrap;
  width: 500px;
}
.btn-cell {
  width: 80px;
  height: 40px;
  line-height: 32px;
  padding: 4px;
  margin: 0 8px 8px 0;
  border-radius: 4px;
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  color: white;
  background: @btn-color;
}

.btn-disabled {
  background: gray;
}
.action-cell {
  background: @danger-color;
}
</style>
