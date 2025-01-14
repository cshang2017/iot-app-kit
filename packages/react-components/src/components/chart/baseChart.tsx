import React from 'react';
import type { MouseEvent } from 'react';
import { useECharts, useResizeableEChart } from '../../hooks/useECharts';
import { ChartOptions } from './types';
import { useVisualizedDataStreams } from './hooks/useVisualizedDataStreams';
import { HotKeys } from 'react-hotkeys';
import { Resizable, ResizeHandle } from 'react-resizable';
import Legend from './legend/table';
import ChartContextMenu from './contextMenu/ChartContextMenu';
import { MultiYAxisLegend } from './multiYAxis/multiYAxis';
import { useDataZoom } from './hooks/useDataZoom';
import { useViewport } from '../../hooks/useViewport';
import { useHandleChartEvents } from './events/useHandleChartEvents';
import { useChartDataset } from './chartOptions/useChartDataset';
import { useChartConfiguration } from './chartOptions/useChartConfiguration';

import './chart.css';
import { useTrendCursors } from '../../echarts/extensions/trendCursors';
import { useChartStoreDataStreamsSync } from './hooks/useChartStoreDataStreamsSync';

/**
 * Developer Notes:
 *
 * The general organization of the Chart follows this flow:
 *
 * 1. setup echarts instance using useECharts
 * 2. get datastreams using useVisualizedDataStreams
 * 3. use datastreams / chart options to compute datastructures
 *    needed to implement various features and adapt them to the echarts api
 * 4. set all  the options in echarts using useEChartOptions
 * 5. do not make use of setOptions in the individual feature, useEChartOptions should be the only place.
 *    Exception: when deleting an item or in general when removing some elements you may need to use setOptions
 *
 */

/**
 * Base chart to display Line, Scatter, and Bar charts.
 */
const BaseChart = ({
  viewport,
  queries,
  onChartOptionsChange,
  size = { width: 500, height: 500 },
  ...options
}: ChartOptions) => {
  // Setup instance of echarts
  const { ref, chartRef } = useECharts(options?.theme);

  const { group } = useViewport();

  const {
    handleAddTrendCursor,
    handleDeleteTrendCursor,
    handleCopyTrendCursor,
    trendCursors,
    trendCursorValues,
  } = useTrendCursors({ group, chartRef, id: options.id });

  // convert TimeSeriesDataQuery to TimeSeriesData
  const { isLoading, dataStreams, thresholds, utilizedViewport, visibleData } =
    useVisualizedDataStreams(queries, viewport);

  //handle dataZoom updates, which are dependent on user events and viewportInMS changes
  useDataZoom(chartRef, utilizedViewport);

  const { dataStreamMetaData } = useChartConfiguration(chartRef, {
    group,
    isLoading,
    dataStreams,
    thresholds,
    visibleData,
    ...options,
  });

  useChartDataset(chartRef, dataStreams);

  useChartStoreDataStreamsSync(dataStreamMetaData);

  const isBottomAligned = options.legend?.position === 'bottom';

  // Setup resize container and calculate size for echarts
  const {
    chartWidth,
    chartHeight,
    rightLegendWidth,
    rightLegendHeight,
    onResize,
    minConstraints,
    maxConstraints,
    leftLegendRef,
  } = useResizeableEChart(
    chartRef,
    size,
    options.legend,
    isBottomAligned,
    onChartOptionsChange
  );

  // handle chart event updates
  const { chartEventsKeyMap, chartEventsHandlers } =
    useHandleChartEvents(chartRef);

  const hotKeyMap = {
    ...chartEventsKeyMap,
  };

  const hotKeyHandlers = {
    ...chartEventsHandlers,
  };

  const handleMouseDown = (e: MouseEvent) => {
    const target = e.target;

    /* Condition to check localName of Canvas to stop onMouseDouwn event
      propagation to fix widget dragging or moving issue while panning on chart */
    if (target instanceof Element && target.localName === 'canvas') {
      e.stopPropagation();
    }
  };
  const setHandles = (position: string): ResizeHandle[] => {
    switch (position) {
      case 'left':
      case 'bottom':
        return ['sw'];
      default:
        return ['se'];
    }
  };

  return (
    <div
      className={`base-chart-container ${options.legend?.position}-position`}
    >
      <Resizable
        height={chartHeight}
        width={chartWidth}
        onResize={onResize}
        axis={`${isBottomAligned ? 'y' : 'x'}`}
        minConstraints={minConstraints}
        maxConstraints={maxConstraints}
        handle={
          <span
            className={
              options.legend?.visible
                ? 'react-resizable-handle react-resizable-handle-se'
                : ''
            }
            data-gesture='resize'
          />
        }
        onResizeStart={(e) => e.stopPropagation()}
        onResizeStop={(e) => e.stopPropagation()}
        resizeHandles={[...setHandles(options.legend?.position || 'right')]}
      >
        <HotKeys
          keyMap={hotKeyMap}
          handlers={hotKeyHandlers}
          className='chart-rightlegend-container'
        >
          <div className='base-chart-left-legend' ref={leftLegendRef}>
            <MultiYAxisLegend datastreams={dataStreams} height={chartHeight} />
          </div>
          {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
          <div
            ref={ref}
            onMouseDown={handleMouseDown}
            className='base-chart-element'
            style={{
              height: chartHeight,
              width: chartWidth,
            }}
          />
          {/*TODO: should not show when in dashboard */}
          <ChartContextMenu
            targetTrigger={ref}
            options={[
              {
                label: 'Add trend cursor',
                action: (offsetX) => handleAddTrendCursor(offsetX),
                disabled: trendCursors.length > 4,
              },
              {
                label: 'Copy trend cursor',
                action: (offsetX) => handleCopyTrendCursor(offsetX),
                disabled: trendCursors.length === 0,
              },
              {
                label: 'Delete trend cursor',
                action: (offsetX) => handleDeleteTrendCursor(offsetX),
                disabled: trendCursors.length === 0,
              },
            ]}
          />
        </HotKeys>
      </Resizable>
      {options.legend?.visible && (
        <div
          style={{
            height: rightLegendHeight,
            width: rightLegendWidth,
          }}
        >
          <Legend
            {...options.legend}
            chartId={options.id}
            datastreams={dataStreamMetaData}
            trendCursors={trendCursors}
            trendCursorValues={trendCursorValues}
            width={rightLegendWidth.toString()}
          />
        </div>
      )}
    </div>
  );
};

export default BaseChart;
