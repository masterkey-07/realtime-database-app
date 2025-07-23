import React from "react";
import type { CSSProperties } from "@mui/material";

import type { EChartOption, EChartsType } from "echarts";
import { init, getInstanceByDom, registerLocale } from "echarts";

type ReactEChartsBaseProps = {
  option: EChartOption;
  style?: CSSProperties;
  loading?: boolean;
  notMerge?: boolean;
  lazyUpdate?: boolean;
  onClick?: () => void;
};

export type ReactEChartsProps = ReactEChartsBaseProps;

export type ReactEChartsRef = {
  echarts?: EChartsType;
};

const echartsPtBrLocale = {
  time: {
    month: [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ],
    monthAbbr: [
      "Jan",
      "Fev",
      "Mar",
      "Abr",
      "Mai",
      "Jun",
      "Jul",
      "Ago",
      "Set",
      "Out",
      "Nov",
      "Dez",
    ],
    dayOfWeek: [
      "Domingo",
      "Segunda-feira",
      "Terça-feira",
      "Quarta-feira",
      "Quinta-feira",
      "Sexta-feira",
      "Sábado",
    ],
    dayOfWeekAbbr: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
  },
  legend: {
    selector: {
      all: "Todas",
      inverse: "Inverter",
    },
  },
  toolbox: {
    brush: {
      title: {
        rect: "Seleção retangular",
        polygon: "Seleção em laço",
        lineX: "Selecionar horizontalmente",
        lineY: "Selecionar verticalmente",
        keep: "Manter seleções",
        clear: "Limpar seleções",
      },
    },
    dataView: {
      title: "Exibição de dados",
      lang: ["Exibição de dados", "Fechar", "Atualizar"],
    },
    dataZoom: {
      title: {
        zoom: "Zoom",
        back: "Restaurar Zoom",
      },
    },
    magicType: {
      title: {
        line: "Trocar para gráfico de linhas",
        bar: "Trocar para gráfico de barras",
        stack: "Empilhar",
        tiled: "Tile",
      },
    },
    restore: {
      title: "Restaurar",
    },
    saveAsImage: {
      title: "Salvar como imagem",
      lang: ["Clique com o botão direito para salvar imagem"],
    },
  },
  series: {
    typeNames: {
      pie: "Gráfico de pizza",
      bar: "Gráfico de barras",
      line: "Gráfico de linhas",
      scatter: "Gráfico de dispersão",
      effectScatter: "Gráfico de dispersão ondulado",
      radar: "Gráfico radar",
      tree: "Gráfico de árvore",
      treemap: "Mapa de árvore",
      boxplot: "Gráfico de caixa",
      candlestick: "Gráfico de vela",
      k: "Gráfico de linha K",
      heatmap: "Mapa de calor",
      map: "Mapa",
      parallel: "Coordenadas paralelas",
      lines: "Gráfico de linhas",
      graph: "Grafo",
      sankey: "Gráfico Sankey",
      funnel: "Gráfico de funil",
      gauge: "Gráfico de medidor",
      pictorialBar: "Barra pictórica",
      themeRiver: "Gráfico de rio de tema",
      sunburst: "Gráfico de explosão solar",
      custom: "Gráfico personalizado",
      chart: "Gráfico",
    },
  },
  aria: {
    general: {
      withTitle: 'Este é um gráfico entitulado "{title}"',
      withoutTitle: "Este é um gráfico",
    },
    series: {
      single: {
        prefix: "",
        withName: " do tipo {seriesType} nomeada/nomeado como {seriesName}.",
        withoutName: " do tipo {seriesType}.",
      },
      multiple: {
        prefix: ". Consiste de {seriesCount} séries.",
        withName:
          " A {seriesId} série é um/uma {seriesType} representando {seriesName}.",
        withoutName: " A {seriesId} series é um/uma {seriesType}.",
        separator: {
          middle: "",
          end: "",
        },
      },
    },
    data: {
      allData: "Os dados são: ",
      partialData: "As primeiros {displayCnt} itens são: ",
      withName: "os dados para {name} são {value}",
      withoutName: "{value}",
      separator: {
        middle: ", ",
        end: ". ",
      },
    },
  },
};

registerLocale("PT", echartsPtBrLocale);

export const useResizeECharts = (ref: RefEChartsDiv) => {
  useEChartsEffect(
    ref,
    (echarts) => {
      const current = ref.current;

      const resizeChart = () => {
        echarts.resize();
      };

      const observer = new ResizeObserver(resizeChart);

      document.addEventListener("resize", resizeChart);
      window.addEventListener("resize", resizeChart);

      if (current) observer.observe(current);

      return () => {
        observer.disconnect();
        document.removeEventListener("resize", resizeChart);
        window.removeEventListener("resize", resizeChart);
      };
    },
    []
  );
};

export const useLoadingECharts = (ref: RefEChartsDiv, loading?: boolean) => {
  useEChartsEffect(
    ref,
    (echart) => {
      if (loading) echart.showLoading();
      else echart.hideLoading();
    },
    [loading]
  );
};

export const useLoadEChartsOption = (
  ref: RefEChartsDiv,
  option: EChartOption,
  notMerge?: boolean,
  lazyUpdate?: boolean
) => {
  useEChartsEffect(
    ref,
    (echarts) => {
      echarts.setOption(option, notMerge, lazyUpdate);
    },
    [option, notMerge, lazyUpdate]
  );
};

const LIGHT_THEME = "light";

export type RefEChartsDiv = React.RefObject<HTMLDivElement | null>;

export const useInitECharts = (ref: RefEChartsDiv) => {
  React.useLayoutEffect(() => {
    const isChartDefined = ref.current !== null;

    const chart = isChartDefined
      ? init(ref.current, LIGHT_THEME, { locale: "PT" })
      : undefined;

    return () => {
      chart?.dispose();
    };
  }, [ref]);
};

export const useEChartsEffect = (
  ref: RefEChartsDiv,
  callback: (echarts: EChartsType) => ReturnType<React.EffectCallback>,
  deps: React.DependencyList = []
) => {
  React.useEffect(() => {
    if (ref.current !== null) {
      const echarts = getInstanceByDom(ref.current);

      if (!echarts) return;

      return callback(echarts);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, ...deps]);
};

export const ReactECharts = React.forwardRef<
  ReactEChartsRef,
  Readonly<ReactEChartsProps>
>((props, ref) => {
  const echarsRef = React.useRef<HTMLDivElement>(null);

  const id = React.useId();

  React.useImperativeHandle(ref, () => {
    if (!echarsRef.current) return {};

    const echarts = getInstanceByDom(echarsRef.current);

    if (!echarts) return {};

    return { echarts };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [echarsRef.current]);

  useInitECharts(echarsRef);

  useResizeECharts(echarsRef);

  useLoadEChartsOption(
    echarsRef,
    props.option,
    props.notMerge,
    props.lazyUpdate
  );

  useLoadingECharts(echarsRef, props.loading);

  return (
    <div
      key={id}
      ref={echarsRef}
      style={{ width: "100%", height: "100%", ...props.style }}
      onClick={props.onClick}
    />
  );
});
