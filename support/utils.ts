import * as fs from 'fs-extra';


export const saveScreenshot = async (data: any, name: string) => {
  if (name === '' || name === null) {
    throw new Error('Unable to save the screenshot, the test name not defined');
  }
  const path = 'mochawesome-report/assets/';
  const filename = `${path}${name}`;
  await fs.writeFile(filename, data, { encoding: 'base64', flag: 'wx' });
};