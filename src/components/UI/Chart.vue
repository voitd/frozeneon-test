<script setup lang="ts">
type CurrentInfo = { label: string; value: number };

import { usePackageInfoStore } from "../../stores/packageInfo";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import dayjs from "dayjs";
import { computed } from "vue";

const store = usePackageInfoStore();
const packageInfo = storeToRefs(store).packageInfo;

const {
  data,
  color = "green",
  label = "",
  value = 0,
  period = "weekly",
  id = "",
} = defineProps<{
  data: Array<number | unknown>;
  color: string;
  label?: string;
  value?: number;
  period?: string;
  id?: string;
}>();

const dataSet = computed(() => ({
  data,
  showPoints: true,
  fill: true,
  className: `curve-${color}`,
}));

const currentInfo = ref<CurrentInfo>({ value, label });

const prettifyTotal = (num: number) =>
  num?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");

const getDayByIndex = (idx: number) => {
  if (!packageInfo.value) return;

  const datesById = (packageInfo.value as Record<string, any>)[id].dates;
  const dates = Object.keys(datesById);
  return dates[idx];
};
const onMouseMove = (params: any) => {
  if (!params || !params.index || !Array.isArray(params.data)) {
    currentInfo.value = { label, value };
    return;
  }
  const date = getDayByIndex(params.index);
  currentInfo.value = {
    label: dayjs(date).format("DD MMM YYYY"),
    value: params.data[0],
  };
};

const periodVal = computed(() =>
  label === currentInfo.value.label
    ? `${period} ${label}`
    : currentInfo.value.label,
);
</script>
<template>
  <div class="wrapper">
    <section class="stats" :class="color">
      <header class="stats-header">
        <strong class="stats-name">{{ label }}</strong>
      </header>
      <div class="stats-data">
        <div class="stats-data__info">
          <div class="stats-period">
            <svg viewBox="0 0 7.22 11.76" class="stats-period__icon">
              <path
                d="M4.59 4.94V0H2.62v4.94H0l3.28 4.59 3.94-4.59H4.59zM.11 10.76h7v1h-7z"
              />
            </svg>
            <span class="stats-period__text">{{ periodVal }}</span>
          </div>

          <strong class="stats-value">
            <slot name="value">
              {{ prettifyTotal(currentInfo.value) }}
            </slot>
          </strong>
        </div>
        <trend-chart
          :datasets="[dataSet]"
          :min="0"
          padding="5 5 0"
          :interactive="true"
          @mouse-move="onMouseMove"
        ></trend-chart>
      </div>
    </section>
  </div>
</template>

<style lang="scss">
.wrapper {
  display: flex;
  flex-wrap: wrap;
  .vtc {
    width: 10rem;
    height: 3.75rem;
    margin-right: -0.3rem;
  }
  .stroke {
    stroke-width: 2;
  }
  .fill {
    opacity: 0.2;
  }
  .active-line {
    stroke: rgba(0, 0, 0, 0.2);
  }
  .point {
    display: none;
  }
  .point.is-active {
    display: block;
  }
}
.stats {
  width: 100%;

  &:nth-child(2n) {
    margin-left: 3.125rem;
  }
  &:nth-child(n + 3) {
    margin-top: 3.125rem;
  }
  &-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  &-name {
    width: 10rem;
    text-transform: capitalize;
  }
  &-period {
    display: flex;
    align-items: center;
    flex-shrink: 0;
    opacity: 0.5;
    &__icon {
      display: block;
      height: 0.7rem;
      width: auto;
      margin-right: 0.3rem;
      fill: white;
    }
    &__text {
      font-size: 0.7rem;
      line-height: 1rem;
      white-space: nowrap;
    }
  }
  &-data {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }
  &-value {
    font-size: 1.3rem;
  }
  &.green {
    border-bottom: 2px solid rgba(#39af77, 0.2);
  }
  &.blue {
    border-bottom: 2px solid rgba(#61dafb, 0.2);
  }
  &.red {
    border-bottom: 2px solid rgba(#d8002b, 0.2);
  }
  &.orange {
    border-bottom: 2px solid rgba(#febc6b, 0.2);
  }
  &.info {
    border-bottom: 2px solid rgba(#259dff, 0.2);
  }
}
.curve-green {
  .stroke {
    stroke: #39af77;
  }
  .fill {
    fill: #39af77;
  }
  .point {
    fill: #39af77;
    stroke: #39af77;
  }
}
.curve-blue {
  .stroke {
    stroke: #61dafb;
  }
  .fill {
    fill: #61dafb;
  }
  .point {
    fill: #61dafb;
    stroke: #61dafb;
  }
}
.curve-red {
  .stroke {
    stroke: #d8002b;
  }
  .fill {
    fill: #d8002b;
  }
  .point {
    fill: #d8002b;
    stroke: #d8002b;
  }
}
.curve-orange {
  .stroke {
    stroke: #febc6b;
  }
  .fill {
    fill: #febc6b;
  }
  .point {
    fill: #febc6b;
    stroke: #febc6b;
  }
}
.curve-info {
  .stroke {
    stroke: #259dff;
  }
  .fill {
    fill: #259dff;
  }
  .point {
    fill: #259dff;
    stroke: #259dff;
  }
}
</style>
