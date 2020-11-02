function convertFarToCel(temp) {
  let convertedTemp = parseInt((temp - 32) / 1.8);
    if (convertedTemp === -0) convertedTemp = 0; 
  return convertedTemp
}

export {convertFarToCel}