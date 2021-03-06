import {DEFAULT_TABLE_OPTIONS} from 'src/dashboards/constants'
import {stringifyColorValues} from 'src/shared/constants/colorOperations'
import {ViewType, Axis, Axes} from 'src/types/dashboards'
import {Color} from 'src/types/colors'

export const initializeOptions = (type: ViewType) => {
  switch (type) {
    case 'table':
      return DEFAULT_TABLE_OPTIONS
    default:
      return DEFAULT_TABLE_OPTIONS
  }
}

export const AXES_SCALE_OPTIONS = {
  LINEAR: 'linear',
  LOG: 'log',
  BASE_2: '2',
  BASE_10: '10',
}

type DefaultAxis = Pick<Axis, Exclude<keyof Axis, 'bounds'>>

export const DEFAULT_AXIS: DefaultAxis = {
  prefix: '',
  suffix: '',
  base: AXES_SCALE_OPTIONS.BASE_10,
  scale: AXES_SCALE_OPTIONS.LINEAR,
  label: '',
}

export const FULL_DEFAULT_AXIS: Axis = {
  ...DEFAULT_AXIS,
  bounds: ['', ''],
}

export const DEFAULT_AXES: Axes = {
  x: FULL_DEFAULT_AXIS,
  y: FULL_DEFAULT_AXIS,
}

export const TOOLTIP_Y_VALUE_FORMAT =
  '<p><strong>K/M/B</strong> = Thousand / Million / Billion<br/><strong>K/M/G</strong> = Kilo / Mega / Giga </p>'

interface ColorArgs {
  cellType: ViewType
  thresholdsListColors: Color[]
  gaugeColors: Color[]
  lineColors: Color[]
}

export const getCellTypeColors = ({
  cellType,
  gaugeColors,
  thresholdsListColors,
  lineColors,
}: ColorArgs): Color[] => {
  let colors: Color[] = []

  switch (cellType) {
    case ViewType.Gauge: {
      colors = stringifyColorValues(gaugeColors)
      break
    }
    case ViewType.SingleStat:
    case ViewType.Table: {
      colors = stringifyColorValues(thresholdsListColors)
      break
    }
    case ViewType.LinePlusSingleStat:
    case ViewType.XY: {
      colors = stringifyColorValues(lineColors)
    }
  }

  return colors
}
