import React from "react";
import {
  XYPlot,
  VerticalBarSeries,
  RadialChart,
  DiscreteColorLegend,
  FlexibleWidthXYPlot,
  AreaSeries,
  XAxis,
  YAxis,
  ChartLabel,
} from "react-vis";

const AnalisisEstadistico = ({ patientData }) => {
  // Datos de ejemplo para el gráfico de barras verticales
  const dataVerticalBar = [
    { x: "Presión Arterial", y: 120 },
    { x: "Glucosa", y: 90 },
    { x: "Colesterol", y: 150 },
    { x: "Peso", y: 75 },
    { x: "IMC", y: 24 },
  ];

  // Datos de ejemplo para el gráfico circular (pastel)
  const dataPieChart = [
    { angle: 30, label: "Normal" },
    { angle: 15, label: "Alto" },
    { angle: 20, label: "Bajo" },
    { angle: 35, label: "Obesidad" },
  ];

  // Datos de ejemplo para el gráfico de área
  const dataAreaChart = [
    { x: 1, y: 10 },
    { x: 2, y: 12 },
    { x: 3, y: 8 },
    { x: 4, y: 15 },
    { x: 5, y: 10 },
    { x: 6, y: 5 },
    { x: 7, y: 10 },
  ];

  return (
    <div id="AnalisisEstadistico" style={{ padding: "20px", textAlign: "center" }}>
      <h1 style={{ fontSize: "36px", marginBottom: "30px" }}>Análisis de Salud</h1>
      <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
        <div style={{ width: "30%" }}>
          <h2 style={{ fontSize: "24px", marginBottom: "20px" }}>Datos Biométricos</h2>
          <XYPlot xType="ordinal" width={300} height={300} xDistance={100}>
            <VerticalBarSeries data={dataVerticalBar} />
            <XAxis />
            <YAxis />
          </XYPlot>
        </div>
        <div style={{ width: "30%" }}>
          <h2 style={{ fontSize: "24px", marginBottom: "20px" }}>Estado de Salud</h2>
          <RadialChart
            data={dataPieChart}
            width={300}
            height={300}
            showLabels
            labelsAboveChildren
            colorType="category"
            colorDomain={[0, dataPieChart.length - 1]}
          />
          <DiscreteColorLegend items={dataPieChart.map((d) => d.label)} orientation="horizontal" />
        </div>
        <div style={{ width: "30%" }}>
          <h2 style={{ fontSize: "24px", marginBottom: "20px" }}>Tendencia de Salud</h2>
          <FlexibleWidthXYPlot height={300}>
            <AreaSeries data={dataAreaChart} />
            <XAxis />
            <YAxis />
          </FlexibleWidthXYPlot>
        </div>
      </div>
    </div>
  );
};

export default AnalisisEstadistico;
