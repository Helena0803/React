import * as echarts from "echarts";
import { useEffect } from "react";

export const Chart = () => {
  useEffect(() => {
    const option = {
      //   title: {
      //     text: "ECharts Getting Started Example",
      //   },
      tooltip: {},
      xAxis: {
        data: ["shirt", "cardigan", "chiffon", "pants", "heels", "socks"],
      },
      yAxis: {},
      series: [
        {
          name: "sales",
          type: "bar",
          data: [5, 20, 36, 10, 10, 20],
        },
      ],
    };
    const chartDom = document.getElementById("chartsId");
    const myChart = echarts.init(chartDom);

    option && myChart.setOption(option);
  }, []);

  return (
    <div>
      <div style={{ width: "700px", height: "500px" }} id="chartsId"></div>
    </div>
  );
};
