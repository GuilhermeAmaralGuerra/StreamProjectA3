import { useState, useEffect, useRef } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { catalog } from '../data/catalog.js'

function Player() {
  const { titleId } = useParams()
  const navigate = useNavigate()
  const title = catalog.find((item) => item.id === titleId)

  const videoRef = useRef(null)
  const containerRef = useRef(null)
  const controlsTimeoutRef = useRef(null)

  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const [playbackRate, setPlaybackRate] = useState(1)
  const [showControls, setShowControls] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showSpeedMenu, setShowSpeedMenu] = useState(false)

  // Ocultar controles quando o mouse fica inativo
  const resetControlsTimeout = () => {
    setShowControls(true)
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current)
    }
    if (isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false)
        setShowSpeedMenu(false)
      }, 3000)
    }
  }

  useEffect(() => {
    resetControlsTimeout()
    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current)
      }
    }
  }, [isPlaying])

  const handleMouseMove = () => {
    resetControlsTimeout()
  }

  // Efeitos de teclado
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === ' ' || e.key === 'k') {
        e.preventDefault()
        togglePlay()
      } else if (e.key === 'ArrowRight') {
        seekForward()
      } else if (e.key === 'ArrowLeft') {
        seekBackward()
      } else if (e.key === 'f') {
        toggleFullscreen()
      } else if (e.key === 'm') {
        toggleMute()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isPlaying, isMuted])

  if (!title) {
    return (
      <section className="flex h-screen w-screen flex-col items-center justify-center gap-4 bg-(--md-sys-color-surface) text-(--md-sys-color-on-surface) p-6">
        <h1 className="text-3xl font-bold">Título não encontrado</h1>
        <p className="text-sm text-(--md-sys-color-on-surface-variant) max-w-md text-center">
          O conteúdo que você tentou assistir não está cadastrado em nosso catálogo.
        </p>
        <button
          onClick={() => window.close()}
          className="cursor-pointer rounded-full bg-(--md-sys-color-primary) px-6 py-2.5 text-sm font-semibold text-(--md-sys-color-on-primary) shadow hover:opacity-90 transition"
        >
          Fechar Aba
        </button>
      </section>
    )
  }

  const togglePlay = () => {
    if (!videoRef.current) return
    if (isPlaying) {
      videoRef.current.pause()
      setIsPlaying(false)
    } else {
      videoRef.current.play()
      setIsPlaying(true)
    }
  }

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime)
    }
  }

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration)
    }
  }

  const handleVideoEnded = () => {
    setIsPlaying(false)
    setShowControls(true)
  }

  const seekForward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.min(videoRef.current.currentTime + 10, duration)
      resetControlsTimeout()
    }
  }

  const seekBackward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.max(videoRef.current.currentTime - 10, 0)
      resetControlsTimeout()
    }
  }

  const handleProgressChange = (e) => {
    if (videoRef.current) {
      const newTime = Number(e.target.value)
      videoRef.current.currentTime = newTime
      setCurrentTime(newTime)
      resetControlsTimeout()
    }
  }

  const handleVolumeChange = (e) => {
    const newVol = Number(e.target.value)
    setVolume(newVol)
    if (videoRef.current) {
      videoRef.current.volume = newVol
      videoRef.current.muted = newVol === 0
      setIsMuted(newVol === 0)
    }
    resetControlsTimeout()
  }

  const toggleMute = () => {
    if (videoRef.current) {
      const nextMuted = !isMuted
      videoRef.current.muted = nextMuted
      setIsMuted(nextMuted)
      if (!nextMuted && volume === 0) {
        setVolume(0.5)
        videoRef.current.volume = 0.5
      }
    }
    resetControlsTimeout()
  }

  const handleSpeedChange = (rate) => {
    setPlaybackRate(rate)
    if (videoRef.current) {
      videoRef.current.playbackRate = rate
    }
    setShowSpeedMenu(false)
    resetControlsTimeout()
  }

  const toggleFullscreen = () => {
    if (!containerRef.current) return
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => {
        setIsFullscreen(true)
      }).catch((err) => {
        console.error(`Erro ao ativar tela cheia: ${err.message}`)
      })
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
    resetControlsTimeout()
  }

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }
    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
  }, [])

  // Formatar tempo (segundos -> MM:SS ou HH:MM:SS)
  const formatTime = (timeInSeconds) => {
    if (isNaN(timeInSeconds)) return '00:00'
    const hours = Math.floor(timeInSeconds / 3600)
    const minutes = Math.floor((timeInSeconds % 3600) / 60)
    const seconds = Math.floor(timeInSeconds % 60)

    const pad = (num) => String(num).padStart(2, '0')

    if (hours > 0) {
      return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`
    }
    return `${pad(minutes)}:${pad(seconds)}`
  }

  // URL do vídeo mock - Sintel é um vídeo público de alta qualidade
  const videoSourceUrl = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4'

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative flex h-screen w-screen select-none items-center justify-center overflow-hidden bg-black font-sans text-white"
    >
      {/* Vídeo Element */}
      <video
        ref={videoRef}
        src={videoSourceUrl}
        onClick={togglePlay}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleVideoEnded}
        className="h-full w-full cursor-pointer object-contain"
        playsInline
      />

      {/* Camada de Gradiente superior e inferior para os controles ficarem legíveis */}
      <div
        className={`absolute inset-0 pointer-events-none bg-gradient-to-b from-black/60 via-transparent to-black/80 transition-opacity duration-500 ${
          showControls ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Header superior do Player */}
      <header
        className={`absolute top-0 left-0 right-0 flex items-center justify-between p-6 transition-all duration-500 transform ${
          showControls ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex items-center gap-4">
          <button
            onClick={() => {
              if (window.history.length > 1) {
                navigate(-1)
              } else {
                window.close()
              }
            }}
            className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition hover:bg-white/20"
            title="Voltar"
          >
            <span className="material-symbols-rounded text-[24px]">arrow_back</span>
          </button>

          <div className="flex flex-col">
            <span className="text-xs font-semibold uppercase tracking-wider text-(--md-sys-color-outline-variant)">
              {title.type} • {title.category}
            </span>
            <h1 className="text-lg font-bold text-white">{title.title}</h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="rounded-full bg-(--md-sys-color-secondary-container) px-3.5 py-1.5 text-xs font-semibold text-(--md-sys-color-on-surface)">
            {title.tag}
          </span>
          <span className="rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-semibold backdrop-blur-md">
            {title.rating}
          </span>
        </div>
      </header>

      {/* Controles centrais (Play/Pause grandes e Seek 10s) */}
      <div
        className={`absolute inset-0 flex items-center justify-center gap-10 transition-opacity duration-500 pointer-events-none ${
          showControls ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <button
          onClick={seekBackward}
          className="flex h-14 w-14 pointer-events-auto cursor-pointer items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition hover:bg-white/20 hover:scale-105 active:scale-95"
          title="Voltar 10 segundos"
        >
          <span className="material-symbols-rounded text-[28px]!">replay_10</span>
        </button>

        <button
          onClick={togglePlay}
          className="flex h-20 w-20 pointer-events-auto cursor-pointer items-center justify-center rounded-full bg-(--md-sys-color-primary) text-(--md-sys-color-on-primary) transition hover:scale-105 active:scale-95 shadow-lg"
          title={isPlaying ? 'Pausar' : 'Reproduzir'}
        >
          <span className="material-symbols-rounded fill text-[42px]!">
            {isPlaying ? 'pause' : 'play_arrow'}
          </span>
        </button>

        <button
          onClick={seekForward}
          className="flex h-14 w-14 pointer-events-auto cursor-pointer items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition hover:bg-white/20 hover:scale-105 active:scale-95"
          title="Avançar 10 segundos"
        >
          <span className="material-symbols-rounded text-[28px]!">forward_10</span>
        </button>
      </div>

      {/* Controles Inferiores */}
      <footer
        className={`absolute bottom-0 left-0 right-0 p-6 flex flex-col gap-4 transition-all duration-500 transform ${
          showControls ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0 pointer-events-none'
        }`}
      >
        {/* Barra de Progresso do Vídeo */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-medium tabular-nums text-gray-300">
            {formatTime(currentTime)}
          </span>

          <div className="relative group flex-1 flex items-center h-5 cursor-pointer">
            <input
              type="range"
              min={0}
              max={duration || 100}
              value={currentTime}
              onChange={handleProgressChange}
              className="absolute inset-0 w-full h-full cursor-pointer opacity-0 z-20"
            />
            {/* Background da barra */}
            <div className="w-full h-1 bg-white/30 rounded-full overflow-hidden transition-all duration-200 group-hover:h-1.5">
              {/* Progresso Assistido */}
              <div
                className="h-full bg-(--md-sys-color-primary) rounded-full relative"
                style={{ width: `${(currentTime / (duration || 1)) * 100}%` }}
              >
                {/* Knob / Slider thumb */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-white rounded-full shadow opacity-0 group-hover:opacity-100 transition-opacity duration-150 transform translate-x-1/2" />
              </div>
            </div>
          </div>

          <span className="text-xs font-medium tabular-nums text-gray-300">
            {formatTime(duration)}
          </span>
        </div>

        {/* Barra de Ações (Volume, Velocidade, Fullscreen) */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            {/* Play/Pause pequeno */}
            <button
              onClick={togglePlay}
              className="flex items-center justify-center cursor-pointer text-white hover:text-(--md-sys-color-primary) transition"
            >
              <span className="material-symbols-rounded fill text-[26px]">
                {isPlaying ? 'pause' : 'play_arrow'}
              </span>
            </button>

            {/* Controle de Volume */}
            <div className="flex items-center gap-2 group">
              <button
                onClick={toggleMute}
                className="flex items-center justify-center cursor-pointer text-white hover:text-(--md-sys-color-primary) transition"
              >
                <span className="material-symbols-rounded text-[24px]">
                  {isMuted || volume === 0
                    ? 'volume_off'
                    : volume < 0.5
                    ? 'volume_down'
                    : 'volume_up'}
                </span>
              </button>

              <div className="w-0 overflow-hidden transition-all duration-300 group-hover:w-20 h-5 flex items-center relative">
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.05}
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="w-full h-1 cursor-pointer accent-(--md-sys-color-primary) bg-white/20 rounded-full"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-5 relative">
            {/* Seletor de Velocidade de Reprodução */}
            <div className="relative">
              <button
                onClick={() => setShowSpeedMenu(!showSpeedMenu)}
                className="flex items-center gap-1 cursor-pointer text-sm font-semibold rounded-lg bg-white/10 px-3 py-1.5 transition hover:bg-white/20"
              >
                <span>{playbackRate === 1 ? 'Normal' : `${playbackRate}x`}</span>
                <span className="material-symbols-rounded text-[18px]">settings</span>
              </button>

              {showSpeedMenu && (
                <div className="absolute bottom-full right-0 mb-2 w-32 rounded-2xl bg-(--md-sys-color-surface-container) border border-(--md-sys-color-outline-variant) p-2 shadow-xl flex flex-col gap-1 z-30">
                  <p className="text-[11px] font-bold text-(--md-sys-color-on-surface-variant) px-2 py-1 uppercase tracking-wider">
                    Velocidade
                  </p>
                  {[0.5, 1, 1.25, 1.5, 2].map((rate) => (
                    <button
                      key={rate}
                      onClick={() => handleSpeedChange(rate)}
                      className={`w-full text-left rounded-xl px-3 py-1.5 text-xs font-semibold cursor-pointer transition ${
                        playbackRate === rate
                          ? 'bg-(--md-sys-color-primary) text-(--md-sys-color-on-primary)'
                          : 'text-(--md-sys-color-on-surface) hover:bg-(--md-sys-color-outline-variant)'
                      }`}
                    >
                      {rate === 1 ? 'Normal' : `${rate}x`}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Tela Cheia */}
            <button
              onClick={toggleFullscreen}
              className="flex items-center justify-center cursor-pointer text-white hover:text-(--md-sys-color-primary) transition"
              title="Tela cheia"
            >
              <span className="material-symbols-rounded text-[24px]">
                {isFullscreen ? 'fullscreen_exit' : 'fullscreen'}
              </span>
            </button>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Player
