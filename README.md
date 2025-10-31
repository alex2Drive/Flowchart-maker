# AI Agent Flowchart Maker

Een moderne, interactieve flowchart maker speciaal ontworpen voor het visualiseren en ontwerpen van AI agent workflows. Gebouwd met React, TypeScript, React Flow, en Tailwind CSS.

## ✨ Features

- **🎨 Modern Design**: Strak, donker thema met moderne UI/UX
- **🖱️ Drag & Drop**: Sleep AI agent nodes vanuit de sidebar naar het canvas
- **🔗 Visual Connections**: Verbind nodes om workflows te creëren
- **⚙️ Configureerbare Nodes**: Pas node eigenschappen aan via het properties panel
- **💾 Save/Load**: Sla je flowcharts op in local storage of exporteer naar JSON
- **🔍 Canvas Controls**: Zoom, pan, minimap voor overzicht
- **⌨️ Keyboard Shortcuts**: Ctrl/Cmd+S om op te slaan, Delete om nodes te verwijderen

## 🤖 Agent Types

- **Input Node**: Ontvangt gebruikersinput of externe data
- **LLM Agent**: Taalmodel verwerkingsnode (bijv. GPT-4)
- **Tool Agent**: Voert externe tools of API's uit
- **Decision Node**: Conditionele vertakkingslogica
- **Function Node**: Aangepaste code uitvoering
- **Output Node**: Finale output of respons

## 🚀 Getting Started

### Installatie

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in je browser.

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 📖 Gebruik

1. **Sleep een Agent Node**: Klik en sleep een agent type vanuit de linker sidebar naar het canvas
2. **Verbind Nodes**: Sleep van de onderste handle (uitgang) van een node naar de bovenste handle (ingang) van een andere node
3. **Edit Properties**: Klik op een node om het properties panel te openen en eigenschappen aan te passen
4. **Save Your Work**:
   - Gebruik de Save knop in de toolbar om op te slaan in local storage
   - Gebruik Export om een JSON bestand te downloaden
   - Gebruik Import om een eerder geëxporteerd bestand te laden
5. **Navigate**:
   - Gebruik de minimap rechtsonder voor overzicht
   - Zoom in/uit met de controls of scroll wheel
   - Pan door het canvas te slepen

## 🛠️ Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool en dev server
- **React Flow** - Node-based editor framework
- **Tailwind CSS** - Utility-first CSS framework
- **Zustand** - State management
- **Lucide React** - Icon library

## 📁 Project Structure

```
src/
├── components/
│   ├── AgentNode.tsx       # Custom node component
│   ├── Sidebar.tsx         # Drag & drop sidebar
│   ├── PropertiesPanel.tsx # Node properties editor
│   └── Toolbar.tsx         # Top toolbar controls
├── store.ts                # Zustand state management
├── types.ts                # TypeScript type definitions
├── App.tsx                 # Main app component
├── main.tsx               # Entry point
└── index.css              # Global styles
```

## ⌨️ Keyboard Shortcuts

- `Ctrl/Cmd + S` - Save flowchart
- `Delete` - Delete selected node(s)
- `Mouse Wheel` - Zoom in/out
- `Click + Drag` - Pan canvas

## 🎯 Roadmap

- [ ] Export flowchart als afbeelding (PNG/SVG)
- [ ] Undo/Redo functionaliteit
- [ ] Node grouping
- [ ] Templates voor veelvoorkomende workflows
- [ ] Real-time collaboration
- [ ] Code generatie uit flowchart

## 📄 License

MIT

## 🤝 Contributing

Contributions zijn welkom! Open een issue of pull request.
