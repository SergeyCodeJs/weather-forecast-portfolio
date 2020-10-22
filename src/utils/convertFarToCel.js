export default (temp) => {
  let tempInCel = parseInt((temp - 32) / 1.8);
  if (tempInCel === -0) tempInCel = 0; 
  return tempInCel
}