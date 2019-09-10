import { delay } from './helpers';

export async function selectionSort(dataset, legend, speed, render, callback) {
  const delayTime = speed;
  const colors = legend;
  const length = dataset.values.length;
  let i;
  let j;
  let minimum;
  let minimum_index;
  let tmp;

  await render(dataset);

  for (i = 0; i < length; i++) {
    minimum_index = i;
    dataset.color[minimum_index] = colors.currenIndex;
    await delay(delayTime);
    await render(dataset);
    for(j = i+1; j < length; j++) {
      dataset.color[j] = colors.comparing;
      await delay(delayTime);
      await render(dataset);
      if(dataset.values[j] < dataset.values[minimum_index]) {
        dataset.color[j] = colors.minimum;
        if(minimum_index != i){
          dataset.color[minimum_index] = colors.default;
        }
        delay(delayTime);
        render(dataset);
        minimum_index = j;
      } else {
        dataset.color[j] = colors.default;
        await delay(delayTime);
        await render(dataset);
      }
    }
    dataset.color[minimum_index] = colors.swaping;
    dataset.color[i] = colors.swaping;
    await delay(delayTime);
    await render(dataset);
    tmp = dataset.values[i];
    dataset.values[i] = dataset.values[minimum_index];
    dataset.values[minimum_index] = tmp;

    dataset.color[minimum_index] = colors.default;
    dataset.color[i] = colors.sorted;


  }

  delay(delayTime);
  render(dataset);

  callback();
}
