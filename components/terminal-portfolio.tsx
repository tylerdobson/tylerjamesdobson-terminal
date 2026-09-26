'use client'

import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { DIRECTORY, PROJECTS, ROOT_PATH, type PortfolioData } from '@/app/portfolio'
import TerminalOutput, { CommandLink, type TerminalOutputValue } from './terminal-output'

type Entry = { id: number; path: string; command: string; output: TerminalOutputValue }
type Directory = '' | 'projects' | 'experience'

const INITIAL_ENTRIES: Entry[] = [
  { id: 0, path: ROOT_PATH, command: 'whoami', output: { kind: 'about' } },
  { id: 1, path: ROOT_PATH, command: 'dir', output: { kind: 'directory' } },
]

const COMMANDS = ['help', 'dir', 'about', 'whoami', 'projects', 'experience', 'stack', 'skills', 'contact', 'resume', 'activity', 'all', 'history', 'cls', 'clear', 'exit', 'ver', 'echo', 'cd', 'type']
const FILES: Record<string, TerminalOutputValue['kind']> = {
  'about.txt': 'about', 'stack.txt': 'stack', 'contact.txt': 'contact', 'resume.txt': 'resume', 'activity.log': 'activity', 'activity.txt': 'activity',
}

export default function TerminalPortfolio({ data }: { data: PortfolioData }) {
  const [entries, setEntries] = useState<Entry[]>(INITIAL_ENTRIES)
  const [input, setInput] = useState('')
  const [directory, setDirectory] = useState<Directory>('')
  const [history, setHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState<number | null>(null)
  const [welcome, setWelcome] = useState(true)
  const [closed, setClosed] = useState(false)
  const [minimized, setMinimized] = useState(false)
  const [fullscreen, setFullscreen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const screenRef = useRef<HTMLDivElement>(null)
  const latestEntryRef = useRef<HTMLDivElement>(null)
  const nextId = useRef(2)
  const draft = useRef('')
  const completion = useRef<{ matches: string[]; index: number } | null>(null)
  const path = directory ? `${ROOT_PATH}\\${directory}` : ROOT_PATH

  useEffect(() => {
    if (window.matchMedia('(pointer: fine)').matches && !closed && !minimized) inputRef.current?.focus({ preventScroll: true })
  }, [closed, minimized])

  useEffect(() => {
    if (nextId.current === 2) return
    const screen = screenRef.current
    if (screen) screen.scrollTop = latestEntryRef.current?.offsetTop ?? 0
  }, [entries])

  useEffect(() => {
    const updateFullscreen = () => setFullscreen(Boolean(document.fullscreenElement))
    document.addEventListener('fullscreenchange', updateFullscreen)
    return () => document.removeEventListener('fullscreenchange', updateFullscreen)
  }, [])

  function clearScreen() {
    setEntries([])
    setWelcome(false)
    setInput('')
    setHistoryIndex(null)
    completion.current = null
  }

  function runCommand(rawCommand: string) {
    const command = rawCommand.trim()
    if (!command) return
    const [verb, ...argumentParts] = command.split(/\s+/)
    const argument = argumentParts.join(' ').replace(/^"(.*)"$/, '$1')
    const normalized = verb.toLowerCase()
    const target = argument.toLowerCase().replace(/\//g, '\\')
    const updatedHistory = [...history, command]
    let output: TerminalOutputValue = { kind: 'text', value: '' }

    setInput('')
    setClosed(false)
    setHistory(updatedHistory)
    setHistoryIndex(null)
    completion.current = null
    if (window.matchMedia('(pointer: fine)').matches) inputRef.current?.focus({ preventScroll: true })

    switch (normalized) {
      case 'cls':
      case 'clear':
        clearScreen()
        return
      case 'help':
      case '?':
        output = { kind: 'help' }
        break
      case 'dir':
      case 'ls':
        output = { kind: directory || 'directory' }
        break
      case 'whoami':
      case 'about':
        output = { kind: 'about' }
        break
      case 'projects':
      case 'project': {
        const project = PROJECTS.find(project => [project.slug, project.name.toLowerCase(), ...(project.aliases ?? [])].includes(argument.toLowerCase()))
        output = !target ? { kind: 'projects' } : project ? { kind: 'project', value: project.slug } : { kind: 'text', value: `Project not found: ${argument}\nType projects to list available work.` }
        break
      }
      case 'experience':
      case 'contact':
      case 'resume':
      case 'activity':
      case 'all':
      case 'stack':
        output = { kind: normalized }
        break
      case 'activity.log':
      case 'activity.txt':
        output = { kind: 'activity' }
        break
      case 'skills':
        output = { kind: 'stack' }
        break
      case 'type':
      case 'cat': {
        const filename = target.replace(/^\.\\/, '')
        const kind = Object.hasOwn(FILES, filename) ? FILES[filename] : undefined
        output = kind ? { kind } : { kind: 'text', value: 'The system cannot find the file specified.\nType dir to see available files.' }
        break
      }
      case 'cd': {
        if (!target || target === '.') output = { kind: 'text', value: path }
        else if (['..', '\\', '~', ROOT_PATH.toLowerCase()].includes(target)) {
          setDirectory('')
          output = { kind: 'directory' }
        } else {
          const destination = target.replace(`${ROOT_PATH.toLowerCase()}\\`, '').replace(/^\.\\/, '').replace(/\\$/, '')
          if (destination === 'projects' || destination === 'experience') {
            setDirectory(destination)
            output = { kind: destination }
          } else output = { kind: 'text', value: 'The system cannot find the path specified.\nAvailable directories: projects, experience. Use cd .. to return home.' }
        }
        break
      }
      case 'history':
        output = { kind: 'text', value: updatedHistory.map((item, index) => `${String(index + 1).padStart(3)}  ${item}`).join('\n') }
        break
      case 'ver':
        output = { kind: 'text', value: 'Tyler James Dobson [Version 1.0.0]' }
        break
      case 'echo':
        output = { kind: 'text', value: argument || 'ECHO is on.' }
        break
      case 'exit':
        setClosed(true)
        output = { kind: 'text', value: 'Session ended. Thanks for stopping by.' }
        break
      default:
        output = Object.hasOwn(FILES, normalized)
          ? { kind: FILES[normalized] }
          : { kind: 'text', value: `'${verb}' is not recognized as an internal or external command.\nType help to see available commands.` }
    }

    const entry = { id: nextId.current++, path, command, output }
    setEntries(previous => [...previous, entry])
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.nativeEvent.isComposing) return
    if (event.key !== 'Tab') completion.current = null

    if (event.ctrlKey && event.key.toLowerCase() === 'l') {
      event.preventDefault()
      clearScreen()
    } else if (event.key === 'Escape') {
      setInput('')
      setHistoryIndex(null)
    } else if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      if (!history.length) return
      event.preventDefault()
      if (historyIndex === null) draft.current = input
      const index = event.key === 'ArrowUp'
        ? Math.max(0, (historyIndex ?? history.length) - 1)
        : Math.min(history.length, (historyIndex ?? history.length) + 1)
      setHistoryIndex(index === history.length ? null : index)
      setInput(index === history.length ? draft.current : history[index])
    } else if (event.key === 'Tab' && input && !event.shiftKey) {
      const candidates = [
        ...COMMANDS,
        ...DIRECTORY.filter(file => !file.kind).map(file => `type ${file.name}`),
        ...DIRECTORY.filter(file => !file.kind).map(file => `cat ${file.name}`),
        'cd projects', 'cd experience', 'cd ..',
        ...PROJECTS.map(project => `projects ${project.slug}`),
      ]
      const matches = completion.current?.matches ?? candidates.filter(candidate => candidate.startsWith(input.toLowerCase()))
      if (!matches.length) return
      event.preventDefault()
      const index = completion.current ? (completion.current.index + 1) % matches.length : 0
      completion.current = { matches, index }
      setInput(matches[index])
    }
  }

  function restart() {
    setClosed(false)
    setMinimized(false)
    setEntries(INITIAL_ENTRIES)
    setWelcome(true)
    setDirectory('')
    setHistory([])
    setHistoryIndex(null)
    setInput('')
    completion.current = null
    nextId.current = 2
    if (screenRef.current) screenRef.current.scrollTop = 0
  }

  async function toggleFullscreen() {
    try {
      if (document.fullscreenElement) await document.exitFullscreen()
      else await document.documentElement.requestFullscreen()
    } catch {
      runCommand('echo Fullscreen is unavailable in this browser. You can still use the terminal here.')
    }
  }

  return <main className="terminal" id="home">
    <h1 className="sr-only">Tyler James Dobson — portfolio</h1>
    <header className="terminal-titlebar">
      <span className="terminal-icon" aria-hidden="true">&gt;_</span>
      <span className="terminal-title">Command Prompt — Tyler James Dobson</span>
      <div className="window-actions">
        <button type="button" aria-label={minimized ? 'Restore terminal' : 'Minimize terminal'} onClick={() => setMinimized(previous => !previous)}><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 11h10" /></svg></button>
        <button type="button" aria-label={fullscreen ? 'Exit fullscreen' : 'Enter fullscreen'} onClick={toggleFullscreen}><svg viewBox="0 0 16 16" aria-hidden="true"><path d={fullscreen ? 'M3 6h7v7H3zM6 6V3h7v7h-3' : 'M3 3h10v10H3z'} /></svg></button>
        <button type="button" aria-label="Close terminal session" onClick={() => { setMinimized(false); runCommand('exit') }}><svg viewBox="0 0 16 16" aria-hidden="true"><path d="m3 3 10 10M13 3 3 13" /></svg></button>
      </div>
    </header>

    {minimized ? <div className="minimized-screen"><button className="command-link" type="button" onClick={() => setMinimized(false)}>[ Restore command prompt ]</button></div> : <div className="terminal-screen" ref={screenRef} onClick={event => {
      if (event.target === event.currentTarget && !window.getSelection()?.toString()) inputRef.current?.focus()
    }}>
      {welcome ? <div className="terminal-welcome">
        <p>Tyler James Dobson [Version 1.0.0]</p>
        <p>(c) Tyler James Dobson. All rights reserved.</p>
      </div> : null}
      <div role="log" aria-label="Terminal output" aria-live="polite" aria-relevant="additions">
        {entries.map((entry, index) => <div className="terminal-entry" key={entry.id} ref={index === entries.length - 1 ? latestEntryRef : undefined}>
          <p className="command-echo"><span>{entry.path}&gt;</span> {entry.command}</p>
          <TerminalOutput output={entry.output} data={data} runCommand={runCommand} />
        </div>)}
      </div>
      {closed ? <button className="command-link restart-command" type="button" onClick={restart}>[ Start a new session ]</button> : <form className="terminal-prompt" onSubmit={event => { event.preventDefault(); runCommand(input) }}>
        <label htmlFor="terminal-command"><span aria-hidden="true">{path}&gt;</span><span className="sr-only">Enter a terminal command</span></label>
        <span className="terminal-input-wrap">
          <input id="terminal-command" ref={inputRef} value={input} onChange={event => { setInput(event.target.value); setHistoryIndex(null); completion.current = null; inputRef.current?.scrollIntoView({ block: 'nearest' }) }} onKeyDown={handleKeyDown} autoComplete="off" autoCapitalize="off" autoCorrect="off" spellCheck={false} enterKeyHint="send" aria-describedby="terminal-instructions" />
          {!input ? <span className="block-cursor" aria-hidden="true" /> : null}
        </span>
        <button className="mobile-enter" type="submit" aria-label="Run command">↵</button>
      </form>}
      <p id="terminal-instructions" className="sr-only">Type help to see commands, or use the clickable filenames. Tab completes a partial command. Arrow keys recall history. Control L clears the screen.</p>
      <noscript><p>Enable JavaScript to use the command prompt. You can also <a href={data.channels[0]?.href}>contact Tyler by email</a>.</p></noscript>
    </div>}

    <footer className="terminal-statusbar">
      <div><span>Tab autocomplete</span><span>↑↓ history</span><span>Ctrl+L clear</span></div>
      <CommandLink command="help" runCommand={command => { setMinimized(false); runCommand(command) }}>help</CommandLink>
      <span className="terminal-domain">tylerjamesdobson.com</span>
    </footer>
  </main>
}
