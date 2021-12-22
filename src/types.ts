export interface OptionsI {
  faviconUrl: string
  labelColor: string
  labelSize: number
  labelOffset: number
  textColor: string
  fontSize: number
  fontFamily: string
  fontWeight: '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900' | 'normal' | 'bold'
  fontStyle: 'normal' | 'italic'
  fontVOffset: number
  withCounter: boolean
  startCounterValue: number
  animation?: 'none' | 'bounce' | 'slide'
  animationDuration?: number
}
