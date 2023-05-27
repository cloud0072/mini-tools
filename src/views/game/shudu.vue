<template>
  <div class="game-container">
    <div class="game-panel">
      <div class="game-title">数独</div>
      <div class="panel-wrapper">
        <div ref="cellRefs" class="panel-cell" :class="getCellBorderClassName(i)" v-for="(cell, i) in cellList" @mousedown="onSelect(i)" :key="i">
          {{ cell ? cell : ' ' }}
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
        'cell-border-right': index % 9 === 2 || index % 9 === 5,
        'cell-border-bottom': Math.floor(index / 9) === 2 || Math.floor(index / 9) === 5,
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

.panel-wrapper {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  width: 542px;
  height: 542px;
  border: 1px solid #333;
  box-sizing: content-box;
}

.panel-cell {
  position: relative;
  width: 58px;
  height: 58px;
  line-height: 58px;
  text-align: center;
  font-size: 24px;
  border: 1px solid #666;
  box-sizing: content-box;
  background: #f4db5c;
  z-index: 0;
}
.cell-none-editable {
  font-size: 26px;
  font-weight: 600;
}
.cell-border-right {
  border-right: 2px solid #333;
  margin-right: 0 !important;
}

.cell-border-bottom {
  border-bottom: 2px solid #333;
  margin-bottom: 0 !important;
}

.cell-wrapper-selected {
  border: 2px solid orange;
  z-index: 1;
  margin: -1px;
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
  padding: 4px 12px;
  margin: 0 8px 8px 0;
  border-radius: 4px;
  text-align: center;
  color: white;
  background: orange;
}

.btn-disabled {
  background: gray;
}
.action-cell {
  background: orangered;
}
</style>
