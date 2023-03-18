getData();
chartIt();

async function getData() {
  const xs = [];
  const ys = [];

  const response = fetch("ZonAnn.Ts+dSST.csv");
  const data = await (await response).text();

  const table = data.split("\n").slice(1);
  table.forEach((row) => {
    const columns = row.split(",");
    const year = columns[0];
    xs.push(year);
    const temp = columns[1];
    ys.push(parseFloat(temp) + 14);
    console.log(year, temp);
  });
  return { xs, ys };
}

async function chartIt() {
  const data = await getData();
  const ctx = document.getElementById("chart").getContext("2d");

  const myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: data.xs,
      datasets: [
        {
          label:
            "Combined Land-Surface Air and Sea-Surface Water Temperature in C°",
          data: data.ys,
          fill: true,
          backgroundColor: "rgba(0, 157, 255, 0.2)",
          borderColor: "rgba(0, 157, 255, 1)",
          borderWidth: 2,
        },
      ],
    },
    options: {
      scales: {
        y: {
          ticks: {
            callback: function (value, index, ticks) {
              return value + "°";
            },
          },
        },
      },
    },
  });
}
