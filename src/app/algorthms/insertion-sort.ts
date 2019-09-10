import { delay } from './helpers';

export async function insertionSort(dataset, legend, speed, render, callback) {
  const delayTime = speed;
  const colors = legend;
  const length = dataset.values.length;
  let i;
  let j;
  let temp;

  await render(dataset);

  for(i = 0; i < length-1; i++) {

    for(j = i + 1 ; j > 0 ; j--) {
      dataset.color[j] = colors.comparing;
      dataset.color[j-1] = colors.comparing;
      await render(dataset);
      await delay(delayTime);
      if(dataset.values[j] < dataset.values[j-1]) {

        dataset.color[j-1] = colors.swaping;
        dataset.color[j] = colors.swaping;
        await render(dataset);
        await delay(delayTime);

        temp = dataset.values[j];
        dataset.values[j] = dataset.values[j-1]
        dataset.values[j-1] = temp;
      }else{
        dataset.color[j] = colors.sorted;
        dataset.color[j-1] = colors.sorted;
        await render(dataset);
        await delay(delayTime);
        break;
      }

      dataset.color[j] = colors.sorted;
      dataset.color[j-1] = colors.sorted;
      await render(dataset);
      await delay(delayTime);
    }


  }
  delay(delayTime);
  render(dataset);

  callback();
}
