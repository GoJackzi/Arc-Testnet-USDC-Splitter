export function ArcLogo() {
  return (
    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-900 to-blue-700 flex items-center justify-center">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="arcGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{stopColor:'#E5E7EB', stopOpacity:1}} />
            <stop offset="100%" style={{stopColor:'#374151', stopOpacity:1}} />
          </linearGradient>
        </defs>
        {/* Stylized A shape matching the provided design */}
        <path 
          d="M5 16 L5 8 L7 6 L13 6 L15 8 L15 10 L13 8 L11 8 L11 14 L9 14 L9 8 L7 8 L7 16 Z" 
          fill="url(#arcGradient)" 
          stroke="none"
        />
        {/* Crossbar with curved/wave-like shape */}
        <path 
          d="M7 10 Q10 8 13 10" 
          fill="none" 
          stroke="url(#arcGradient)" 
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </div>
  )
}
