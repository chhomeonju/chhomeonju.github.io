import { mkdir, writeFile } from 'node:fs/promises';
import * as icons from 'simple-icons';
const names = ['Python', 'C', 'Pytorch', 'Tensorflow', 'Scikitlearn', 'Huggingface', 'Nvidia', 'Mysql', 'Weightsandbiases', 'Git', 'Linux', 'Docker', 'Anaconda', 'Latex'];
await mkdir('public/assets/icons', { recursive: true });
for (const name of names) {
  const icon = icons[`si${name}`];
  if (!icon) throw new Error(`Missing icon: ${name}`);
  const color = ({ Anaconda: '398329', Nvidia: '528700', Huggingface: 'B98700', C: '56677F', Linux: '27232A', Weightsandbiases: 'B77900' })[name] ?? icon.hex;
  await writeFile(`public/assets/icons/${name.toLowerCase()}.svg`, `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#${color}"><path d="${icon.path}"/></svg>\n`);
}
