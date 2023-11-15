import LineCharts from "../../common/LineChart/LineCharts";
import RealTimeChart from "../../common/RealTimeLineChart/RealTimeChart";
import Flex from "../../packages/Flex/Flex";
import { Chart } from "chart.js";
import StreamingPlugin from "chartjs-plugin-streaming";
import "chartjs-adapter-luxon";
import InputRadio from "../../packages/InputRadio/InputRadio";
import { useState } from "react";
import Text from "../../packages/Text/Text";

Chart.register(StreamingPlugin);

type Props = {
  getRunzId: any;
};

const ChartTab = ({ getRunzId }: Props) => {
  const [isRadio, setRadio] = useState<"table" | "realtime" | "archive">(
    "table"
  );

  return (
    <Flex>
      <Flex row center marginBottom={20}>
        <InputRadio
          checked={isRadio === "table"}
          onClick={() => setRadio("table")}
          label="Table Chart"
        />
        <Flex marginLeft={20} marginRight={20}>
          <InputRadio
            checked={isRadio === "realtime"}
            onClick={() => setRadio("realtime")}
            label="Realtime Chart"
          />
        </Flex>
        <InputRadio
          checked={isRadio === "archive"}
          onClick={() => setRadio("archive")}
          label="Archive Chart"
        />
      </Flex>
      {isRadio === "realtime" && <RealTimeChart getRunzId={getRunzId} />}
      {isRadio === "table" && <LineCharts getRunzId={getRunzId} />}
      {isRadio === "archive" && <Text>In Progress</Text>}
    </Flex>
  );
};

export default ChartTab;
