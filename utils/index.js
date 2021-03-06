export const removeItemById = (array, id) =>
  array.filter(function (ele) {
    return ele.id != id;
  });

export const getItemByKey = (array, id, key) => array.find(x => x[key] === id);

export const sortByName = array => {
  let tempArray = array.slice();
  return tempArray.sort((a, b) => a.name.localeCompare(b.name));
};

export const truncate = (str, max) => (str.length > max ? str.substr(0, max - 1) + '...' : str);

export const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

export const getMonthNameFromTS = ts => months[new Date(ts).getMonth()];
export const getDayNumFromTS = ts => new Date(ts).getDate();
export const getYearFromTS = ts => new Date(ts).getFullYear();

export const percentageToAlpha = {
  '100%': { alpha: 'FF' },
  '99%': { alpha: 'FC' },
  '98%': { alpha: 'FA' },
  '97%': { alpha: 'F7' },
  '96%': { alpha: 'F5' },
  '95%': { alpha: 'F2' },
  '94%': { alpha: 'F0' },
  '93%': { alpha: 'ED' },
  '92%': { alpha: 'EB' },
  '91%': { alpha: 'E8' },
  '90%': { alpha: 'E6' },
  '89%': { alpha: 'E3' },
  '88%': { alpha: 'E0' },
  '87%': { alpha: 'DE' },
  '86%': { alpha: 'DB' },
  '85%': { alpha: 'D9' },
  '84%': { alpha: 'D6' },
  '83%': { alpha: 'D4' },
  '82%': { alpha: 'D1' },
  '81%': { alpha: 'CF' },
  '80%': { alpha: 'CC' },
  '79%': { alpha: 'C9' },
  '78%': { alpha: 'C7' },
  '77%': { alpha: 'C4' },
  '76%': { alpha: 'C2' },
  '75%': { alpha: 'BF' },
  '74%': { alpha: 'BD' },
  '73%': { alpha: 'BA' },
  '72%': { alpha: 'B8' },
  '71%': { alpha: 'B5' },
  '70%': { alpha: 'B3' },
  '69%': { alpha: 'B0' },
  '68%': { alpha: 'AD' },
  '67%': { alpha: 'AB' },
  '66%': { alpha: 'A8' },
  '65%': { alpha: 'A6' },
  '64%': { alpha: 'A3' },
  '63%': { alpha: 'A1' },
  '62%': { alpha: '9E' },
  '61%': { alpha: '9C' },
  '60%': { alpha: '99' },
  '59%': { alpha: '96' },
  '58%': { alpha: '94' },
  '57%': { alpha: '91' },
  '56%': { alpha: '8F' },
  '55%': { alpha: '8C' },
  '54%': { alpha: '8A' },
  '53%': { alpha: '87' },
  '52%': { alpha: '85' },
  '51%': { alpha: '82' },
  '50%': { alpha: '80' },
  '49%': { alpha: '7D' },
  '48%': { alpha: '7A' },
  '47%': { alpha: '78' },
  '46%': { alpha: '75' },
  '45%': { alpha: '73' },
  '44%': { alpha: '70' },
  '43%': { alpha: '6E' },
  '42%': { alpha: '6B' },
  '41%': { alpha: '69' },
  '40%': { alpha: '66' },
  '39%': { alpha: '63' },
  '38%': { alpha: '61' },
  '37%': { alpha: '5E' },
  '36%': { alpha: '5C' },
  '35%': { alpha: '59' },
  '34%': { alpha: '57' },
  '33%': { alpha: '54' },
  '32%': { alpha: '52' },
  '31%': { alpha: '4F' },
  '30%': { alpha: '4D' },
  '29%': { alpha: '4A' },
  '28%': { alpha: '47' },
  '27%': { alpha: '45' },
  '26%': { alpha: '42' },
  '25%': { alpha: '40' },
  '24%': { alpha: '3D' },
  '23%': { alpha: '3B' },
  '22%': { alpha: '38' },
  '21%': { alpha: '36' },
  '20%': { alpha: '33' },
  '19%': { alpha: '30' },
  '18%': { alpha: '2E' },
  '17%': { alpha: '2B' },
  '16%': { alpha: '29' },
  '15%': { alpha: '26' },
  '14%': { alpha: '24' },
  '13%': { alpha: '21' },
  '12%': { alpha: '1F' },
  '11%': { alpha: '1C' },
  '10%': { alpha: '1A' },
  '9%': { alpha: '17' },
  '8%': { alpha: '14' },
  '7%': { alpha: '12' },
  '6%': { alpha: '0F' },
  '5%': { alpha: '0D' },
  '4%': { alpha: '0A' },
  '3%': { alpha: '08' },
  '2%': { alpha: '05' },
  '1%': { alpha: '03' },
  '0%': { alpha: '00' }
};

export const uploadPhoto = async (file) => {
  const filename = file.name;
  const res = await fetch(`/api/upload-url?file=${filename}`);
  const { url, fields, objectName } = await res.json();
  const formData = new FormData();

  Object.entries({ ...fields, file }).forEach(([key, value]) => {
    formData.append(key, value);
  });

  const upload = await fetch(url, {
    method: 'POST',
    body: formData,
  });

  if (upload.ok) {
    return `${upload.url}/${objectName}`
  } else {
    return false;
  }
};