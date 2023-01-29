function createDonut(divElement, diameterInPixel, datas) {
  const strokeSize = diameterInPixel * 0.15;
  const donutSize = diameterInPixel * 0.7;
  const rayon = (donutSize / 2) - (strokeSize / 2);
  const perimeter = 2 * 3.14159265359 * rayon;

  let totalValue = 0;
  datas.forEach(data => {
    totalValue += data.qty;
  });

  const dasharray = [];
  let rotationAngle = -90;
  let prevQty = 0;
  datas.forEach(data => {
    const dash = (data.qty / totalValue) * perimeter;
    const gap = (1 - (data.qty / totalValue)) * perimeter;
    if (dasharray.length > 0 && prevQty !== 0) {
      rotationAngle = rotationAngle + (prevQty / totalValue * 360);
    }
    dasharray.push({'dash': dash, 'gap': gap, 'deg': rotationAngle, 'color': data.color});
    prevQty = data.qty;
  });

  const pieArray = [];
  dasharray.forEach((dashData) => {
    const donutPie = createDonutPie(donutSize, rayon, strokeSize, dashData.color, dashData.dash, dashData.gap, dashData.deg);
    pieArray.push(donutPie);
  });

  const donutChart = createDonutChartWithPie(pieArray, donutSize);

  divElement.classList.add('donut-container');
  divElement.style.width = `${diameterInPixel}px`;
  divElement.style.height = `${diameterInPixel}px`;
  divElement.appendChild(donutChart);
}

function createDonutPie(diameter, rayon, strokeSize, strokeColor, dashValue, gapValue, rotationAngle) {
  const pie = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  pie.classList.add('donut-pie');
  pie.setAttribute('cx', diameter / 2);
  pie.setAttribute('cy', diameter / 2);
  pie.setAttribute('r', rayon);
  pie.setAttribute('stroke-width', `${strokeSize}px`);
  pie.setAttribute('stroke', strokeColor);
  pie.setAttribute('stroke-dasharray', `${dashValue} ${gapValue}`);
  pie.style.setProperty('transform', `rotateZ(${rotationAngle}deg)`);

  return pie;
}

function createDonutChartWithPie(pieArray, donutSize) {
  const donutChartElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  pieArray.forEach((pie) => {
    donutChartElement.appendChild(pie);
  });
  donutChartElement.style.setProperty('width', `${donutSize}px`);
  donutChartElement.style.setProperty('height', `${donutSize}px`);


  return donutChartElement;
}