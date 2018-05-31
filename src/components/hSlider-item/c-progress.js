/* eslint-disable */

export default {
  makeSvg(percent = 0, milliSecond = 500) {
    percent = percent >= 100 ? 102 : percent
    const pre = percent / 100 * 280
    if (percent === 0) {
      return (`
<svg height="100" width="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
<g transform="rotate(270,50,50)">
    <circle
      cx="50"
      cy="50"
      r="45.75"
      stroke-width="8.5"
      stroke="#1A1D3D"
      fill="none"
    >
    </circle>
  </g>
</svg>`)
    }

    return (`
<svg height="100" width="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="purple" x1="50%" y1="100%" x2="50%" y2="0%">
      <stop offset="0%" stop-color="#2AC3FF"></stop>
      <stop offset="100%" stop-color="#3364FF"></stop>
    </linearGradient>
  </defs>
  <g transform="rotate(270,50,50)">
    <circle
      cx="50"
      cy="50"
      r="45.75"
      stroke-width="8.5"
      stroke="#1A1D3D"
      fill="none"
    >
    </circle>
    <circle
      cx="50"
      cy="50" r="45.75"
      stroke-width="8.5"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke="url(#purple)"
      fill="none"
      stroke-dasharray="270,285"
    >
      <animate
        attributeName="stroke-dasharray"
        attributeType="xml"
        from="0,285"
        to="${pre},285"
        dur="${milliSecond}ms"
        fill="freeze"
      />
    </circle>
  </g>
</svg>`
    )
  }
}


