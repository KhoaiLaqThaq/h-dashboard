<template>
  <div class="list-box-wrapper">
    <div>
      <ul class="list-box">
        <li
          v-for="(item, key) in source"
          v-bind:key="key"
          class="list-item"
          v-bind:style="{ backgroundColor: item.selected ? '#eeeeee' : '' }"
          @click="selectSource(key)"
        >
          {{ item.name }}
        </li>
      </ul>
      <div class="bulk-action">
        <div class="btn-action select-all" @click="selectAllSource">
          Chọn tất cả
        </div>
        <div class="btn-action deselect-all" @click="deSelectAllSource">
          Bỏ chọn tất cả
        </div>
      </div>
    </div>
    <div class="actions">
      <div class="btn-action" @click="moveDestination">
        <img src="../assets/images/angle-right-solid.svg" height="18" />
      </div>
      <div class="btn-action" @click="moveAllDestination">
        <img src="../assets/images/angle-double-right-solid.svg" height="18" />
      </div>
      <div class="btn-action" @click="moveSource">
        <img src="../assets/images/angle-left-solid.svg" height="18" />
      </div>
      <div class="btn-action" @click="moveAllSource">
        <img src="../assets/images/angle-double-left-solid.svg" height="18" />
      </div>
    </div>
    <div>
      <ul class="list-box">
        <li
          v-for="(item, key) in destination"
          v-bind:key="key"
          class="list-item"
          v-bind:style="{ backgroundColor: item.selected ? '#f5f5f5' : '' }"
          @click="selectDestination(key)"
        >
          {{ item.name }}
        </li>
      </ul>
      <div class="bulk-action">
        <div class="btn-action select-all" @click="selectAllDestination">
          Chọn tất cả
        </div>
        <div class="btn-action deselect-all" @click="deSelectAllDestination">
          Bỏ chọn tất cả
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    source: Array,
    destination: Array,
  },
  mounted: function () {
    console.log(this);
  },
  methods: {
    moveDestination: function () {
      let selected = this.source.filter((f) => f.selected);
      selected = selected.map((item) => ({
        ...item,
        selected: false,
      }));
      let destination = [...selected, ...this.destination];
      let source = this.source.filter((f) => !f.selected);
      this.$emit("onChangeList", {
        source,
        destination,
      });
    },
    moveSource: function () {
      let selected = this.destination.filter((f) => f.selected);
      selected = selected.map((item) => ({
        ...item,
        selected: false,
      }));
      let source = [...selected, ...this.source];
      let destination = this.destination.filter((f) => !f.selected);
      this.$emit("onChangeList", {
        source,
        destination,
      });
    },
    moveAllDestination: function () {
      let destination = [
        ...this.source.map((item) => ({ ...item, selected: false })),
        ...this.destination,
      ];
      let source = [];
      this.$emit("onChangeList", {
        source,
        destination,
      });
    },
    moveAllSource: function () {
      let source = [
        ...this.destination.map((item) => ({ ...item, selected: false })),
        ...this.source,
      ];
      let destination = [];
      this.$emit("onChangeList", {
        source,
        destination,
      });
    },
    selectDestination: function (key) {
      let source = this.source;
      let destination = this.destination.map((i, k) => {
        if (k === key) {
          i.selected = !i.selected;
        }
        return i;
      });
      this.$emit("onChangeList", {
        source,
        destination,
      });
    },
    selectSource: function (key) {
      let destination = this.destination;
      let source = this.source.map((i, k) => {
        if (k === key) {
          i.selected = !i.selected;
        }
        return i;
      });
      this.$emit("onChangeList", {
        source,
        destination,
      });
    },
    selectAllSource: function () {
      let source = this.source.map((item) => ({ ...item, selected: true }));
      let destination = this.destination;
      this.$emit("onChangeList", {
        source,
        destination,
      });
    },
    deSelectAllSource: function () {
      let source = this.source.map((item) => ({ ...item, selected: false }));
      let destination = this.destination;
      this.$emit("onChangeList", {
        source,
        destination,
      });
    },
    selectAllDestination: function () {
      let destination = this.destination.map((item) => ({
        ...item,
        selected: true,
      }));
      let source = this.source;
      this.$emit("onChangeList", {
        source,
        destination,
      });
    },
    deSelectAllDestination: function () {
      let destination = this.destination.map((item) => ({
        ...item,
        selected: false,
      }));
      let source = this.source;
      this.$emit("onChangeList", {
        source,
        destination,
      });
    },
  },
};
</script>

<style lang="scss">
*,
*::before,
*::after {
  box-sizing: border-box;
}
.bulk-action {
  display: flex;
  .select-all {
    margin-right: 0.5rem;
  }
  .deselect-all {
    margin-left: 0.5rem;
  }
}
.list-box-wrapper {
  margin-top: 10px;
  font-family: sans-serif;
  width: 1000px;
  display: flex;
  align-items: center;
  & > div {
    flex: 1;
  }
  .actions {
    flex-grow: 0;
    padding: 0 1rem;
    .btn-action {
      margin-bottom: 0.5rem;
    }
  }
  .list-box {
    background-color: #fff;
    height: 250px;
    overflow: auto;
    list-style: none;
    padding: 0;
    border: solid 1px #cccccc !important;
    border-radius: 3px !important;
    .list-item {
      padding: 0.5rem 1rem;
      border-bottom: solid 1px #cccccc;
      cursor: pointer;
      &:last-child {
        border: none;
      }
    }
  }
}
.btn-action {
  display: inline-block;
  font-weight: 400;
  color: #212529;
  text-align: center;
  vertical-align: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  background-color: transparent;
  border: 1px solid transparent;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.25rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  display: block;
  width: 100%;
  color: #fff;
  background-color: #007bff;
  border-color: #007bff;
  cursor: pointer;
  img {
    vertical-align: middle;
  }
}
.deselect-all {
  background-color: #6c757d;
  border-color: #6c757d;
}
</style>
