import { delay } from './helpers';

export async function bubbleSort(dataset, legend, speed, render, callback) {
  const delayTime = speed;
  const colors = legend;
  const length = dataset.values.length;
  let i;
  let j;
  let stop;

  await render(dataset);

  for (i = 0; i < length; i++) {
    for (j = 0, stop = length - i; j < stop; j++) {
      dataset.color[j] = colors.comparing;
      dataset.color[j + 1] = colors.comparing;
      await render(dataset);
      await delay(delayTime);
      if (dataset.values[j] > dataset.values[j + 1]) {
          dataset.color[j] = colors.swaping;
          dataset.color[j + 1] = colors.swaping;
          await render(dataset);
          await delay(delayTime);
          swap(dataset.values, j, j + 1);
      }
      dataset.color[j] = colors.default;
      dataset.color[j+1] = colors.default;
      await render(dataset);
      await delay(delayTime);
    }

    for (j = 0; j < length - 1 - i; j++) {
      dataset.color[length - 1 - i + j] = colors.sorted;
    }

  }
  for (i = 0; i < length; i++) {
    dataset.color[i] = colors.sorted;
  }

  delay(delayTime);
  render(dataset);

  callback();
}


function swap(array, firstIndex, secondIndex) {
  const temp = array[firstIndex];
  array[firstIndex] = array[secondIndex];
  array[secondIndex] = temp;
}
